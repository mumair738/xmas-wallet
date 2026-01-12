"use client";

import { useState, useEffect } from "reac";

export default function XmasWalletApp() {
  const [ready, setReady] = useState(false);
  const [statusMsg, setStatusMsg] = useState("Idle");
  const [walletName, setWalletName] = useState<string | null>(null);

  const WC_PROJECT_ID = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!;

  useEffect(() => {
    setReady(typeof window !== "undefined");
  }, []);

  const connectWallet = async () => {
    try {
      setStatusMsg("Initializing wallet...");

      // Dynamic imports in parallel
      const [{ SignClient }, { createAppKit }, { base }] = await Promise.all([
        import("@walletconnect/sign-client"),
        import("@reown/appkit"),
        import("viem/chains")
      ]);

      // Initialize Reown AppKit
      const appKit = createAppKit({
        appName: "Xmas Wallet",
        chains: [base],
        projectId: WC_PROJECT_ID,
      });

      // Init WalletConnect SignClient
      const wcClient = await SignClient.init({
        projectId: WC_PROJECT_ID,
        metadata: {
          name: "Xmas Wallet",
          description: "Farcaster mini app using Reown + WalletConnect on Base",
          url: process.env.NEXT_PUBLIC_APP_URL!,
          icons: ["https://i.ibb.co/gmDqvkh/xmas-wallet-icon.png"],
        },
      });

      // Open wallet selector (AppKit modal)
      await appKit.open();

      setStatusMsg("Waiting for wallet approval...");

      // Connect Wallet — FIXED SYNTAX
      const session = await wcClient.connect({
        requiredNamespaces: {
          eip155: {
            methods: ["eth_sendTransaction", "personal_sign"],
            chains: ["eip155:8453"], // Base mainnet
            events: ["chainChanged", "accountsChanged"],
          },
        },
      });

      const account = session?.namespaces?.eip155?.accounts?.[0] ?? null;

      setWalletName(account);
      setStatusMsg("Wallet connected!");
    } catch (err) {
      console.error(err);
      setStatusMsg("Failed to connect wallet");
    }
  };

  if (!ready) return null;

  return (
    <div>
      <h1>Xmas Wallet</h1>
      <p>Status: {statusMsg}</p>
      {walletName && <p>Connected: {walletName}</p>}
      <button onClick={connectWallet}>Connect Wallet</button>
    </div>
  );
}
