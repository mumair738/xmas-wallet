"use client";

import { useAccount } from "wagmi";
import { useState } from "react";
import { ArrowRightLeft } from "lucide-react";

const Zap = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" width="24" height="24">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

interface TokenOption {
  symbol: string;
  name: string;
  address: string;
  icon: string;
}

const TOKENS: TokenOption[] = [
  { symbol: "ETH", name: "Ethereum", address: "0x0000000000000000000000000000000000000000", icon: "Ξ" },
  { symbol: "USDC", name: "USD Coin", address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", icon: "$" },
  { symbol: "DAI", name: "Dai Stablecoin", address: "0x50c5725949A6F0c72E6C4a641F53D5d0B2F446bB", icon: "◆" },
  { symbol: "BASE", name: "Base", address: "0x4200000000000000000000000000000000000006", icon: "⬡" },
];

export default function TokenSwap() {
  const { address } = useAccount();
  const [fromToken, setFromToken] = useState(TOKENS[0]);
  const [toToken, setToToken] = useState(TOKENS[1]);
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [swapping, setSwapping] = useState(false);

  if (!address) return null;

  const handleSwapTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
  };

  const calculateSwapAmount = (value: string) => {
    if (!value) return "";
    // Mock exchange rate calculation
    const rate = 1.05;
    return (parseFloat(value) * rate).toFixed(6);
  };

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value);
    setToAmount(calculateSwapAmount(value));
  };

  const handleSwap = async () => {
    setSwapping(true);
    try {
      // Simulated swap - in production, integrate with 1inch or Uniswap API
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert(`Swapped ${fromAmount} ${fromToken.symbol} for ${toAmount} ${toToken.symbol}`);
      setFromAmount("");
      setToAmount("");
    } catch (error) {
      console.error("Swap failed:", error);
    } finally {
      setSwapping(false);
    }
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center gap-2">
        <Zap className="text-festive-red" size={20} />
        <h2 className="text-lg font-semibold text-white">Quick Swap</h2>
      </div>

      {/* From Token */}
      <div className="space-y-2">
        <label className="text-sm text-gray-300">From</label>
        <div className="relative">
          <input
            type="number"
            placeholder="0.0"
            value={fromAmount}
            onChange={(e) => handleFromAmountChange(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-festive-red transition"
          />
          <select
            value={fromToken.symbol}
            onChange={(e) => setFromToken(TOKENS.find((t) => t.symbol === e.target.value) || TOKENS[0])}
            className="absolute right-3 top-3 bg-transparent text-white border-none cursor-pointer font-semibold focus:outline-none"
          >
            {TOKENS.map((token) => (
              <option key={token.symbol} value={token.symbol} className="bg-gray-900">
                {token.symbol}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Swap Button */}
      <button
        onClick={handleSwapTokens}
        className="w-full py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg transition flex items-center justify-center gap-2 text-gray-300 hover:text-white"
      >
        <ArrowRightLeft size={18} />
        Swap
      </button>

      {/* To Token */}
      <div className="space-y-2">
        <label className="text-sm text-gray-300">To</label>
        <div className="relative">
          <input
            type="number"
            placeholder="0.0"
            value={toAmount}
            readOnly
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none cursor-not-allowed opacity-75"
          />
          <select
            value={toToken.symbol}
            onChange={(e) => setToToken(TOKENS.find((t) => t.symbol === e.target.value) || TOKENS[1])}
            className="absolute right-3 top-3 bg-transparent text-white border-none cursor-pointer font-semibold focus:outline-none"
          >
            {TOKENS.map((token) => (
              <option key={token.symbol} value={token.symbol} className="bg-gray-900">
                {token.symbol}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Execute Swap Button */}
      <button
        onClick={handleSwap}
        disabled={!fromAmount || swapping}
        className="w-full py-3 bg-gradient-to-r from-festive-red to-pink-600 hover:from-festive-red/80 hover:to-pink-600/80 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition duration-300 flex items-center justify-center gap-2"
      >
        {swapping ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Swapping...
          </>
        ) : (
          "Execute Swap"
        )}
      </button>

      {/* Info */}
      <div className="text-xs text-gray-400 text-center">
        Exchange rate: 1 {fromToken.symbol} ≈ 1.05 {toToken.symbol}
      </div>
    </div>
  );
}
