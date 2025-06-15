import { Router, Request, Response } from "express";
import { getLeaderBoard } from "../services/leaderboard";

const router = Router();

router.get("/leaderboard", async (req: Request, res: any) => {
  try {
    const leaderboard = await getLeaderBoard();
    res.json({
      today: leaderboard.today,
      week: leaderboard.week,
      month: leaderboard.month,
    });
  } catch (err: any) {
    console.error("Error fetching leaderboard:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
