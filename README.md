# Xmas Wallet — A Festive Farcaster Mini App for Base

💡 Project Description

Xmas Wallet is a Farcaster Mini App built on the Base network, enabling users to connect any EVM-compatible wallet through Reown AppKit (for native Base connectivity) and WalletConnect (for universal multi-wallet access).

It provides a smooth, secure, and festive experience for Farcaster users to manage wallets, explore on-chain interactions, and celebrate the season with Base.

Built with Next.js + TailwindCSS, the app is fully open-source and deployed live on Vercel.

🔧 Technical Overview

Framework: Next.js + React

Styling: TailwindCSS

Network: Base

Wallet SDKs:

@reown/appkit for Base-native integration

@walletconnect/client for multi-wallet support

Deployment: Vercel

Repository: https://github.com/mumair738/xmas-wallet

Live Demo: https://xmas-wallet.vercel.app/

🧩 Key Features

Dual SDK wallet connectivity (Reown + WalletConnect)

Clean UI and festive branding (🎄)

Farcaster Mini App manifest for Base integration

Ready for contract or token extensions

Verified open-source code with documentation

🎁 Vision & Future Roadmap

Add Base holiday airdrop or NFT reward system

Integrate user rank tracking via on-chain data

Add wallet avatars & seasonal themes

Expand to allow direct Base token transfers

👨‍💻 Developer

Muhammad Umair (@mumair738)
Building open, fun, and educational apps for the Base & Farcaster ecosystem.

## Quickstart
1. Clone or copy this template into a Next.js project (e.g., `app/page.jsx` or `pages/index.jsx`).
2. Install dependencies:

```bash
npm install @reown/appkit @walletconnect/client viem wagmi ethers next react react-dom tailwindcss
```

3. Update config at top of the template:
- `YOUR_REOWN_PROJECT_ID` — your Reown / Base project id (already set in template)
- `YOUR_WALLETCONNECT_PROJECT_ID` — your WalletConnect project id (already set)
- `APP_URL` — update to your deployment URL (Vercel recommended)
- `APP_ICON` — change to your hosted icon image

4. Run locally:

```bash
npm run dev
# open http://localhost:3000
```

5. Deploy to Vercel (recommended):
- Create a new Vercel project connected to your GitHub repo
- Set any necessary environment variables (none required for IDs embedded in template, but recommended to use env vars instead of in-file values)
- Deploy and copy deployed URL

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
    "ownerAddress": "0x064eDF609a89049Ddd3A59341F2F39D82eae1840"
  },
  "accountAssociation": {
    "header": "eyJmaWQiOjIzNjY2OSwidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweDY3MTQ2YzBDYmE4ODEwQ0U5OGFFMjE4MGU0RmExRWNBMjAxYzhGNTYifQ",
    "payload": "eyJkb21haW4iOiJ4bWFzLXdhbGxldC52ZXJjZWwuYXBwIn0",
    "signature": "kUdpD23zI/f6i9lrXZRJyDNDQVVJX/vZ34kRVpFJBN1w3blj5dVzxbwgVo17klxFJMsB6XuW5Ur9cKbBbUnNBRw="
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

## Troubleshooting
- If Reown modal doesn't open, ensure the `projectId` is correct and that the app URL is listed in Reown redirect/allowed origins.
- For WalletConnect issues, confirm your WalletConnect project is active and check console for pairing URIs.
