# 🎄 Xmas Wallet - API & Integration Guide

This document provides comprehensive information about the Xmas Wallet architecture, components, utilities, and integration patterns.

---

## 📚 Table of Contents

1. [Core Architecture](#core-architecture)
2. [Web3 Provider](#web3-provider)
3. [Components API](#components-api)
4. [Utility Functions](#utility-functions)
5. [Hooks & State Management](#hooks--state-management)
6. [Integration Patterns](#integration-patterns)

---

## 🏗️ Core Architecture

### Project Structure

```
xmas-wallet/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Main application
│   │   ├── layout.tsx        # Root layout with providers
│   │   ├── globals.css       # Global styles
│   │   └── favicon.ico
│   ├── components/           # Reusable components
│   ├── lib/
│   │   └── utils.ts         # Utility functions
│   └── providers/
│       └── Web3Provider.tsx # Web3 configuration
└── public/                  # Static assets
```

### Technology Stack

- **Framework:** Next.js 16 (App Router)
- **React:** 19.2
- **Web3:** Wagmi v2.19 + Viem v2.38
- **Styling:** Tailwind CSS 4
- **State:** React Query (@tanstack/react-query)

---

## 🔌 Web3 Provider

### Configuration

Located in `/src/providers/Web3Provider.tsx`

```typescript
import { createAppKit } from "@reown/appkit/react";
import { WagmiProvider } from "wagmi";
import { base } from "@reown/appkit/networks";

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

const metadata = {
  name: "Xmas Wallet",
  description: "Festive Wallet for Base",
  url: "https://xmas-wallet.vercel.app",
  icons: ["https://i.ibb.co/gmDqvkh/xmas-wallet-icon.png"],
};

const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks: [base],
});

createAppKit({
  adapters: [wagmiAdapter],
  networks: [base],
  metadata,
  projectId,
  features: {
    analytics: true,
  },
});
```

### Usage

Wrap your app with the Web3Provider:

```tsx
import Web3Provider from "@/providers/Web3Provider";

export default function RootLayout({ children }) {
  return (
    <Web3Provider>
      {children}
    </Web3Provider>
  );
}
```

---

## 🧩 Components API

### BaseNetworkStats

Displays real-time Base network statistics.

**Location:** `/src/components/BaseNetworkStats.tsx`

**Props:** None

**Features:**
- Daily transaction count
- Active users
- Average gas price
- Network health percentage

**Usage:**
```tsx
import BaseNetworkStats from "@/components/BaseNetworkStats";

<BaseNetworkStats />
```

---

### FestiveRewards

Gamified reward system with points and tiers.

**Location:** `/src/components/FestiveRewards.tsx`

**Props:** None

**Features:**
- Points tracking
- Tier progression
- Reward claiming
- Achievement display

**Usage:**
```tsx
import FestiveRewards from "@/components/FestiveRewards";

<FestiveRewards />
```

---

### GasTracker

Real-time gas price monitoring with multiple speed tiers.

**Location:** `/src/components/GasTracker.tsx`

**Props:** None

**Features:**
- Slow/Standard/Fast/Instant speeds
- Time estimates
- Auto-refresh (15s)

**Usage:**
```tsx
import GasTracker from "@/components/GasTracker";

<GasTracker />
```

---

### NFTGallery

NFT collection viewer with likes and details.

**Location:** `/src/components/NFTGallery.tsx`

**Props:** None

**Features:**
- Grid layout
- Detail modal
- Like system
- BaseScan links

**Usage:**
```tsx
import NFTGallery from "@/components/NFTGallery";

<NFTGallery />
```

---

### PortfolioDashboard

Asset overview with balances and allocations.

**Location:** `/src/components/PortfolioDashboard.tsx`

**Props:** None

**Features:**
- Multi-token display
- USD conversions
- Asset percentages

**Usage:**
```tsx
import PortfolioDashboard from "@/components/PortfolioDashboard";

<PortfolioDashboard />
```

---

### PriceTracker

Live cryptocurrency price feeds.

**Location:** `/src/components/PriceTracker.tsx`

**Props:** None

**Features:**
- Real-time prices
- 24h changes
- Volume/Market cap
- Auto-refresh (30s)

**Usage:**
```tsx
import PriceTracker from "@/components/PriceTracker";

<PriceTracker />
```

---

### Settings

User preferences and app configuration.

**Location:** `/src/components/Settings.tsx`

**Props:** None

**Features:**
- Theme selection
- Notifications
- Language
- Security settings

**Usage:**
```tsx
import Settings from "@/components/Settings";

<Settings />
```

---

### Snowfall

Festive snow animation overlay.

**Location:** `/src/components/Snowfall.tsx`

**Props:** None

**Usage:**
```tsx
import Snowfall from "@/components/Snowfall";

<Snowfall />
```

---

### SocialShare

Social media sharing and referral tracking.

**Location:** `/src/components/SocialShare.tsx`

**Props:** None

**Features:**
- Twitter integration
- Link copying
- Referral stats

**Usage:**
```tsx
import SocialShare from "@/components/SocialShare";

<SocialShare />
```

---

### Staking

Token staking interface with multiple pools.

**Location:** `/src/components/Staking.tsx`

**Props:** None

**Features:**
- Multiple APY options
- Lock period selection
- Reward calculation
- Stake/unstake

**Usage:**
```tsx
import Staking from "@/components/Staking";

<Staking />
```

---

### TokenSwap

Token exchange interface.

**Location:** `/src/components/TokenSwap.tsx`

**Props:** None

**Features:**
- Multi-token support
- Live rates
- Swap direction toggle

**Usage:**
```tsx
import TokenSwap from "@/components/TokenSwap";

<TokenSwap />
```

---

### TransactionHistory

Transaction list with BaseScan links.

**Location:** `/src/components/TransactionHistory.tsx`

**Props:** None

**Features:**
- Chronological list
- Type indicators
- Status display

**Usage:**
```tsx
import TransactionHistory from "@/components/TransactionHistory";

<TransactionHistory />
```

---

### WalletAnalytics

Comprehensive wallet insights and metrics.

**Location:** `/src/components/WalletAnalytics.tsx`

**Props:** None

**Features:**
- Portfolio value
- 24h/7d/30d views
- Transaction stats
- Profit/loss

**Usage:**
```tsx
import WalletAnalytics from "@/components/WalletAnalytics";

<WalletAnalytics />
```

---

## 🛠️ Utility Functions

Located in `/src/lib/utils.ts`

### formatNumber

Format large numbers with K, M, B suffixes.

```typescript
formatNumber(1500) // "1.5K"
formatNumber(2500000) // "2.5M"
formatNumber(1200000000) // "1.2B"
```

### truncateAddress

Shorten Ethereum addresses.

```typescript
truncateAddress("0x1234567890abcdef1234567890abcdef12345678")
// "0x1234...5678"

truncateAddress(address, 6)
// "0x123456...345678"
```

### formatUSD

Format currency values.

```typescript
formatUSD(1234.56) // "$1,234.56"
```

### formatETH

Format ETH amounts with custom decimals.

```typescript
formatETH(0.123456, 4) // "0.1235"
```

### formatPercent

Format percentage changes.

```typescript
formatPercent(12.5) // "+12.50%"
formatPercent(-5.2) // "-5.20%"
```

### timeAgo

Convert timestamps to relative time.

```typescript
timeAgo(Date.now() - 3600000) // "1 hour ago"
timeAgo(Date.now() - 86400000) // "1 day ago"
```

### copyToClipboard

Copy text with fallback support.

```typescript
await copyToClipboard("0x1234...") // returns boolean
```

### isValidAddress

Validate Ethereum addresses.

```typescript
isValidAddress("0x1234567890abcdef1234567890abcdef12345678") // true
isValidAddress("invalid") // false
```

### getFestiveGreeting

Get contextual holiday message.

```typescript
getFestiveGreeting() // "15 days until Christmas! 🎁"
```

---

## 🎣 Hooks & State Management

### Wagmi Hooks

```typescript
import { useAccount, useBalance, useSendTransaction } from "wagmi";

// Get connected wallet
const { address, isConnected } = useAccount();

// Get balance
const { data: balance } = useBalance({ address });

// Send transaction
const { sendTransaction, isPending } = useSendTransaction();
```

### React Query

```typescript
import { useQuery } from "@tanstack/react-query";

const { data, isLoading, error } = useQuery({
  queryKey: ["key"],
  queryFn: fetchData,
  refetchInterval: 30000, // 30 seconds
});
```

---

## 🔗 Integration Patterns

### Adding a New Component

1. Create component file in `/src/components/`
2. Define TypeScript interfaces
3. Import required hooks
4. Export default function

```typescript
"use client";

import { useAccount } from "wagmi";

interface MyComponentProps {
  title: string;
}

export default function MyComponent({ title }: MyComponentProps) {
  const { address } = useAccount();

  if (!address) return null;

  return (
    <div>
      <h2>{title}</h2>
    </div>
  );
}
```

### Adding a New Tab

1. Import component in `page.tsx`
2. Add to TabType union
3. Add tab button in UI
4. Add conditional render

```typescript
// 1. Import
import NewFeature from "@/components/NewFeature";

// 2. Add type
type TabType = "overview" | "new-feature";

// 3. Add button
<button onClick={() => setActiveTab("new-feature")}>
  New Feature
</button>

// 4. Render
{activeTab === "new-feature" && <NewFeature />}
```

### Fetching Blockchain Data

```typescript
import { useAccount, useBalance } from "wagmi";
import { useEffect, useState } from "react";

export default function MyComponent() {
  const { address } = useAccount();
  const { data: balance } = useBalance({ address });
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!address) return;

    const fetchData = async () => {
      // Fetch from API or blockchain
      const result = await fetch(`/api/data/${address}`);
      setData(await result.json());
    };

    fetchData();
  }, [address]);

  return <div>{/* Render data */}</div>;
}
```

---

## 🎨 Styling Patterns

### Tailwind Classes

```tsx
// Container
<div className="w-full space-y-4">

// Card
<div className="bg-white/5 rounded-lg p-4 border border-white/10">

// Button
<button className="px-4 py-2 bg-festive-red hover:bg-red-700 text-white rounded-lg transition">

// Grid
<div className="grid grid-cols-2 gap-3">
```

### Custom Colors

```css
--festive-red: #d42426
--festive-green: #165b33
```

---

## 🔐 Environment Variables

Required in `.env.local`:

```env
NEXT_PUBLIC_PROJECT_ID=your_reown_project_id
```

---

## 📊 Performance Tips

1. Use React.memo for expensive components
2. Implement lazy loading for heavy features
3. Cache API responses with React Query
4. Optimize images with Next.js Image component
5. Use code splitting for large components

---

## 🐛 Debugging

Enable debug mode:

```typescript
console.log("[v0]", "Debug message", data);
```

---

**Documentation Version:** 1.0.0  
**Last Updated:** December 2024  
**Maintained by:** @mumair738
