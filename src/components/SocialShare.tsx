"use client";

import { useAccount } from "wagmi";
import { Share2, Twitter, Copy, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function SocialShare() {
  const { address } = useAccount();
  const [copied, setCopied] = useState(false);

  if (!address) return null;

  const shareUrl = `https://xmas-wallet.vercel.app`;
  const shareText = `Just connected to Xmas Wallet on @base! 🎄 Experience the festive season with seamless blockchain transactions. #BaseChain #Web3 #XmasWallet`;

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      shareText
    )}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, "_blank");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center gap-2">
        <Share2 className="text-blue-400" size={20} />
        <h2 className="text-lg font-semibold text-white">Share & Earn</h2>
      </div>

      {/* Share Card */}
      <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg p-6 border border-white/10">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-festive-red rounded-full flex items-center justify-center">
            <Share2 className="text-white" size={32} />
          </div>
          <div>
            <h3 className="text-white font-bold text-xl mb-2">Spread the Festive Cheer!</h3>
            <p className="text-gray-300 text-sm">
              Share Xmas Wallet with your friends and earn bonus rewards for every referral
            </p>
          </div>

          {/* Share Buttons */}
          <div className="flex flex-col gap-2 pt-4">
            <button
              onClick={handleTwitterShare}
              className="flex items-center justify-center gap-2 w-full p-3 bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white rounded-lg font-semibold transition"
            >
              <Twitter size={20} />
              Share on Twitter
            </button>

            <button
              onClick={handleCopyLink}
              className="flex items-center justify-center gap-2 w-full p-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold transition"
            >
              {copied ? (
                <>
                  <CheckCircle2 size={20} className="text-green-400" />
                  Link Copied!
                </>
              ) : (
                <>
                  <Copy size={20} />
                  Copy Link
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Referral Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
          <p className="text-gray-400 text-xs mb-1">Referrals</p>
          <p className="text-2xl font-bold text-white">0</p>
        </div>
        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
          <p className="text-gray-400 text-xs mb-1">Rewards Earned</p>
          <p className="text-2xl font-bold text-festive-red">0 pts</p>
        </div>
      </div>
    </div>
  );
}
