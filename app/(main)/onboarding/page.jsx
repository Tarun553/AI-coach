import { redirect } from "next/navigation";
import { industries } from "@/data/industries";
import OnboardingForm from "./_components/onboarding-form";
import { getUserOnboardingStatus } from "@/actions/user";

export default async function OnboardingPage() {
  try {
    // Check if user is already onboarded
    const { isOnboarded } = await getUserOnboardingStatus();

    // If user is onboarded, redirect to dashboard
    if (isOnboarded) {
      return redirect("/dashboard");
    }

    // If not onboarded, show the form
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-background">
        <OnboardingForm industries={industries} />
      </div>
    );
  } catch (error) {
    if (error.message === "Unauthorized" || error.message === "User not found") {
      return redirect("/sign-in");
    }

    // For other errors, show the form with error state
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-background">
        <OnboardingForm industries={industries} initialError={error.message} />
      </div>
    );
  }
}