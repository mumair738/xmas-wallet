"use client";

import { useEffect, useState } from "react";
import { Zap, X, Heart } from "lucide-react";

interface MotivationMessage {
  title: string;
  message: string;
  emoji: string;
  color: string;
}

const MOTIVATION_MESSAGES: MotivationMessage[] = [
  {
    title: "Base Blast! 🚀",
    message: "You're crushing it on Base! Every transaction makes you a Base pioneer.",
    emoji: "🎉",
    color: "from-blue-500 to-blue-600",
  },
  {
    title: "Speed Champion ⚡",
    message: "Lightning-fast transaction on Base. You're part of the web3 revolution!",
    emoji: "⚡",
    color: "from-yellow-500 to-yellow-600",
  },
  {
    title: "Low Gas Hero 💰",
    message: "Base's low fees mean more for you. Smart move!",
    emoji: "💎",
    color: "from-green-500 to-green-600",
  },
  {
    title: "Ecosystem Builder 🏗️",
    message: "You're building on the future of Ethereum. Legendary!",
    emoji: "🌟",
    color: "from-purple-500 to-purple-600",
  },
  {
    title: "On-Chain Champion 🏆",
    message: "Another step on your Base journey. Keep it up!",
    emoji: "👑",
    color: "from-red-500 to-red-600",
  },
  {
    title: "Festive Transactor 🎄",
    message: "Your transaction is spreading holiday cheer across the Base network!",
    emoji: "🎁",
    color: "from-festive-red to-pink-600",
  },
];

export default function TransactionMotivation() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentMessage, setCurrentMessage] = useState<MotivationMessage>(MOTIVATION_MESSAGES[0]);

  useEffect(() => {
    // Listen for transaction events (triggered from other components)
    const handleTransactionEvent = () => {
      const randomMessage = MOTIVATION_MESSAGES[Math.floor(Math.random() * MOTIVATION_MESSAGES.length)];
      setCurrentMessage(randomMessage);
      setIsVisible(true);

      // Auto-hide after 5 seconds
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 5000);

      return () => clearTimeout(timer);
    };

    // Custom event listener for transactions
    window.addEventListener("baseTransaction", handleTransactionEvent);
    return () => window.removeEventListener("baseTransaction", handleTransactionEvent);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
      <div className="pointer-events-auto animate-in zoom-in duration-300">
        <div className={`bg-gradient-to-br ${currentMessage.color} rounded-2xl p-8 shadow-2xl border border-white/20 max-w-md w-96 relative overflow-hidden`}>
          {/* Background glow effect */}
          <div className="absolute inset-0 opacity-20 blur-xl">
            <div className="absolute inset-0 bg-white/10 rounded-full" />
          </div>

          {/* Close button */}
          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition z-10"
          >
            <X size={20} className="text-white" />
          </button>

          {/* Content */}
          <div className="relative z-5 text-center space-y-4">
            {/* Icon */}
            <div className="text-6xl text-center">{currentMessage.emoji}</div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-white">{currentMessage.title}</h2>

            {/* Message */}
            <p className="text-white/90 text-lg leading-relaxed">{currentMessage.message}</p>

            {/* Stats */}
            <div className="flex justify-around pt-4 border-t border-white/20">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">⚡</div>
                <p className="text-white/70 text-sm">Fast</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">💰</div>
                <p className="text-white/70 text-sm">Cheap</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">🔒</div>
                <p className="text-white/70 text-sm">Secure</p>
              </div>
            </div>

            {/* Action text */}
            <div className="flex items-center justify-center gap-2 pt-2">
              <Heart size={16} className="text-white/80 animate-pulse" />
              <p className="text-white/80 text-sm">Keep building on Base!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function to trigger transaction motivation
export const triggerTransactionMotivation = () => {
  const event = new Event("baseTransaction");
  window.dispatchEvent(event);
};
