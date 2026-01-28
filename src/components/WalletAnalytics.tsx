"use client";

import { useAccount, useBalance } from "wagmi";
import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, DollarSign, ArrowUpRight, BarChart3 } from "lucide-react";

interface Analytics {
  totalValue: number;
  change24h: number;
  txCount: number;
  gasSpent: number;
  profitLoss: number;
}

export default function WalletAnalytics() {
  const { address } = useAccount();
  const { data: balance } = useBalance({ address });
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState<"24h" | "7d" | "30d">("24h");

  useEffect(() => {
    if (!address) return;

    const fetchAnalytics = async () => {
      setLoading(true);
      // Simulate fetching analytics - in production, use proper API
      await new Promise((resolve) => setTimeout(resolve, 800));

      const mockAnalytics: Analytics = {
        totalValue: balance ? parseFloat(balance.formatted) * 2500 : 1250,
        change24h: (Math.random() - 0.4) * 10,
        txCount: Math.floor(Math.random() * 50) + 10,
        gasSpent: (Math.random() * 0.05).toFixed(4) as unknown as number,
        profitLoss: (Math.random() - 0.3) * 500,
      };

      setAnalytics(mockAnalytics);
      setLoading(false);
    };

    fetchAnalytics();
  }, [address, balance, timeframe]);

  if (!address) return null;

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart3 className="text-blue-400" size={20} />
          <h2 className="text-lg font-semibold text-white">Wallet Analytics</h2>
        </div>
        <div className="flex gap-1 bg-white/5 rounded-lg p-1">
          {["24h", "7d", "30d"].map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf as typeof timeframe)}
              className={`px-3 py-1 text-xs font-semibold rounded transition ${
                timeframe === tf
                  ? "bg-festive-red text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {loading || !analytics ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-20 bg-white/5 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {/* Total Value */}
          <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg p-4 border border-white/10">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-gray-300 text-sm mb-1">Total Portfolio Value</p>
                <p className="text-3xl font-bold text-white">
                  ${analytics.totalValue.toFixed(2)}
                </p>
              </div>
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <DollarSign className="text-blue-400" size={24} />
              </div>
            </div>
            <div className="flex items-center gap-2 mt-3">
              {analytics.change24h >= 0 ? (
                <TrendingUp className="text-green-400" size={16} />
              ) : (
                <TrendingDown className="text-red-400" size={16} />
              )}
              <span
                className={`text-sm font-semibold ${
                  analytics.change24h >= 0 ? "text-green-400" : "text-red-400"
                }`}
              >
                {analytics.change24h >= 0 ? "+" : ""}
                {analytics.change24h.toFixed(2)}%
              </span>
              <span className="text-gray-400 text-xs">{timeframe}</span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            {/* Transaction Count */}
            <div className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-purple-400/50 transition">
              <div className="flex items-center gap-2 mb-2">
                <ArrowUpRight className="text-purple-400" size={16} />
                <span className="text-gray-300 text-xs">Transactions</span>
              </div>
              <p className="text-2xl font-bold text-white">{analytics.txCount}</p>
              <p className="text-xs text-gray-400 mt-1">Past {timeframe}</p>
            </div>

            {/* Gas Spent */}
            <div className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-yellow-400/50 transition">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="text-yellow-400" size={16} />
                <span className="text-gray-300 text-xs">Gas Spent</span>
              </div>
              <p className="text-2xl font-bold text-white">{analytics.gasSpent} ETH</p>
              <p className="text-xs text-gray-400 mt-1">Network fees</p>
            </div>
          </div>

          {/* Profit/Loss */}
          <div
            className={`rounded-lg p-4 border ${
              analytics.profitLoss >= 0
                ? "bg-gradient-to-br from-green-500/20 to-green-600/20 border-green-400/30"
                : "bg-gradient-to-br from-red-500/20 to-red-600/20 border-red-400/30"
            }`}
          >
            <p className="text-gray-300 text-sm mb-1">Profit / Loss</p>
            <div className="flex items-baseline gap-2">
              <p
                className={`text-3xl font-bold ${
                  analytics.profitLoss >= 0 ? "text-green-400" : "text-red-400"
                }`}
              >
                {analytics.profitLoss >= 0 ? "+" : ""}${Math.abs(analytics.profitLoss).toFixed(2)}
              </p>
              <span className="text-gray-400 text-sm">USD</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
