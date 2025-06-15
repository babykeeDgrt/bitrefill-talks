const getMedal = (index: number) => {
  if (index === 0) return { emoji: "🥇", color: "border-yellow-400" };
  if (index === 1) return { emoji: "🥈", color: "border-gray-300" };
  if (index === 2) return { emoji: "🥉", color: "border-amber-700" };
  return null;
};

export const Section = ({ title, users }: { title: string; users: any[] }) => {
  return (
    <div className="bg-zinc-900 p-4 rounded-2xl shadow-md border border-zinc-700">
      <h2 className="text-lg sm:text-xl font-semibold mb-4 text-center text-white">
        {title}
      </h2>

      {users.length === 0 ? (
        <p className="text-sm text-zinc-400 text-center">No mentions yet.</p>
      ) : (
        <>
          <div className="flex justify-between text-xs text-zinc-400 mb-2 px-2">
            <span>User</span>
            <span>Score</span>
          </div>

          <ul className="space-y-3">
            {users.map((user, index) => {
              const medal = getMedal(index);

              return (
                <li
                  key={index}
                  className="flex justify-between items-center bg-zinc-800 p-3 rounded-xl"
                >
                  {/* Left side: Avatar and Username */}
                  <div className="flex flex-col items-center gap-1 relative">
                    <img
                      src={user.profileImage}
                      alt="avatar"
                      className={`w-10 h-10 rounded-full border-2 ${
                        medal ? medal.color : "border-transparent"
                      }`}
                    />
                    {medal && (
                      <span className="absolute -top-3 text-lg">
                        {medal.emoji}
                      </span>
                    )}
                    <p className="text-xs text-white break-words max-w-[4rem] text-center">
                      {user.username || "anonymous"}
                    </p>
                  </div>

                  {/* Right side: Score */}
                  <div className="flex items-center h-full">
                    <span className="text-white text-base font-bold">
                      {user.score}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
};
