"use client";

import { useAccount, useBalance } from "wagmi";
import { useEffect, useState } from "react";
import { TrendingUp, PieChart } from "lucide-react";

interface AssetData {
  symbol: string;
  balance: number;
  value: number;
  percentage: number;
  change24h: number;
}

export default function PortfolioDashboard() {
  const { address } = useAccount();
  const { data: ethBalance } = useBalance({ address });
  const [assets, setAssets] = useState<AssetData[]>([]);
  const [totalValue, setTotalValue] = useState(0);
  const [change24h, setChange24h] = useState(0);

  useEffect(() => {
    if (!ethBalance) return;

    const ethValue = parseFloat(ethBalance.formatted) * 3000; // Mock ETH price
    const mockAssets: AssetData[] = [
      {
        symbol: "ETH",
        balance: parseFloat(ethBalance.formatted),
        value: ethValue,
        percentage: 60,
        change24h: 2.5,
      },
      {
        symbol: "USDC",
        balance: 100,
        value: 100,
        percentage: 25,
        change24h: 0.1,
      },
      {
        symbol: "BASE",
        balance: 500,
        value: 250,
        percentage: 15,
        change24h: -1.2,
      },
    ];

    setAssets(mockAssets);
    setTotalValue(ethValue + 350);
    setChange24h(1.5);
  }, [ethBalance]);

  if (!address) return null;

  const colors = ["bg-blue-500", "bg-green-500", "bg-purple-500"];

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center gap-2">
        <PieChart className="text-festive-red" size={20} />
        <h2 className="text-lg font-semibold text-white">Portfolio Overview</h2>
      </div>

      {/* Total Value */}
      <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg p-4 border border-white/10">
        <p className="text-gray-300 text-sm mb-2">Total Portfolio Value</p>
        <div className="flex items-baseline gap-2">
          <h3 className="text-3xl font-bold text-white">${totalValue.toFixed(2)}</h3>
          <span className={`text-sm font-semibold ${change24h >= 0 ? "text-green-400" : "text-red-400"}`}>
            {change24h >= 0 ? "+" : ""}{change24h}% (24h)
          </span>
        </div>
      </div>

      {/* Asset Breakdown */}
      <div className="space-y-3">
        {assets.map((asset, idx) => (
          <div key={asset.symbol} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-white font-medium text-sm">{asset.symbol}</span>
              <div className="text-right">
                <p className="text-white text-sm font-semibold">{asset.balance.toFixed(4)}</p>
                <p className="text-gray-400 text-xs">${asset.value.toFixed(2)}</p>
              </div>
            </div>
            <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className={`h-full ${colors[idx]} transition-all duration-500`}
                style={{ width: `${asset.percentage}%` }}
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-xs">{asset.percentage}% of portfolio</span>
              <span className={`text-xs font-semibold flex items-center gap-1 ${asset.change24h >= 0 ? "text-green-400" : "text-red-400"}`}>
                <TrendingUp size={12} />
                {asset.change24h >= 0 ? "+" : ""}{asset.change24h}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
