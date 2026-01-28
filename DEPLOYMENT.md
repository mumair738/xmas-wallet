# 🚀 Deployment Guide - Xmas Wallet

This guide covers deploying Xmas Wallet to various platforms.

---

## 📋 Pre-Deployment Checklist

Before deploying, ensure:

- ✅ All dependencies are installed
- ✅ Build completes without errors (`npm run build`)
- ✅ Environment variables are configured
- ✅ Reown/WalletConnect project ID is valid
- ✅ All images are optimized
- ✅ Test on multiple browsers
- ✅ Mobile responsiveness verified

---

## 🎯 Vercel Deployment (Recommended)

### Method 1: One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/mumair738/xmas-wallet)

### Method 2: Manual Deployment

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Set Environment Variables**
   ```bash
   vercel env add NEXT_PUBLIC_PROJECT_ID
   ```

5. **Deploy to Production**
   ```bash
   vercel --prod
   ```

### Method 3: GitHub Integration

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your repository
5. Add environment variable: `NEXT_PUBLIC_PROJECT_ID`
6. Click "Deploy"

### Vercel Configuration

The project includes `vercel.json` (optional):

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"]
}
```

---

## 🌐 Netlify Deployment

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build the project**
   ```bash
   npm run build
   ```

3. **Deploy**
   ```bash
   netlify deploy --prod
   ```

4. **Configure Environment Variables**
   - Go to Site settings → Environment variables
   - Add `NEXT_PUBLIC_PROJECT_ID`

### netlify.toml Configuration

Create `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[build.environment]
  NODE_VERSION = "18"
```

---

## 🐳 Docker Deployment

### Dockerfile

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

### Build and Run

```bash
# Build
docker build -t xmas-wallet .

# Run
docker run -p 3000:3000 -e NEXT_PUBLIC_PROJECT_ID=your_id xmas-wallet
```

### Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_PROJECT_ID=${NEXT_PUBLIC_PROJECT_ID}
    restart: unless-stopped
```

Run with:
```bash
docker-compose up -d
```

---

## ☁️ AWS Deployment

### AWS Amplify

1. Go to AWS Amplify Console
2. Connect your repository
3. Configure build settings:
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm ci
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```
4. Add environment variable
5. Deploy

### AWS EC2

1. **Launch EC2 instance** (Ubuntu 22.04)
2. **Install Node.js**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```
3. **Clone and setup**
   ```bash
   git clone https://github.com/mumair738/xmas-wallet.git
   cd xmas-wallet
   npm install
   npm run build
   ```
4. **Use PM2 for process management**
   ```bash
   sudo npm install -g pm2
   pm2 start npm --name "xmas-wallet" -- start
   pm2 startup
   pm2 save
   ```
5. **Setup Nginx reverse proxy**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

---

## 🔒 Environment Variables

### Required Variables

```env
NEXT_PUBLIC_PROJECT_ID=your_reown_project_id
```

### Optional Variables (for production)

```env
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

### Setting Variables by Platform

**Vercel:**
```bash
vercel env add NEXT_PUBLIC_PROJECT_ID production
```

**Netlify:**
```bash
netlify env:set NEXT_PUBLIC_PROJECT_ID your_id
```

**Docker:**
```bash
docker run -e NEXT_PUBLIC_PROJECT_ID=your_id xmas-wallet
```

---

## 🔍 Post-Deployment Verification

After deployment, verify:

1. **Homepage loads** - Check main UI
2. **Wallet connection works** - Test with MetaMask
3. **All tabs render** - Navigate through features
4. **Images load** - Verify all assets
5. **Transactions work** - Test sending/swapping
6. **Mobile responsive** - Check on phone
7. **Console clean** - No errors in browser console

### Health Check Endpoints

Access these URLs:

- Homepage: `https://your-domain.com`
- Wallet Icon: `https://your-domain.com/wallet-icon.jpg`
- Farcaster Manifest: `https://your-domain.com/farcaster.json`

---

## 📊 Performance Optimization

### Before Deployment

1. **Optimize Images**
   ```bash
   # Install Sharp for Next.js image optimization
   npm install sharp
   ```

2. **Enable Compression**
   - Vercel enables this automatically
   - For custom servers, enable gzip/brotli

3. **Minify Assets**
   ```bash
   npm run build
   # Next.js handles minification automatically
   ```

4. **Bundle Analysis**
   ```bash
   npm install @next/bundle-analyzer
   ANALYZE=true npm run build
   ```

---

## 🔐 Security Checklist

- ✅ HTTPS enabled (automatic on Vercel/Netlify)
- ✅ Environment variables secured
- ✅ No private keys in code
- ✅ CORS configured properly
- ✅ Rate limiting (if using custom API)
- ✅ Security headers configured
- ✅ Dependencies updated

### Security Headers (next.config.ts)

```typescript
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
];
```

---

## 🌍 Custom Domain Setup

### Vercel

1. Go to Project Settings → Domains
2. Add your domain
3. Configure DNS:
   - Type: A
   - Name: @
   - Value: 76.76.21.21

### Netlify

1. Go to Domain Settings
2. Add custom domain
3. Follow DNS configuration instructions

---

## 📈 Monitoring & Analytics

### Vercel Analytics

Automatically enabled. View in dashboard.

### Google Analytics (Optional)

Add to `layout.tsx`:

```typescript
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
      <GoogleAnalytics gaId="G-XXXXXXXXXX" />
    </html>
  )
}
```

---

## 🔄 Continuous Deployment

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run test # if you have tests
```

---

## 🐛 Troubleshooting

### Build Fails

- Check Node.js version (18+)
- Verify all dependencies installed
- Check for TypeScript errors

### Environment Variables Not Working

- Ensure `NEXT_PUBLIC_` prefix
- Restart dev server after changes
- Check platform-specific syntax

### Images Not Loading

- Verify images in `/public` folder
- Check file paths are correct
- Enable Next.js image optimization

---

## 📞 Support

For deployment issues:
- Check [Next.js docs](https://nextjs.org/docs/deployment)
- Review [Vercel docs](https://vercel.com/docs)
- Open an issue on GitHub

---

**Happy Deploying! 🚀**

**Last Updated:** December 2024  
**Maintained by:** @mumair738
