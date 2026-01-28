# 🎄 Xmas Wallet — Complete Web3 Ecosystem on Base

A comprehensive, production-ready Web3 wallet application built on Base blockchain featuring advanced DeFi functionality, NFT management, real-time analytics, and festive user experience.

## 🌟 Project Overview

Xmas Wallet is a feature-rich Farcaster Mini App that provides a complete blockchain ecosystem experience. Built with modern web technologies and connected to Base network, it offers everything from basic wallet operations to advanced DeFi features like staking, token swaps, and NFT galleries.

### Built With

- **Framework:** Next.js 16 + React 19.2
- **Styling:** Tailwind CSS 4
- **Blockchain:** Base Network (Ethereum L2)
- **Web3:** Wagmi v2 + Viem
- **Wallet Connection:** Reown AppKit + WalletConnect
- **Deployment:** Vercel

[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwindcss&logoColor=white&style=flat-square)](https://tailwindcss.com/)
[![OnchainKit](https://img.shields.io/badge/Coinbase-OnchainKit-0000FF?logo=coinbase&logoColor=white&style=flat-square)](https://onchainkit.xyz)
[![Coinbase CDP](https://img.shields.io/badge/Coinbase-CDP-000?logo=coinbase&logoColor=white&style=flat-square)](https://docs.cdp.coinbase.com/)
[![Farcaster MiniApp](https://img.shields.io/badge/Farcaster-MiniApp-6f3aff?style=flat-square)](https://www.farcaster.xyz/)
[![Base Network](https://img.shields.io/badge/Base-Mainnet-0052FF?logo=coinbase&logoColor=white&style=flat-square)](https://www.base.org/)

## 🛠️ Technology Stack

### Frontend
- **Next.js 16** - Latest React framework with App Router
- **React 19.2** - Latest React with new features
- **TypeScript 5** - Type-safe development
- **Tailwind CSS 4** - Modern utility-first styling

### Blockchain & Web3
- **Wagmi v2.19** - React Hooks for Ethereum
- **Viem v2.38** - TypeScript Ethereum library
- **Reown AppKit v1.8** - Base-native wallet integration
- **Ethers.js v6** - Ethereum interactions

### UI & Animation
- **Lucide React** - Beautiful icon library
- **Canvas Confetti** - Celebration animations
- **React Confetti Explosion** - Dynamic effects
- **Custom Snowfall** - Festive UI elements

### Development
- **ESLint 9** - Code quality
- **PostCSS** - CSS transformations
- **@tanstack/react-query** - Data fetching & caching

## 🏗️ Project Structure

```
xmas-wallet/
├── public/
│   ├── hero-bg.jpg              # Main background image
│   ├── wallet-icon.jpg          # Wallet icon
│   ├── base-logo.jpg            # Base network logo
│   ├── rewards-badge.jpg        # Achievement badges
│   └── farcaster.json           # Farcaster manifest
├── src/
│   ├── app/
│   │   ├── page.tsx             # Main application page
│   │   ├── layout.tsx           # Root layout with providers
│   │   ├── globals.css          # Global styles & themes
│   │   └── favicon.ico          # App icon
│   ├── components/
│   │   ├── BaseNetworkStats.tsx # Network statistics
│   │   ├── FestiveRewards.tsx   # Reward system
│   │   ├── GasTracker.tsx       # Gas price monitor
│   │   ├── NFTGallery.tsx       # NFT collection viewer
│   │   ├── PortfolioDashboard.tsx # Asset overview
│   │   ├── PriceTracker.tsx     # Live price feeds
│   │   ├── Snowfall.tsx         # Festive animations
│   │   ├── SocialShare.tsx      # Social sharing
│   │   ├── Staking.tsx          # Staking interface
│   │   ├── TokenSwap.tsx        # Token exchange
│   │   ├── TransactionHistory.tsx # Tx history
│   │   ├── TransactionMotivation.tsx # Success messages
│   │   └── WalletAnalytics.tsx  # Wallet insights
│   └── providers/
│       └── Web3Provider.tsx     # Web3 setup & config
└── package.json
```

## 🌐 Live Demo

**Live App:** https://xmas-wallet.vercel.app/
**Repository:** https://github.com/mumair738/xmas-wallet

## ✨ Features

### Core Wallet Features
- 🔐 **Multi-Wallet Support:** Connect via Reown AppKit & WalletConnect
- 💼 **Portfolio Dashboard:** Track all your assets in one place
- 📊 **Real-time Analytics:** Monitor wallet performance with detailed metrics
- 📈 **Live Price Tracking:** Get real-time prices for ETH, BASE, USDC, DAI
- ⛽ **Gas Tracker:** Monitor Base network gas prices (Slow, Standard, Fast, Instant)

### DeFi Features
- 🔄 **Token Swap:** Instant token swaps with live exchange rates
- 💎 **Staking Pools:** Earn rewards by staking tokens with flexible APY options
- 🎁 **Festive Rewards:** Gamified reward system with points and tiers
- 💸 **Send Gifts:** Send ETH to friends with festive animations

### NFT & Social
- 🖼️ **NFT Gallery:** View and manage your NFT collection
- 📱 **Social Sharing:** Share your achievements on Twitter
- 🏆 **Achievement System:** Earn badges and climb reward tiers
- 📜 **Transaction History:** Complete history of all your transactions

### Network Features
- 🌐 **Base Network Stats:** Real-time blockchain statistics
- ⚡ **Live Activity Tracking:** Monitor daily transactions and active users
- 💰 **Network Health Dashboard:** Check Base network performance
- 🎨 **Beautiful UI:** Festive design with snowfall effects and smooth animations

👨‍💻 Developer

Muhammad Umair (@mumair738)
Building open, fun, and educational apps for the Base & Farcaster ecosystem.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- A Reown/WalletConnect project ID
- MetaMask or compatible Web3 wallet

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/mumair738/xmas-wallet.git
cd xmas-wallet
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_PROJECT_ID=your_reown_project_id_here
```

Get your project ID from [Reown Cloud](https://cloud.reown.com)

4. **Run the development server**

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Build for production**

```bash
npm run build
npm start
```

### Deploy to Vercel

The easiest way to deploy Xmas Wallet:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/mumair738/xmas-wallet)

Or manually:
1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variable: `NEXT_PUBLIC_PROJECT_ID`
4. Deploy

## Farcaster manifest
Add the following `public/farcaster.json` to your repo (example below); then submit your mini app on Farcaster's developer console.

```json
{
  "name": "Xmas Wallet",
  "description": "Celebrate on Base! A multi-wallet Farcaster mini app using Reown + WalletConnect",
  "url": "https://xmas-wallet.vercel.app",
  "icon": "https://i.ibb.co/gmDqvkh/xmas-wallet-icon.png",
  "developer": "@mumair738",
  "permissions": ["wallet_connect", "user_profile"],
  "version": "1.0.0",
  "baseBuilder": {
    "ownerAddress": "0x0"
  },
  "accountAssociation": {
    "header": "",
    "payload": "",
    "signature": ""
  }
}
```

## Security & Best Practices
- **Do not commit secret keys**. Use environment variables for sensitive values (e.g., `REOWN_PROJECT_ID` and `WALLETCONNECT_PROJECT_ID`) in production.
- Verify contracts on Base if you deploy any smart contracts — add addresses and verification links in README.
- Use HTTPS and secure origins for OAuth/connect flows.

## Base Builder Rewards / Verification Tips
1. Make your GitHub repo **public** and add a clear README + manifest (we've included both).
2. Deploy to a public URL and include that URL in Farcaster developer console when submitting the mini app.
3. Show integration evidence in README (screenshots, short GIFs) and include `package.json` showing `@reown/appkit` and `@walletconnect/client` dependencies.
4. If you deploy a contract on Base, link the contract and provide verification details.
5. Engage with the Base community and open-source your project — contributions and activity boost your score.

## 🎯 Usage Guide

### Connecting Your Wallet
1. Click "Connect Wallet" button
2. Select your preferred wallet (MetaMask, Coinbase, etc.)
3. Approve the connection
4. Start exploring features!

### Exploring Features
- **Overview**: View your balance and account info
- **Analytics**: Track your portfolio performance
- **Portfolio**: See all your tokens and allocations
- **NFTs**: Browse your NFT collection
- **Swap**: Exchange tokens instantly
- **Staking**: Earn rewards by staking
- **Rewards**: Check your achievement progress
- **Prices**: Monitor live token prices
- **Gas**: Track current gas fees
- **Base**: View network statistics
- **Share**: Invite friends and earn
- **Settings**: Customize your experience

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### How to Contribute
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 Documentation

- **[Features Documentation](FEATURES.md)** - Complete feature specifications
- **[API Reference](API.md)** - Component and utility API guide
- **[Contributing Guide](CONTRIBUTING.md)** - How to contribute
- **[Changelog](CHANGELOG.md)** - Version history

## 🐛 Troubleshooting

### Common Issues

**Wallet won't connect:**
- Ensure your project ID is correct
- Check that your wallet extension is installed
- Try clearing browser cache

**Transaction fails:**
- Check you have enough ETH for gas
- Verify the recipient address
- Ensure you're on Base network

**UI not loading:**
- Clear browser cache
- Check console for errors
- Verify all dependencies are installed

**Images not showing:**
- Check public folder permissions
- Verify image paths are correct
- Ensure build completed successfully

For more help, [open an issue](https://github.com/mumair738/xmas-wallet/issues).

## 📊 Project Stats

- **13** Major feature sections
- **50+** Individual features
- **15** React components
- **7** High-quality generated images
- **20+** Utility functions
- **100%** TypeScript coverage

## 🛣️ Roadmap

### Version 1.1 (Q1 2025)
- [ ] Multi-chain support (Ethereum, Polygon, Optimism)
- [ ] Advanced portfolio analytics
- [ ] Transaction export (CSV/PDF)
- [ ] Custom token import
- [ ] Address book

### Version 1.2 (Q2 2025)
- [ ] DeFi yield farming
- [ ] Lending/borrowing integration
- [ ] NFT minting interface
- [ ] Enhanced charts and graphs
- [ ] Mobile app (iOS/Android)

### Version 2.0 (Q3 2025)
- [ ] DAO governance
- [ ] Cross-chain bridge
- [ ] Hardware wallet support
- [ ] AI-powered insights
- [ ] Social trading features

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Base Team** - For the amazing L2 network
- **Reown/WalletConnect** - For wallet connectivity
- **Wagmi Team** - For excellent React hooks
- **Next.js Team** - For the incredible framework
- **Community** - For feedback and support

## 🌟 Star History

If you find this project useful, please consider giving it a star! ⭐

## 📧 Contact

- **Developer:** Muhammad Umair
- **GitHub:** [@mumair738](https://github.com/mumair738)
- **Project:** [Xmas Wallet](https://github.com/mumair738/xmas-wallet)
- **Website:** [xmas-wallet.vercel.app](https://xmas-wallet.vercel.app)

## 💖 Support

If you like this project, consider:
- Giving it a ⭐ on GitHub
- Sharing it with the community
- Contributing code or documentation
- Reporting bugs and suggesting features

---

**Built with ❤️ for the Base ecosystem**  
**Powered by Next.js, React, and Tailwind CSS**  
**Licensed under MIT**

🎄 **Merry Crypto Christmas!** 🎄
