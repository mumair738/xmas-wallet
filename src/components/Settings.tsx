"use client";

import { useAccount } from "wagmi";
import { useState } from "react";
import { Settings as SettingsIcon, Bell, Shield, Palette, Globe } from "lucide-react";

export default function Settings() {
  const { address } = useAccount();
  const [notifications, setNotifications] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark" | "festive">("festive");
  const [language, setLanguage] = useState("en");

  if (!address) return null;

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center gap-2">
        <SettingsIcon className="text-gray-400" size={20} />
        <h2 className="text-lg font-semibold text-white">Settings</h2>
      </div>

      {/* Notifications */}
      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bell className="text-blue-400" size={20} />
            <div>
              <p className="text-white font-semibold">Notifications</p>
              <p className="text-gray-400 text-xs">Get alerts for transactions</p>
            </div>
          </div>
          <button
            onClick={() => setNotifications(!notifications)}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              notifications ? "bg-festive-red" : "bg-gray-600"
            }`}
          >
            <div
              className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                notifications ? "translate-x-6" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Security */}
      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="text-green-400" size={20} />
            <div>
              <p className="text-white font-semibold">Two-Factor Auth</p>
              <p className="text-gray-400 text-xs">Extra security layer</p>
            </div>
          </div>
          <button
            onClick={() => setTwoFactor(!twoFactor)}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              twoFactor ? "bg-green-500" : "bg-gray-600"
            }`}
          >
            <div
              className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                twoFactor ? "translate-x-6" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Theme */}
      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
        <div className="flex items-center gap-3 mb-3">
          <Palette className="text-purple-400" size={20} />
          <div>
            <p className="text-white font-semibold">Theme</p>
            <p className="text-gray-400 text-xs">Choose your style</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {["light", "dark", "festive"].map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t as typeof theme)}
              className={`px-3 py-2 rounded-lg text-xs font-semibold capitalize transition ${
                theme === t
                  ? "bg-festive-red text-white"
                  : "bg-white/5 text-gray-400 hover:bg-white/10"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Language */}
      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
        <div className="flex items-center gap-3 mb-3">
          <Globe className="text-cyan-400" size={20} />
          <div>
            <p className="text-white font-semibold">Language</p>
            <p className="text-gray-400 text-xs">Select your language</p>
          </div>
        </div>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-festive-red transition"
        >
          <option value="en" className="bg-gray-900">English</option>
          <option value="es" className="bg-gray-900">Español</option>
          <option value="fr" className="bg-gray-900">Français</option>
          <option value="de" className="bg-gray-900">Deutsch</option>
          <option value="ja" className="bg-gray-900">日本語</option>
        </select>
      </div>

      {/* App Info */}
      <div className="bg-gradient-to-r from-festive-red/20 to-pink-500/20 rounded-lg p-4 border border-festive-red/30">
        <div className="text-center space-y-2">
          <p className="text-white font-bold">Xmas Wallet v1.0.0</p>
          <p className="text-gray-300 text-xs">Built on Base Network</p>
          <p className="text-gray-400 text-xs">Powered by Reown & WalletConnect</p>
        </div>
      </div>
    </div>
  );
}
