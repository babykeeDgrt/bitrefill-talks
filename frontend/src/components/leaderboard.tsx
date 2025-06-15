import { useEffect, useState } from "react";
import axios from "axios";
import { SkeletonCard } from "./SkeletonCard";
import { Section } from "./Section";

const localTunel = "https://tender-cameras-make.loca.lt";
const localHost = "http://localhost:8083";

export function Leaderboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${localTunel}/api/leaderboard`); //
        const { today, week, month } = res.data;
        console.log(res);

        setData({
          today: today.map((user: any) => ({
            ...user,
            score: user.score.toLocaleString(),
          })),
          week: week.map((user: any) => ({
            ...user,
            score: user.score.toLocaleString(),
          })),
          month: month.map((user: any) => ({
            ...user,
            score: user.score.toLocaleString(),
          })),
        });
      } catch (err) {
        console.error("Failed to fetch leaderboard", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 md:px-10 bg-zinc-950 text-white">
      <div className="max-w-screen-lg mx-auto text-center">
        <h1
          className="font-bold mb-8 flex items-center justify-center gap-2
        sm:text-1xl md:txt-2xl lg:text-3xl"
        >
          <span role="img" aria-label="trophy">
            🏆
          </span>
          Bitrefill Mentions Leaderboard
        </h1>

        {loading || !data ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div className="h-40 rounded-xl bg-zinc-800">
                <SkeletonCard key={i} />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Section title="Top Today" users={data.today} />
            <Section title="Top This Week" users={data.week} />
            <Section title="Top This Month" users={data.month} />
          </div>
        )}
      </div>
    </main>
  );
}
