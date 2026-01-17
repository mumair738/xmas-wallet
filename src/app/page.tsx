"use client";

import { useAccount, useBalance, useDisconnect, useSendTransaction } from "wagmi";
import { parseEther } from "viem";
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
  Send,
  Loader2
} from "lucide-react";
import Snowfall from "@/components/Snowfall";
import ConfettiExplosion from 'react-confetti-explosion';

export default function Home() {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({
    address: address,
  });
  const { open } = useAppKit();
  const { disconnect } = useDisconnect();
  const { sendTransaction, data: hash, isPending, isSuccess } = useSendTransaction();
  
  const [copied, setCopied] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [showGiftForm, setShowGiftForm] = useState(false);

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

  useEffect(() => {
    if (isSuccess) {
      setShowConfetti(true);
      setShowGiftForm(false);
      setRecipient("");
      setAmount("");
    }
  }, [isSuccess]);

  const handleSendGift = () => {
    if (!recipient || !amount) return;
    sendTransaction({
      to: recipient as `0x${string}`,
      value: parseEther(amount),
    });
  };

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
      <div className="z-10 flex flex-col items-center w-full max-w-md p-8 space-y-8 text-center bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 shadow-2xl">
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
            {/* Wallet Info Card */}
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
            {/* Send Gift Feature */}
            {!showGiftForm ? (
              <button
                onClick={() => setShowGiftForm(true)}
                className="flex items-center justify-center w-full p-4 space-x-2 font-bold text-white transition-all bg-festive-green rounded-xl hover:bg-green-700 active:scale-95"
              >
                <Gift size={20} />
                <span>Send a Xmas Gift</span>
              </button>
            ) : (
              <div className="p-4 space-y-4 text-left bg-black/20 rounded-2xl border border-white/10 animate-in slide-in-from-top-4 duration-300">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase">Recipient Address</label>
                  <input
                    type="text"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    placeholder="0x..."
                    className="w-full p-2 text-sm bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-festive-red"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase">Amount (ETH)</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.01"
                    className="w-full p-2 text-sm bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-festive-red"
                  />
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setShowGiftForm(false)}
                    className="flex-1 p-2 text-sm font-bold text-gray-400 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSendGift}
                    disabled={isPending || !recipient || !amount}
                    className="flex-[2] flex items-center justify-center p-2 space-x-2 text-sm font-bold text-white bg-festive-red rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send size={16} />}
                    <span>{isPending ? "Sending..." : "Send ETH"}</span>
                  </button>
                </div>
                {hash && (
                  <a
                    href={`https://basescan.org/tx/${hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-2 text-[10px] text-center text-blue-400 hover:underline"
                  >
                    View Transaction: {hash.slice(0, 10)}...{hash.slice(-8)}
                  </a>
                )}
              </div>
            )}
          </div>
        )}

        <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 font-medium">
          <span>Powered by</span>
          <span className="text-blue-400">Base</span>
          <span>&</span>
          <span className="text-purple-400">Farcaster</span>
        </div>
      </div>

      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-festive-red/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-festive-green/20 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2" />
    </main>
  );
}
