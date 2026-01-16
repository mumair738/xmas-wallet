"use client";

import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { Star, Gift, Flame, Award } from "lucide-react";

interface Reward {
  id: string;
  title: string;
  description: string;
  points: number;
  icon: React.ReactNode;
  claimed: boolean;
  color: string;
}

export default function FestiveRewards() {
  const { address, isConnected } = useAccount();
  const [totalPoints, setTotalPoints] = useState(0);
  const [tier, setTier] = useState("Snowflake");
  const [rewards, setRewards] = useState<Reward[]>([]);

  useEffect(() => {
    if (!isConnected || !address) return;

    // Mock rewards based on wallet activity
    const mockRewards: Reward[] = [
      {
        id: "1",
        title: "Welcome Bonus",
        description: "Connect your wallet",
        points: 100,
        icon: <Gift className="text-blue-400" />,
        claimed: true,
        color: "from-blue-500/20 to-blue-600/20",
      },
      {
        id: "2",
        title: "First Transaction",
        description: "Make your first swap",
        points: 50,
        icon: <Zap className="text-yellow-400" />,
        claimed: true,
        color: "from-yellow-500/20 to-yellow-600/20",
      },
      {
        id: "3",
        title: "Daily Visitor",
        description: "Come back tomorrow",
        points: 25,
        icon: <Star className="text-purple-400" />,
        claimed: false,
        color: "from-purple-500/20 to-purple-600/20",
      },
      {
        id: "4",
        title: "Festive Champion",
        description: "Reach 500+ points",
        points: 200,
        icon: <Flame className="text-red-400" />,
        claimed: false,
        color: "from-red-500/20 to-red-600/20",
      },
    ];

    setRewards(mockRewards);
    setTotalPoints(150);
    setTier("Snowflake");
  }, [isConnected, address]);

  if (!isConnected || !address) return null;

  const getTierBadge = () => {
    if (totalPoints >= 500) return { name: "Festive Legend", color: "bg-gradient-to-r from-gold-400 to-yellow-400" };
    if (totalPoints >= 300) return { name: "Jingle Master", color: "bg-gradient-to-r from-red-400 to-pink-400" };
    if (totalPoints >= 100) return { name: "Snowflake", color: "bg-gradient-to-r from-blue-400 to-cyan-400" };
    return { name: "Holiday Spirit", color: "bg-gradient-to-r from-green-400 to-emerald-400" };
  };

  const badge = getTierBadge();

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center gap-2">
        <Award className="text-festive-red" size={20} />
        <h2 className="text-lg font-semibold text-white">Festive Rewards</h2>
      </div>

      {/* Points Card */}
      <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg p-4 border border-white/10">
        <div className="flex justify-between items-start mb-3">
          <div>
            <p className="text-gray-300 text-sm mb-1">Total Points</p>
            <h3 className="text-3xl font-bold text-white">{totalPoints}</h3>
          </div>
          <div className={`px-3 py-1 rounded-full text-white text-xs font-bold ${badge.color}`}>
            {badge.name}
          </div>
        </div>
        <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-400 to-emerald-400 transition-all duration-500"
            style={{ width: `${(totalPoints / 500) * 100}%` }}
          />
        </div>
        <p className="text-gray-400 text-xs mt-2">{500 - totalPoints} points until Festive Legend</p>
      </div>

      {/* Rewards List */}
      <div className="space-y-2">
        {rewards.map((reward) => (
          <div
            key={reward.id}
            className={`bg-gradient-to-r ${reward.color} rounded-lg p-3 border border-white/10 transition hover:border-white/20 ${!reward.claimed ? "opacity-75" : ""}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <div className="p-2 bg-white/10 rounded-lg">{reward.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-semibold ${reward.claimed ? "text-white" : "text-gray-300"}`}>
                    {reward.title}
                  </p>
                  <p className="text-xs text-gray-400">{reward.description}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-festive-red">+{reward.points}</p>
                <span className={`text-xs font-semibold ${reward.claimed ? "text-green-400" : "text-gray-400"}`}>
                  {reward.claimed ? "✓ Claimed" : "Pending"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Icon components
const Zap = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" width="24" height="24">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);
