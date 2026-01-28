"use client";

import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, Activity, RefreshCw } from "lucide-react";

interface Token {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volume: string;
  marketCap: string;
  icon: string;
}

export default function PriceTracker() {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchPrices = async () => {
    setRefreshing(true);
    // Simulate API call - in production, use CoinGecko or similar
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const mockTokens: Token[] = [
      {
        symbol: "ETH",
        name: "Ethereum",
        price: 2456.78,
        change24h: (Math.random() - 0.4) * 10,
        volume: "$12.3B",
        marketCap: "$295B",
        icon: "🔵",
      },
      {
        symbol: "BASE",
        name: "Base",
        price: 1.23,
        change24h: (Math.random() - 0.3) * 15,
        volume: "$234M",
        marketCap: "$1.2B",
        icon: "⬡",
      },
      {
        symbol: "USDC",
        name: "USD Coin",
        price: 1.0,
        change24h: 0.01,
        volume: "$3.4B",
        marketCap: "$32B",
        icon: "💵",
      },
      {
        symbol: "DAI",
        name: "Dai",
        price: 0.9998,
        change24h: -0.02,
        volume: "$456M",
        marketCap: "$5.3B",
        icon: "◆",
      },
    ];

    setTokens(mockTokens);
    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="text-green-400" size={20} />
          <h2 className="text-lg font-semibold text-white">Live Prices</h2>
        </div>
        <button
          onClick={fetchPrices}
          disabled={refreshing}
          className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition disabled:opacity-50"
        >
          <RefreshCw
            size={16}
            className={`text-gray-400 ${refreshing ? "animate-spin" : ""}`}
          />
        </button>
      </div>

      {loading ? (
        <div className="space-y-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-20 bg-white/5 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {tokens.map((token) => (
            <div
              key={token.symbol}
              className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-green-400/50 transition"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{token.icon}</span>
                  <div>
                    <p className="text-white font-semibold">{token.symbol}</p>
                    <p className="text-gray-400 text-xs">{token.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold text-lg">
                    ${token.price.toLocaleString()}
                  </p>
                  <div className="flex items-center gap-1 justify-end">
                    {token.change24h >= 0 ? (
                      <TrendingUp className="text-green-400" size={14} />
                    ) : (
                      <TrendingDown className="text-red-400" size={14} />
                    )}
                    <span
                      className={`text-sm font-semibold ${
                        token.change24h >= 0 ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {token.change24h >= 0 ? "+" : ""}
                      {token.change24h.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between mt-3 pt-3 border-t border-white/5">
                <div>
                  <p className="text-gray-400 text-xs">Volume (24h)</p>
                  <p className="text-white text-sm font-semibold">{token.volume}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-xs">Market Cap</p>
                  <p className="text-white text-sm font-semibold">{token.marketCap}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
