import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

// This creates a an account on our database from clerk's user

// Redirects to create an account if clerk has no user

// Checks for n account, and if it cannot find one it makes one

export const initialProfile = async () => {

  //Get the current user
  const user = await currentUser();

  // Redirect if the user isnt signed in
  if (!user) {
    return auth().redirectToSignIn();
  }

  // Find the profile in the database
  const profile = await db.profile.findUnique({
    where: { userId: user.id },
  });

  //If the profile exists, return
  if (profile) {
    return profile;
  }

  //If the user does not yet exist on our database, create one with
  // Clerk's data
  const newProfile = await db.profile.create({
    data: {
      userId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
    },
  });

  return newProfile;
};
