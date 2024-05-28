import { InitialModal } from "@/components/modals/initial-modal";
import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { redirect } from "next/navigation";

export default async function SetupPage() {
  //This automatically redirects to the sign in page
  const profile = await initialProfile();

  //Pull up the first server found
  const server = await db.server.findFirst({
    where: { members: { some: { profileId: profile.id } } },
  });

  //Redirect if a server is found
  if (server) {
    return redirect(`/servers/${server.id}`);
  }

  //If there is no server, render an initialModal
  return <InitialModal />;
}
