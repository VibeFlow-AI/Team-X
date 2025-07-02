import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import StudentOnboardingForm from "./_components/student-onboarding-form";

async function StudentOnboardingPage() {
  const authData = await auth();

  if (authData.sessionClaims?.metadata.role == "student") {
    return redirect("/student/dashboard");
  } else if (authData.sessionClaims?.metadata.role == "mentor") {
    return redirect("/mentor/dashboard");
  }

  const userData = await currentUser();

  return (
    <StudentOnboardingForm defaultName={userData?.fullName ?? ""} defaultEmail={userData?.emailAddresses[0].emailAddress ?? ""} />
  );
}

export default StudentOnboardingPage;
