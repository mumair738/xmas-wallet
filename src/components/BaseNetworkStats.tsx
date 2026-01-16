"use client";

import { useEffect, useState } from "react";
import { Activity, TrendingUp, Users, Zap } from "lucide-react";

interface NetworkStats {
  dailyTx: number;
  activeUsers: number;
  avgGasPrice: number;
  networkHealth: number;
}

export default function BaseNetworkStats() {
  const [stats, setStats] = useState<NetworkStats>({
    dailyTx: 0,
    activeUsers: 0,
    avgGasPrice: 0,
    networkHealth: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching Base network stats
    const fetchStats = async () => {
      setLoading(true);
      try {
        // Mock data - in production, fetch from Base RPC or API
        await new Promise((resolve) => setTimeout(resolve, 800));

        setStats({
          dailyTx: Math.floor(Math.random() * 500000) + 300000,
          activeUsers: Math.floor(Math.random() * 50000) + 25000,
          avgGasPrice: (Math.random() * 0.5 + 0.1).toFixed(2) as unknown as number,
          networkHealth: Math.floor(Math.random() * 20) + 85,
        });
      } catch (error) {
        console.error("Failed to fetch Base stats:", error);
      }
      setLoading(false);
    };

    fetchStats();
    // Refresh stats every 30 seconds
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center gap-2">
        <Activity className="text-blue-400" size={20} />
        <h2 className="text-lg font-semibold text-white">Base Network Stats</h2>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 gap-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 bg-white/5 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {/* Daily Transactions */}
          <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg p-4 border border-white/10 hover:border-blue-400/50 transition">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300 text-sm">Daily Transactions</span>
              <TrendingUp size={16} className="text-blue-400" />
            </div>
            <p className="text-2xl font-bold text-white">
              {(stats.dailyTx / 1000).toFixed(0)}K
            </p>
            <p className="text-xs text-blue-300 mt-1">↑ Network Active</p>
          </div>

          {/* Active Users */}
          <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-lg p-4 border border-white/10 hover:border-green-400/50 transition">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300 text-sm">Active Users</span>
              <Users size={16} className="text-green-400" />
            </div>
            <p className="text-2xl font-bold text-white">
              {(stats.activeUsers / 1000).toFixed(1)}K
            </p>
            <p className="text-xs text-green-300 mt-1">Growing 📈</p>
          </div>

          {/* Avg Gas Price */}
          <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 rounded-lg p-4 border border-white/10 hover:border-yellow-400/50 transition">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300 text-sm">Avg Gas (Gwei)</span>
              <Zap size={16} className="text-yellow-400" />
            </div>
            <p className="text-2xl font-bold text-white">{stats.avgGasPrice}</p>
            <p className="text-xs text-yellow-300 mt-1">💰 Low Fees</p>
          </div>

          {/* Network Health */}
          <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-lg p-4 border border-white/10 hover:border-purple-400/50 transition">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300 text-sm">Network Health</span>
              <Activity size={16} className="text-purple-400" />
            </div>
            <p className="text-2xl font-bold text-white">{stats.networkHealth}%</p>
            <div className="w-full bg-white/10 rounded-full h-2 mt-2">
              <div
                className="bg-gradient-to-r from-purple-400 to-purple-600 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${stats.networkHealth}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Base Highlight */}
      <div className="bg-gradient-to-r from-blue-500/20 via-blue-600/20 to-blue-700/20 rounded-lg p-4 border border-blue-400/30">
        <div className="flex items-start gap-3">
          <span className="text-2xl">🌍</span>
          <div>
            <p className="text-white font-semibold">Base is Growing Fast</p>
            <p className="text-gray-300 text-sm mt-1">
              Build on Base for fast, cheap, and secure transactions powered by Ethereum.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
