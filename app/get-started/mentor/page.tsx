import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import MentorOnboardingForm from "./_components/mentor-onboarding-form";

async function MentorOnboardingPage() {
  const authData = await auth();

  if (authData.sessionClaims?.metadata.role == "student") {
    return redirect("/student/dashboard");
  } else if (authData.sessionClaims?.metadata.role == "mentor") {
    return redirect("/mentor/dashboard");
  }

  const userData = await currentUser();

  return (
    <MentorOnboardingForm defaultEmail={userData?.emailAddresses[0].emailAddress ?? ""} defaultName={userData?.fullName ?? ""} />
  );
}

export default MentorOnboardingPage;
