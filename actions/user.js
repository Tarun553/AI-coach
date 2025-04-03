"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { generateAIInsights } from "./dashboard";

export async function updateUser(data) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  try {
    // Start a transaction to handle both operations
    const result = await db.$transaction(
      async (tx) => {
        // First check if industry exists
        let industryInsight = await tx.industryInsight.findUnique({
          where: {
            industry: data.industry,
          },
        });

        // If industry doesn't exist, create it with default values
        if (!industryInsight) {
          try {
            const insights = await generateAIInsights(data.industry);
            console.log("Generated insights:", insights); // Debug log
            
            industryInsight = await tx.industryInsight.create({
              data: {
                industry: data.industry,
                keyTrends: insights.keyTrends || [],
                topSkills: insights.topSkills || [],
                recommendationsSkill: insights.recommendationsSkill || [],
                salaryRange: insights.salaryRange || [],
                growthRate: insights.growthRate || 0,
                demandLevel: insights.demandLevel || "MEDIUM",
                marketOutlook: insights.marketOutlook || "STABLE",
                lastUpdated: new Date().toISOString(),
                nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
              },
            });
          } catch (error) {
            console.error("Error generating AI insights:", error);
            // If AI insights fail, create with default values
            industryInsight = await tx.industryInsight.create({
              data: {
                industry: data.industry,
                keyTrends: [],
                topSkills: [],
                recommendationsSkill: [],
                salaryRange: [],
                growthRate: 0,
                demandLevel: "MEDIUM",
                marketOutlook: "STABLE",
                lastUpdated: new Date().toISOString(),
                nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
              },
            });
          }
        }

        // Now update the user
        const updatedUser = await tx.user.update({
          where: {
            id: user.id,
          },
          data: {
            industry: data.industry,
            experience: data.experience,
            bio: data.bio,
            skills: data.skills,
            lastUpdated: new Date().toISOString()
          },
        });

        return { updatedUser, industryInsight };
      },
      {
        timeout: 10000, // default: 5000
      }
    );

    revalidatePath("/");
    return result.updatedUser;
  } catch (error) {
    console.error("Error updating user and industry:", error);
    throw new Error(error.message || "Failed to update profile");
  }
}

export async function getUserOnboardingStatus() {
  try {
    const { userId } = await auth();
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
      select: {
        industry: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return {
      isOnboarded: Boolean(user.industry),
    };
  } catch (error) {
    console.error("Error checking onboarding status:", error);
    throw error; // Re-throw the error to be handled by the page
  }
}