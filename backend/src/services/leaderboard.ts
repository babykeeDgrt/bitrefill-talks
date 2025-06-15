import { prisma } from "../db/prisma";

function getStartOfPeriod(period: "day" | "week" | "month") {
  const now = new Date();

  switch (period) {
    case "day":
      now.setHours(0, 0, 0, 0); // Set to the start of the day
      break;
    case "week":
      const day = now.getDay();
      const diff = now.getDate() - day + (day === 0 ? -6 : 1); // Adjust to the start of the week (Sunday)
      now.setDate(diff);
      now.setHours(0, 0, 0, 0); // Set to the start of the day
      break;
    case "month":
      now.setDate(1); // Set to the first day of the month
      now.setHours(0, 0, 0, 0); // Set to the start of the day
      break;
    default:
      throw new Error("Invalid period");
  }
  return now;
}

export async function getTopUserSince(start: Date, limit: number = 3) {
  const mentions = await prisma.mention.groupBy({
    by: ["userId"],
    where: {
      timestamp: {
        gte: start,
      },
    },
    _count: {
      userId: true,
    },
    orderBy: {
      _count: {
        userId: "desc",
      },
    },
    take: limit,
  });

  const users = await prisma.user.findMany({
    where: {
      id: { in: mentions.map((m) => m.userId) },
    },
  });

  return mentions.map((m) => {
    const user = users.find((u) => u.id === m.userId);
    return {
      fid: user?.fid || "",
      username: user?.username || "",
      mentions: m._count.userId,
    };
  });
}

export async function getLeaderBoard() {
  const topToday = await getTopUserSince(getStartOfPeriod("day"));
  const topWeek = await getTopUserSince(getStartOfPeriod("week"));
  const topMonth = await getTopUserSince(getStartOfPeriod("month"));

  return {
    today: topToday,
    week: topWeek,
    month: topMonth,
  };
}
