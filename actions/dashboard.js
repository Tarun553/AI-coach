"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Check if API key exists
if (!process.env.GEMINI_API_KEY) {
  console.error("GEMINI_API_KEY is not set in environment variables");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateAIInsights(industry) {
  try {
    console.log("Starting AI insights generation for industry:", industry);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Generate a detailed analysis for the ${industry} industry in the following JSON format. Include specific, realistic data:

    {
      "keyTrends": [
        "Specific trend 1 with details",
        "Specific trend 2 with details",
        "Specific trend 3 with details"
      ],
      "topSkills": [
        "Specific required skill 1",
        "Specific required skill 2",
        "Specific required skill 3"
      ],
      "recommendationsSkill": [
        "Specific skill recommendation 1",
        "Specific skill recommendation 2",
        "Specific skill recommendation 3"
      ],
      "salaryRange": [
        "Entry Level: $X-$Y",
        "Mid Level: $X-$Y",
        "Senior Level: $X-$Y"
      ],
      "growthRate": 8.5,
      "demandLevel": "HIGH",
      "marketOutlook": "GROWING"
    }

    Ensure:
    1. All arrays have at least 3 detailed items
    2. Salary ranges are realistic for the industry
    3. Growth rate is a number between 0 and 100
    4. Demand level is exactly "HIGH", "MEDIUM", or "LOW"
    5. Market outlook is exactly "GROWING", "STABLE", or "DECLINING"

    Return only valid JSON, no additional text.`;

    console.log("Sending prompt to Gemini API...");
    const result = await model.generateContent(prompt);
    console.log("Received response from Gemini API");
    
    const response = await result.response;
    const text = response.text();
    
    // Clean the response text to ensure it's valid JSON
    const cleanedText = text.replace(/```json\n?|\n?```/g, "").trim();
    console.log("Raw API response:", cleanedText);
    
    try {
      // Parse the JSON response
      const insights = JSON.parse(cleanedText);
      console.log("Successfully parsed JSON response:", insights);

      // Transform salary ranges from strings to objects
      const transformedSalaryRanges = insights.salaryRange.map(range => {
        const [role, salary] = range.split(": ");
        const [min, max] = salary.replace(/[$k]/g, "").split("-").map(Number);
        return {
          role,
          min,
          max,
          median: Math.round((min + max) / 2),
          location: "Global" // Default location
        };
      });

      // Validate and format the data
      const formattedInsights = {
        keyTrends: Array.isArray(insights.keyTrends) ? insights.keyTrends : [],
        topSkills: Array.isArray(insights.topSkills) ? insights.topSkills : [],
        recommendationsSkill: Array.isArray(insights.recommendationsSkill) ? insights.recommendationsSkill : [],
        salaryRanges: transformedSalaryRanges,
        growthRate: typeof insights.growthRate === 'number' ? insights.growthRate : 0,
        demandLevel: ["HIGH", "MEDIUM", "LOW"].includes(insights.demandLevel) ? insights.demandLevel : "MEDIUM",
        marketOutlook: ["GROWING", "STABLE", "DECLINING"].includes(insights.marketOutlook) ? insights.marketOutlook : "STABLE",
        lastUpdated: new Date().toISOString(),
      };

      console.log("Formatted insights:", formattedInsights);
      return formattedInsights;
    } catch (parseError) {
      console.error("Error parsing JSON response:", parseError);
      console.error("Invalid JSON text:", cleanedText);
      throw new Error("Failed to parse Gemini API response");
    }
  } catch (error) {
    console.error("Error in generateAIInsights:", error);
    console.error("Error details:", {
      message: error.message,
      stack: error.stack,
    });
    
    // Return default values if AI generation fails
    const defaultInsights = {
      keyTrends: ["Trend 1", "Trend 2", "Trend 3"],
      topSkills: ["Skill 1", "Skill 2", "Skill 3"],
      recommendationsSkill: ["Recommendation 1", "Recommendation 2", "Recommendation 3"],
      salaryRange: ["Entry: $40k-60k", "Mid: $60k-90k", "Senior: $90k-130k"],
      growthRate: 5,
      demandLevel: "MEDIUM",
      marketOutlook: "STABLE",
      lastUpdated: new Date().toISOString(),
    };
    
    console.log("Returning default insights:", defaultInsights);
    return defaultInsights;
  }
}

export async function getIndustryInsights() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    include: {
      industryInsight: true,
    },
  });

  if (!user) throw new Error("User not found");

  // If no insights exist, generate them
  if (!user.industryInsight) {
    const insights = await generateAIInsights(user.industry);

    const industryInsight = await db.industryInsight.create({
      data: {
        industry: user.industry,
        ...insights,
        nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return industryInsight;
  }

  return user.industryInsight;
}