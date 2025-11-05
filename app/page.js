import React, { useState, useEffect } from "react";
import WalletConnectClient from "@walletconnect/client";
import { createAppKit } from "@reown/appkit";
import { base } from "viem/chains";

// ---- CONFIG: your IDs ----
const YOUR_REOWN_PROJECT_ID = "7e98fa9b8b69bf3625843b3394754245";
const YOUR_WALLETCONNECT_PROJECT_ID = "b4d7728a-09b0-4a41-b5f1-44f1ee5142f5";
const APP_URL = "https://xmas-wallet.vercel.app"; // updated with cleaner URL
const APP_ICON = "https://i.ibb.co/gmDqvkh/xmas-wallet-icon.png"; // festive gift icon
// --------------------------------------------------

const appKit = createAppKit({
  appName: "Xmas Wallet",
  chains: [base],
  projectId: YOUR_REOWN_PROJECT_ID,
  walletConnect: { projectId: YOUR_WALLETCONNECT_PROJECT_ID },
});

const wcClient = new WalletConnectClient({
  projectId: YOUR_WALLETCONNECT_PROJECT_ID,
  metadata: {
    name: "Xmas Wallet",
    description: "Farcaster mini app for Base network using Reown + WalletConnect",
    url: APP_URL,
    icons: [APP_ICON],
  },
});

export default function XmasWalletApp() {
  const [connected, setConnected] = useState(false);
  const [walletName, setWalletName] = useState(null);
  const [session, setSession] = useState(null);
  const [statusMsg, setStatusMsg] = useState("Idle");

  useEffect(() => {
    if (wcClient) {
      wcClient.on?.("session_update", (args) => console.log("wc session update", args));
      wcClient.on?.("session_delete", () => {
        setConnected(false);
        setSession(null);
        setWalletName(null);
        setStatusMsg("Disconnected");
      });
    }

    return () => {
      try {
        wcClient?.off?.("session_update");
        wcClient?.off?.("session_delete");
      } catch (e) {}
    };
  }, []);

  const connectBoth = async () => {
    setStatusMsg("Opening Reown AppKit...");
    try {
      await appKit.open();
      setStatusMsg("Reown opened — now attempting WalletConnect fallback...");
    } catch (err) {
      console.warn("Reown open failed or closed:", err?.message || err);
    }

    try {
      if (!wcClient) throw new Error("WalletConnect client not initialized");
      const pairing = await wcClient.connect({
        requiredNamespaces: {
          eip155: {
            methods: ["eth_sendTransaction", "personal_sign", "eth_signTypedData"],
            chains: ["eip155:84531"],
            events: ["accountsChanged", "chainChanged"],
          },
        },
      });

      setSession(pairing);
      setConnected(true);
      setWalletName(pairing.peer?.metadata?.name || "WalletConnect Wallet");
      setStatusMsg("Connected — session established");
    } catch (err) {
      console.error("WalletConnect connect failed:", err);
      setStatusMsg("WalletConnect connect failed — check console");
    }
  };

  const disconnect = async () => {
    setStatusMsg("Disconnecting...");
    try {
      if (session && wcClient) await wcClient.disconnect({ topic: session.topic });
    } catch (e) {
      console.warn("disconnect error", e);
    }
    setConnected(false);
    setSession(null);
    setWalletName(null);
    setStatusMsg("Disconnected");
  };

  const renderStatus = () => {
    if (connected) {
      return (
        <div className="mt-4 p-3 rounded-lg border border-green-200 bg-green-50">
          <p className="font-semibold">Connected: {walletName}</p>
          <p className="text-sm">Status: {statusMsg}</p>
          <button
            onClick={disconnect}
            className="mt-3 inline-block px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300"
          >
            Disconnect
          </button>
        </div>
      );
    }

    return (
      <div className="mt-4 p-3 rounded-lg border border-gray-200 bg-white">
        <p className="text-sm">Status: {statusMsg}</p>
      </div>
    );
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-red-50 to-green-50 p-8">
      <div className="max-w-xl w-full rounded-2xl shadow-xl p-8 bg-white border border-red-100">
        <header className="flex items-center gap-4">
          <img src={APP_ICON} alt="xmas" className="w-16 h-16 rounded-lg shadow" />
          <div>
            <h1 className="text-2xl font-extrabold text-green-700">🎄 Xmas Wallet</h1>
            <p className="text-sm text-gray-600">Connect any wallet on Base — Reown + WalletConnect</p>
          </div>
        </header>

        <section className="mt-6">
          <p className="text-sm text-gray-700">Use this single button to connect through Reown AppKit with WalletConnect as backup for any EVM wallet.</p>

          <div className="mt-6 flex gap-3">
            <button
              onClick={connectBoth}
              className="flex-1 px-4 py-3 rounded-2xl font-semibold shadow hover:scale-[1.01] transition-transform bg-green-600 text-white"
            >
              Connect Wallet (Reown + WalletConnect)
            </button>

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.open("https://github.com/YourUser/xmas-wallet", "_blank");
              }}
              className="px-4 py-3 rounded-2xl border border-gray-200 text-sm hover:bg-gray-50"
            >
              GitHub
            </a>
          </div>

          {renderStatus()}

          <div className="mt-6 text-xs text-gray-500">
            <p>Tips:</p>
            <ul className="list-disc ml-5 mt-2">
              <li>Deploy to Vercel using the clean URL above.</li>
              <li>Make the repo public and include README & manifest for Farcaster dev console.</li>
              <li>Verify Base contracts and link in README for Base Builder Rewards.</li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}