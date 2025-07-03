import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import GetStarted from "./_components/get-started";

async function GetStartedPage() {
  const authData = await auth();

  if (authData.sessionClaims?.metadata.role == "student") {
    return redirect("/student/dashboard");
  } else if (authData.sessionClaims?.metadata.role == "mentor") {
    return redirect("/mentor/dashboard");
  }

  return <GetStarted />;
}

export default GetStartedPage;
