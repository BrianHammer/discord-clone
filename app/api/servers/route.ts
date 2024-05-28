import { v4 as uuid } from "uuid";

import { currentProfile } from "@/lib/current-profile";

import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { MemberRole } from "@prisma/client";

export async function POST(req: Request) {
  try {

    // Convert the request from JSON to JS object
    // Pull the name and image out of the request
    const { name, imageUrl } = await req.json();

    // Find the current profile
    const profile = await currentProfile();

    //Automatically unauthorized if theres no profile
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }


    // Create a server with the owner set to profile var

    const server = await db.server.create({
      data: {
        profileId: profile.id,
        name: name,
        imageUrl,
        inviteCode: uuid(),
        channels: {
          create: [{ name: "general", profileId: profile.id }],
        },
        members: {
          create: [{ profileId: profile.id, role: MemberRole.ADMIN }],
        },
      },
    });

    //Return the successfully created server
		return NextResponse.json(server)
  } catch (error) {

    // Something went wrong on our end; 500 error code
    console.log("[SERVERS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
