# Contributing to Xmas Wallet

First off, thank you for considering contributing to Xmas Wallet! It's people like you that make Xmas Wallet such a great tool for the Base ecosystem.

## 🎄 Code of Conduct

This project and everyone participating in it is governed by respect, inclusivity, and the festive spirit. By participating, you are expected to uphold this code.

## 🚀 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples**
- **Describe the behavior you observed and what you expected**
- **Include screenshots if possible**
- **Include your environment details** (browser, OS, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear and descriptive title**
- **Provide a detailed description of the suggested enhancement**
- **Explain why this enhancement would be useful**
- **List any similar features in other applications**

### Pull Requests

1. Fork the repo and create your branch from `main`
2. If you've added code, ensure it follows our style guide
3. Ensure your code lints without errors
4. Update the documentation accordingly
5. Write a clear commit message

## 📝 Style Guide

### TypeScript Style Guide

- Use TypeScript for all new code
- Define proper types/interfaces
- Avoid using `any` type
- Use meaningful variable names
- Add JSDoc comments for complex functions

```typescript
/**
 * Calculate the APY for a staking pool
 * @param principal - Initial staking amount
 * @param apy - Annual percentage yield
 * @param period - Staking period in days
 * @returns Expected rewards
 */
function calculateRewards(principal: number, apy: number, period: number): number {
  return (principal * apy * period) / (365 * 100);
}
```

### React Component Style Guide

- Use functional components with hooks
- Extract complex logic into custom hooks
- Keep components small and focused
- Use proper prop types

```typescript
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
}

export function Button({ label, onClick, variant = "primary", disabled }: ButtonProps) {
  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={`btn btn-${variant}`}
    >
      {label}
    </button>
  );
}
```

### CSS/Tailwind Style Guide

- Use Tailwind utility classes when possible
- Follow mobile-first responsive design
- Use semantic class names for custom CSS
- Maintain consistent spacing scale

```tsx
// Good
<div className="flex items-center gap-4 p-4 bg-white/10 rounded-lg">

// Avoid
<div className="flexbox padding-16 background-light radius-8">
```

## 🏗️ Project Structure

```
xmas-wallet/
├── src/
│   ├── app/           # Next.js app directory
│   ├── components/    # React components
│   ├── lib/          # Utility functions
│   └── providers/    # Context providers
├── public/           # Static assets
└── docs/            # Documentation
```

### Component Guidelines

Each component should:
- Be placed in `/src/components/`
- Have a single responsibility
- Include TypeScript types
- Use proper error handling
- Be documented with comments

```typescript
"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

interface MyComponentProps {
  title: string;
  onAction: () => Promise<void>;
}

/**
 * MyComponent - Does something awesome
 * @param title - The title to display
 * @param onAction - Async action handler
 */
export default function MyComponent({ title, onAction }: MyComponentProps) {
  const [loading, setLoading] = useState(false);

  const handleAction = async () => {
    setLoading(true);
    try {
      await onAction();
    } catch (error) {
      console.error("Action failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="component-container">
      <h2>{title}</h2>
      <button onClick={handleAction} disabled={loading}>
        {loading ? <Loader2 className="animate-spin" /> : "Submit"}
      </button>
    </div>
  );
}
```

## 🧪 Testing

Before submitting a PR:

1. Test your changes locally
2. Check for console errors
3. Test on multiple browsers
4. Test responsive design on mobile
5. Verify wallet connection works
6. Check all interactive features

## 📦 Commit Messages

Follow conventional commits:

- `feat: Add staking pool APY calculator`
- `fix: Resolve NFT gallery loading issue`
- `docs: Update README with new features`
- `style: Format code with prettier`
- `refactor: Simplify transaction history logic`
- `perf: Optimize price tracker updates`
- `test: Add unit tests for utils`
- `chore: Update dependencies`

## 🔄 Development Workflow

1. **Fork and Clone**
   ```bash
   git clone https://github.com/YOUR_USERNAME/xmas-wallet.git
   cd xmas-wallet
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make Changes**
   - Write your code
   - Follow style guidelines
   - Add/update tests

5. **Test Locally**
   ```bash
   npm run dev
   npm run lint
   ```

6. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat: your feature description"
   ```

7. **Push and Create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

## 🎨 Design Guidelines

- Follow the festive theme
- Use the established color palette
- Maintain consistent spacing
- Ensure accessibility (WCAG 2.1 AA)
- Support dark mode
- Optimize for mobile

### Color Palette

```css
--festive-red: #d42426
--festive-green: #165b33
--background: #0d0d0f (dark) / #fffafa (light)
--foreground: #f8f9fa (dark) / #2c3e50 (light)
```

## 🔐 Security

- Never commit private keys or secrets
- Use environment variables for sensitive data
- Validate all user inputs
- Follow Web3 security best practices
- Report security issues privately

## 📚 Documentation

When adding features:
- Update README.md
- Update FEATURES.md
- Add inline code comments
- Update CHANGELOG.md
- Include usage examples

## 🎯 Priority Areas

We're especially interested in contributions for:

1. **Performance Optimizations**
   - Reduce bundle size
   - Improve load times
   - Optimize re-renders

2. **New Features**
   - Additional DeFi integrations
   - Enhanced analytics
   - More blockchain networks

3. **UI/UX Improvements**
   - Accessibility enhancements
   - Animation refinements
   - Mobile experience

4. **Documentation**
   - Tutorial videos
   - API documentation
   - Code examples

## 💬 Questions?

- Open a GitHub issue
- Tag @mumair738 for questions
- Check existing documentation

## 🙏 Recognition

Contributors will be:
- Added to the README
- Mentioned in release notes
- Part of the Xmas Wallet community

---

Thank you for contributing to Xmas Wallet! Your efforts help make Web3 more accessible and festive for everyone! 🎄✨
