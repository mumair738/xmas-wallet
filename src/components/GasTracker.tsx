"use client";

import { useState, useEffect } from "react";
import { Fuel, Clock, Zap, TrendingDown } from "lucide-react";

interface GasPrice {
  slow: number;
  standard: number;
  fast: number;
  instant: number;
}

export default function GasTracker() {
  const [gasPrices, setGasPrices] = useState<GasPrice | null>(null);
  const [loading, setLoading] = useState(true);
  const [trend, setTrend] = useState<"up" | "down" | "stable">("stable");

  useEffect(() => {
    const fetchGasPrices = async () => {
      setLoading(true);
      // Simulate fetching gas prices from Base RPC
      await new Promise((resolve) => setTimeout(resolve, 800));

      const baseGas = Math.random() * 0.5 + 0.1;
      const mockGasPrices: GasPrice = {
        slow: parseFloat((baseGas * 0.8).toFixed(4)),
        standard: parseFloat(baseGas.toFixed(4)),
        fast: parseFloat((baseGas * 1.2).toFixed(4)),
        instant: parseFloat((baseGas * 1.5).toFixed(4)),
      };

      setGasPrices(mockGasPrices);
      setTrend(Math.random() > 0.5 ? "down" : "stable");
      setLoading(false);
    };

    fetchGasPrices();
    const interval = setInterval(fetchGasPrices, 15000);
    return () => clearInterval(interval);
  }, []);

  const getTimeEstimate = (type: string) => {
    switch (type) {
      case "slow":
        return "~5 min";
      case "standard":
        return "~2 min";
      case "fast":
        return "~30 sec";
      case "instant":
        return "~10 sec";
      default:
        return "";
    }
  };

  const getSpeedIcon = (type: string) => {
    switch (type) {
      case "slow":
        return <Clock size={18} className="text-gray-400" />;
      case "standard":
        return <Fuel size={18} className="text-blue-400" />;
      case "fast":
        return <Zap size={18} className="text-yellow-400" />;
      case "instant":
        return <Zap size={18} className="text-red-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Fuel className="text-orange-400" size={20} />
          <h2 className="text-lg font-semibold text-white">Gas Tracker</h2>
        </div>
        {trend === "down" && (
          <div className="flex items-center gap-1 px-2 py-1 bg-green-500/20 rounded text-green-400 text-xs font-semibold">
            <TrendingDown size={14} />
            Low
          </div>
        )}
      </div>

      {loading || !gasPrices ? (
        <div className="space-y-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-16 bg-white/5 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {Object.entries(gasPrices).map(([type, price]) => (
            <div
              key={type}
              className="bg-white/5 rounded-lg p-3 border border-white/10 hover:border-orange-400/50 transition"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getSpeedIcon(type)}
                  <div>
                    <p className="text-white font-semibold capitalize">{type}</p>
                    <p className="text-gray-400 text-xs">{getTimeEstimate(type)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold text-lg">{price}</p>
                  <p className="text-gray-400 text-xs">Gwei</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Info Card */}
      <div className="bg-gradient-to-r from-orange-500/20 to-yellow-500/20 rounded-lg p-3 border border-orange-400/30">
        <div className="flex items-start gap-2">
          <span className="text-xl">💡</span>
          <div>
            <p className="text-white text-sm font-semibold">Save on Gas Fees</p>
            <p className="text-gray-300 text-xs mt-1">
              Base offers significantly lower gas fees compared to Ethereum mainnet. Perfect for
              everyday transactions!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
