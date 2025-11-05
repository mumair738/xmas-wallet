"use client";

import React, { useState, useEffect } from "react";

export default function XmasWalletApp() {
  const [ready, setReady] = useState(false);
  const [statusMsg, setStatusMsg] = useState("Idle");
  const [walletName, setWalletName] = useState(null);

  // Run only on client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      setReady(true);
    }
  }, []);

  const connectWallet = async () => {
    try {
      setStatusMsg("Initializing wallet...");
      // Dynamically import browser-only SDKs
      const [{ default: WalletConnectClient }, { createAppKit }] = await Promise.all([
        import("@walletconnect/client"),
        import("@reown/appkit"),
      ]);
      const { base } = await import("viem/chains");

      const appKit = createAppKit({
        appName: "Xmas Wallet",
        chains: [base],
        projectId: "7e98fa9b8b69bf3625843b3394754245",
        walletConnect: { projectId: "b4d7728a-09b0-4a41-b5f1-44f1ee5142f5" },
      });

      const wcClient = new WalletConnectClient({
        projectId: "b4d7728a-09b0-4a41-b5f1-44f1ee5142f5",
        metadata: {
          name: "Xmas Wallet",
          description: "Farcaster mini app for Base network using Reown + WalletConnect",
          url: "https://xmas-wallet.vercel.app",
          icons: ["https://i.ibb.co/gmDqvkh/xmas-wallet-icon.png"],
        },
      });

      await appKit.open();
      const pairing = await wcClient.connect({
        requiredNamespaces: {
          eip155: {
            methods: ["eth_sendTransaction", "personal_sign", "eth_signTypedData"],
            chains: ["eip155:84531"],
            events: ["accountsChanged", "chainChanged"],
          },
        },
      });

      setWalletName(pairing.peer.metadata.name);
      setStatusMsg("Connected successfully 🎉");
    } catch (err) {
      console.error(err);
      setStatusMsg("Connection failed ❌");
    }
  };

  if (!ready)
    return (
      <main className="min-h-screen flex items-center justify-center bg-green-50">
        <p>Loading Xmas Wallet...</p>
      </main>
    );

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-green-50 p-10">
      <h1 className="text-3xl font-bold text-green-700 mb-6">🎄 Xmas Wallet</h1>
      <button
        onClick={connectWallet}
        className="px-5 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 shadow-md"
      >
        Connect Wallet
      </button>
      <p className="mt-4 text-gray-600">{statusMsg}</p>
      {walletName && <p className="mt-2 text-sm text-green-700">Connected: {walletName}</p>}
    </main>
  );
}