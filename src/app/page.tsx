"use client";

import { useAccount, useBalance, useDisconnect } from "wagmi";
import { useAppKit } from "@reown/appkit/react";
import { useState, useEffect } from "react";
import { 
  Copy, 
  ExternalLink, 
  LogOut, 
  Wallet, 
  Gift, 
  Snowflake as SnowIcon,
  CheckCircle2,
  History,
  PieChart,
  Zap,
  Award,
  Activity
} from "lucide-react";
import Snowfall from "@/components/Snowfall";
import TransactionHistory from "@/components/TransactionHistory";
import PortfolioDashboard from "@/components/PortfolioDashboard";
import TokenSwap from "@/components/TokenSwap";
import FestiveRewards from "@/components/FestiveRewards";
import TransactionMotivation, { triggerTransactionMotivation } from "@/components/TransactionMotivation";
import BaseNetworkStats from "@/components/BaseNetworkStats";
import ConfettiExplosion from 'react-confetti-explosion';

type TabType = "overview" | "transactions" | "portfolio" | "swap" | "rewards" | "base-stats";

export default function Home() {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({
    address: address,
  });
  const { open } = useAppKit();
  const { disconnect } = useDisconnect();
  
  const [copied, setCopied] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isConnected) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isConnected]);

  const copyToClipboard = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const truncateAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const getChristmasMessage = () => {
    const today = new Date();
    const christmas = new Date(today.getFullYear(), 11, 25);
    if (today.getMonth() === 11 && today.getDate() === 25) {
      return "Merry Christmas! 🎄";
    }
    const diffTime = christmas.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays > 0 && diffDays < 365) {
      return `${diffDays} days until Christmas! 🎁`;
    }
    return "Keep the festive spirit alive! ✨";
  };

  if (!mounted) return null;

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen p-4 overflow-hidden">
      <Snowfall />
      
      {showConfetti && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
          <ConfettiExplosion particleCount={200} force={0.8} duration={3000} />
        </div>
      )}

      {/* Hero Section */}
      <div className="z-10 flex flex-col items-center w-full max-w-2xl p-8 space-y-8 text-center bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <div className="p-4 bg-festive-red rounded-full shadow-lg animate-bounce">
            <Gift size={48} className="text-white" />
          </div>
          <SnowIcon className="absolute -top-2 -right-2 text-blue-200 animate-spin-slow" size={24} />
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl">
            Xmas <span className="text-festive-red">Wallet</span>
          </h1>
          <p className="text-gray-300 font-medium">
            {getChristmasMessage()}
          </p>
        </div>

        {!isConnected ? (
          <button
            onClick={() => open()}
            className="group relative flex items-center justify-center w-full px-8 py-4 space-x-3 text-lg font-bold text-white transition-all bg-festive-red rounded-2xl hover:bg-red-700 active:scale-95 animate-festive-pulse"
          >
            <Wallet className="w-6 h-6" />
            <span>Connect Wallet</span>
          </button>
        ) : (
          <div className="w-full space-y-4 animate-in fade-in zoom-in duration-500">
            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === "overview"
                    ? "bg-festive-red text-white"
                    : "bg-white/5 text-gray-300 hover:bg-white/10"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("transactions")}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
                  activeTab === "transactions"
                    ? "bg-festive-red text-white"
                    : "bg-white/5 text-gray-300 hover:bg-white/10"
                }`}
              >
                <History size={16} />
                Transactions
              </button>
              <button
                onClick={() => setActiveTab("portfolio")}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
                  activeTab === "portfolio"
                    ? "bg-festive-red text-white"
                    : "bg-white/5 text-gray-300 hover:bg-white/10"
                }`}
              >
                <PieChart size={16} />
                Portfolio
              </button>
              <button
                onClick={() => setActiveTab("swap")}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
                  activeTab === "swap"
                    ? "bg-festive-red text-white"
                    : "bg-white/5 text-gray-300 hover:bg-white/10"
                }`}
              >
                <Zap size={16} />
                Swap
              </button>
              <button
                onClick={() => setActiveTab("rewards")}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
                  activeTab === "rewards"
                    ? "bg-festive-red text-white"
                    : "bg-white/5 text-gray-300 hover:bg-white/10"
                }`}
              >
                <Award size={16} />
                Rewards
              </button>
              <button
                onClick={() => setActiveTab("base-stats")}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
                  activeTab === "base-stats"
                    ? "bg-festive-red text-white"
                    : "bg-white/5 text-gray-300 hover:bg-white/10"
                }`}
              >
                <Activity size={16} />
                Base Network
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === "overview" && (
              <div className="p-4 space-y-3 text-left bg-black/20 rounded-2xl border border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Connected to Base</span>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-xs text-green-500 font-bold">Live</span>
                  </div>
                </div>

                <div className="flex items-center justify-between group">
                  <code className="text-lg font-mono text-white">
                    {truncateAddress(address!)}
                  </code>
                  <button 
                    onClick={copyToClipboard}
                    className="p-2 transition-colors hover:bg-white/10 rounded-lg"
                  >
                    {copied ? <CheckCircle2 size={18} className="text-green-500" /> : <Copy size={18} className="text-gray-400" />}
                  </button>
                </div>

                <div className="pt-2 border-t border-white/5">
                  <p className="text-sm text-gray-400">Balance</p>
                  <p className="text-2xl font-bold text-white">
                    {balance ? `${parseFloat(balance.formatted).toFixed(4)} ${balance.symbol}` : "0.00 ETH"}
                  </p>
                </div>
              </div>
            )}

            {activeTab === "transactions" && <TransactionHistory />}
            {activeTab === "portfolio" && <PortfolioDashboard />}
            {activeTab === "swap" && <TokenSwap />}
            {activeTab === "rewards" && <FestiveRewards />}
            {activeTab === "base-stats" && <BaseNetworkStats />}

            {/* Actions */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={`https://basescan.org/address/${address}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center p-3 space-x-2 text-sm font-bold text-white transition-all bg-white/5 rounded-xl hover:bg-white/10"
              >
                <ExternalLink size={16} />
                <span>BaseScan</span>
              </a>
              <button
                onClick={() => disconnect()}
                className="flex items-center justify-center p-3 space-x-2 text-sm font-bold text-red-400 transition-all bg-red-500/10 rounded-xl hover:bg-red-500/20"
              >
                <LogOut size={16} />
                <span>Disconnect</span>
              </button>
            </div>
          </div>
        )}

        <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 font-medium">
          <span>Powered by</span>
          <span className="text-blue-400">Base</span>
          <span>&</span>
          <span className="text-purple-400">Farcaster</span>
        </div>
      </div>

      {/* Transaction Motivation Modal */}
      <TransactionMotivation />

      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-festive-red/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-festive-green/20 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2" />
    </main>
  );
}
