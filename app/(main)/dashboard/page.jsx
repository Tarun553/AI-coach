import { getIndustryInsights } from "@/actions/dashboard";
import DashboardView from "./_components/dashboard-view";
import { getUserOnboardingStatus } from "@/actions/user";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const { isOnboarded } = await getUserOnboardingStatus();
  console.log("Onboarding status:", { isOnboarded });

  // If not onboarded, redirect to onboarding page
  // Skip this check if already on the onboarding page
  if (!isOnboarded) {
    redirect("/onboarding");
  }

  const insights = await getIndustryInsights();
  console.log("Industry insights:", JSON.stringify(insights, null, 2));

  return (
    <div className="container mx-auto">
      <DashboardView insights={insights} />
    </div>
  );
}