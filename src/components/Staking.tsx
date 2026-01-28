"use client";

import { useAccount, useBalance } from "wagmi";
import { useState } from "react";
import { Coins, Lock, Unlock, Info } from "lucide-react";

interface StakingPool {
  id: string;
  name: string;
  apy: number;
  lockPeriod: string;
  totalStaked: string;
  icon: string;
}

const STAKING_POOLS: StakingPool[] = [
  {
    id: "1",
    name: "ETH Staking",
    apy: 4.5,
    lockPeriod: "No lock",
    totalStaked: "1.2M ETH",
    icon: "🔵",
  },
  {
    id: "2",
    name: "Base Rewards",
    apy: 12.8,
    lockPeriod: "30 days",
    totalStaked: "500K BASE",
    icon: "⬡",
  },
  {
    id: "3",
    name: "Holiday Special",
    apy: 25.0,
    lockPeriod: "90 days",
    totalStaked: "250K XMAS",
    icon: "🎄",
  },
];

export default function Staking() {
  const { address } = useAccount();
  const { data: balance } = useBalance({ address });
  const [selectedPool, setSelectedPool] = useState<StakingPool | null>(null);
  const [stakeAmount, setStakeAmount] = useState("");
  const [isStaking, setIsStaking] = useState(false);

  if (!address) return null;

  const handleStake = async () => {
    if (!selectedPool || !stakeAmount) return;
    setIsStaking(true);
    // Simulate staking transaction
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsStaking(false);
    setSelectedPool(null);
    setStakeAmount("");
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center gap-2">
        <Coins className="text-yellow-400" size={20} />
        <h2 className="text-lg font-semibold text-white">Staking Pools</h2>
      </div>

      {/* Info Banner */}
      <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg p-3 border border-yellow-400/30">
        <div className="flex items-start gap-3">
          <Info className="text-yellow-400 flex-shrink-0" size={18} />
          <div>
            <p className="text-white text-sm font-semibold">Earn Rewards by Staking</p>
            <p className="text-gray-300 text-xs mt-1">
              Stake your tokens to earn passive income. Higher lock periods offer better APY.
            </p>
          </div>
        </div>
      </div>

      {/* Staking Pools */}
      <div className="space-y-2">
        {STAKING_POOLS.map((pool) => (
          <div
            key={pool.id}
            className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-festive-red/50 transition cursor-pointer"
            onClick={() => setSelectedPool(pool)}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{pool.icon}</span>
                <div>
                  <p className="text-white font-semibold">{pool.name}</p>
                  <p className="text-gray-400 text-xs">{pool.totalStaked} staked</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-green-400 text-xl font-bold">{pool.apy}%</p>
                <p className="text-gray-400 text-xs">APY</p>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1 text-gray-400">
                <Lock size={12} />
                <span>{pool.lockPeriod}</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPool(pool);
                }}
                className="px-3 py-1 bg-festive-red hover:bg-red-700 text-white rounded font-semibold transition"
              >
                Stake Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Staking Modal */}
      {selectedPool && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in"
          onClick={() => setSelectedPool(null)}
        >
          <div
            className="bg-gray-900 rounded-2xl border border-white/20 max-w-md w-full p-6 space-y-4 animate-in zoom-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">{selectedPool.icon}</span>
              <div>
                <h3 className="text-white font-bold text-xl">{selectedPool.name}</h3>
                <p className="text-green-400 font-semibold">{selectedPool.apy}% APY</p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-300">Amount to Stake</label>
              <input
                type="number"
                value={stakeAmount}
                onChange={(e) => setStakeAmount(e.target.value)}
                placeholder="0.0"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-festive-red transition"
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>Available: {balance ? parseFloat(balance.formatted).toFixed(4) : "0.00"} ETH</span>
                <button
                  onClick={() =>
                    balance && setStakeAmount(parseFloat(balance.formatted).toString())
                  }
                  className="text-festive-red hover:underline"
                >
                  Max
                </button>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-3 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Lock Period:</span>
                <span className="text-white font-semibold">{selectedPool.lockPeriod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Estimated Rewards:</span>
                <span className="text-green-400 font-semibold">
                  {stakeAmount
                    ? (parseFloat(stakeAmount) * (selectedPool.apy / 100)).toFixed(4)
                    : "0.00"}{" "}
                  ETH/year
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setSelectedPool(null)}
                className="flex-1 p-3 bg-white/5 hover:bg-white/10 text-white rounded-lg font-semibold transition"
              >
                Cancel
              </button>
              <button
                onClick={handleStake}
                disabled={!stakeAmount || isStaking}
                className="flex-1 p-3 bg-festive-red hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition flex items-center justify-center gap-2"
              >
                {isStaking ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Staking...
                  </>
                ) : (
                  <>
                    <Lock size={16} />
                    Stake
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* My Stakes */}
      <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg p-4 border border-white/10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Unlock className="text-purple-400" size={18} />
            <span className="text-white font-semibold">My Active Stakes</span>
          </div>
        </div>
        <div className="text-center py-4">
          <p className="text-gray-400 text-sm">No active stakes yet</p>
          <p className="text-gray-500 text-xs mt-1">Start staking to earn rewards</p>
        </div>
      </div>
    </div>
  );
}
