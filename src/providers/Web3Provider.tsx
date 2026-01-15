"use client";

import React, { ReactNode } from "react";
import { createAppKit } from "@reown/appkit/react";
import { WagmiProvider } from "wagmi";
import { base } from "@reown/appkit/networks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";

// 1. Get projectId at https://cloud.reown.com
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || "b5681c42340f1754050212004273f150"; // Placeholder

if (!projectId) {
  throw new Error("Project ID is not defined");
}

// 2. Create a metadata object
const metadata = {
  name: "Xmas Wallet",
  description: "Festive Wallet for Base",
  url: "https://xmas-wallet.vercel.app", // origin must match your domain & subdomain
  icons: ["https://i.ibb.co/gmDqvkh/xmas-wallet-icon.png"],
};

// 3. Create the Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks: [base],
});

// 4. Create modal
createAppKit({
  adapters: [wagmiAdapter],
  networks: [base],
  metadata,
  projectId,
  features: {
    analytics: true,
  },
});

const queryClient = new QueryClient();

export default function Web3Provider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
