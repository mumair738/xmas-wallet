"use client";

import { useState, useEffect } from "react";

export default function XmasWalletApp() {
  const [ready, setReady] = useState(false);
  const [statusMsg, setStatusMsg] = useState("Idle");
  const [walletName, setWalletName] = useState<string | null>(null);

  const WC_PROJECT_ID = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!;

  useEffect(() => setReady(typeof window !== "undefined"), []);

  const connectWallet = async () => {
    try {
      setStatusMsg("Initializing wallet...");

      const [{ SignClient }, { createAppKit }, { base }] = await Promise.all([
        import("@walletconnect/sign-client"),
        import("@reown/appkit"),
        import("viem/chains"),
      ]);

      const appKit = createAppKit({
        appName: "Xmas Wallet",
        chains: [base],
        projectId: WC_PROJECT_ID,
      });

      const wcClient = await SignClient.init({
        projectId: WC_PROJECT_ID,
        metadata: {
          name: "Xmas Wallet",
          description: "Farcaster mini app using Reown + WalletConnect on Base",
          url: process.env.NEXT_PUBLIC_APP_URL!,
          icons: ["https://i.ibb.co/gmDqvkh/xmas-wallet-icon.png"],
        },
      });

      await appKit.open();

      const session = await wcClient.connect({
        requiredNamespaces: {
          eip155: {
            methods: ["eth_sendTransaction", "personal_sign]()
