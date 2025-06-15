import express from "express";
const cors = require("cors");

const app = express();
const PORT = 8083;
app.use(cors()); // 👈 This allows all origins

const mockLeaderboard = {
  today: [
    {
      username: "user_one",
      score: "15",
      profileImage: "https://i.pravatar.cc/100?u=user1",
    },
    {
      username: "user_two",
      score: "10",
      profileImage: "https://i.pravatar.cc/100?u=user2",
    },
    {
      username: "user_three",
      score: "7",
      profileImage: "https://i.pravatar.cc/100?u=user3",
    },
  ],
  week: [
    {
      username: "user_four",
      score: "42",
      profileImage: "https://i.pravatar.cc/100?u=user4",
    },
    {
      username: "user_five",
      score: "35",
      profileImage: "https://i.pravatar.cc/100?u=user5",
    },
    {
      username: "user_six",
      score: "28",
      profileImage: "https://i.pravatar.cc/100?u=user6",
    },
  ],
  month: [
    {
      username: "user_seven",
      score: "100",
      profileImage: "https://i.pravatar.cc/100?u=user7",
    },
    {
      username: "user_eight",
      score: "88",
      profileImage: "https://i.pravatar.cc/100?u=user8",
    },
    {
      username: "user_nine",
      score: "75",
      profileImage: "https://i.pravatar.cc/100?u=user9",
    },
  ],
};

app.get("/api/leaderboard", (req, res) => {
  res.json(mockLeaderboard);
});

app.listen(PORT, () => {
  console.log(`Mock server running at http://localhost:${PORT}`);
});
