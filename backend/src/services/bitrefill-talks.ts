import axios from "axios";
import { prisma } from "../db/prisma";

export async function getBitrefillMentions() {
  const { NEYNAR_API_KEY } = process.env;
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Start of the day

  const { data } = await axios.get(
    "https://api.neynar.com/v2/farcaster/feed/search-text",
    {
      headers: {
        Accept: "application/json",
        api_key: NEYNAR_API_KEY,
      },
      params: {
        query: "bitrefill",
        limit: 100,
      },
    }
  );

  for (const cast of data.casts) {
    const createdAt = new Date(cast.createdAt);

    if (createdAt < today) continue;

    const fid = cast.author.fid;
    const username = cast.author.username ?? "anonymous";
    const castHash = cast.hash;
    const profileImage = cast.author.pfp_url;

    // Check if the cast already exists
    const existingCast = await prisma.mention.findUnique({
      where: { hash: castHash },
    });

    if (existingCast) continue; // Skip duplicates

    // Save the user(or get existing one)
    const user = await prisma.user.upsert({
      where: { fid },
      update: { username, profileImage },
      create: {
        fid,
        username,
        profileImage,
      },
    });

    // Log the mention
    await prisma.mention.create({
      data: {
        userId: user.id,
        hash: castHash,
        timestamp: createdAt,
      },
    });

    // Increment the user's score
    await prisma.user.update({
      where: { id: user.id },
      data: {
        score: {
          increment: 1,
        },
      },
    });
  }
}
