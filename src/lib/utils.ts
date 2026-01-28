import { type ClassValue, clsx } from "clsx";

/**
 * Merge Tailwind CSS classes with proper precedence
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * Format large numbers with K, M, B suffixes
 */
export function formatNumber(num: number): string {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + "B";
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}

/**
 * Truncate Ethereum address
 */
export function truncateAddress(address: string, chars = 4): string {
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}

/**
 * Format USD currency
 */
export function formatUSD(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Format ETH amount
 */
export function formatETH(amount: number, decimals = 4): string {
  return amount.toFixed(decimals);
}

/**
 * Format percentage
 */
export function formatPercent(value: number, decimals = 2): string {
  const sign = value >= 0 ? "+" : "";
  return `${sign}${value.toFixed(decimals)}%`;
}

/**
 * Get time ago string
 */
export function timeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  
  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);
    if (interval >= 1) {
      return `${interval} ${unit}${interval > 1 ? "s" : ""} ago`;
    }
  }
  
  return "Just now";
}

/**
 * Copy to clipboard with fallback
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand("copy");
      document.body.removeChild(textArea);
      return true;
    } catch (e) {
      document.body.removeChild(textArea);
      return false;
    }
  }
}

/**
 * Generate random color
 */
export function randomColor(): string {
  const colors = [
    "#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A",
    "#98D8C8", "#F7DC6F", "#BB8FCE", "#85C1E2",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

/**
 * Validate Ethereum address
 */
export function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

/**
 * Calculate days until Christmas
 */
export function daysUntilChristmas(): number {
  const today = new Date();
  const christmas = new Date(today.getFullYear(), 11, 25);
  
  if (today > christmas) {
    christmas.setFullYear(christmas.getFullYear() + 1);
  }
  
  const diffTime = christmas.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Get festive greeting
 */
export function getFestiveGreeting(): string {
  const today = new Date();
  const month = today.getMonth();
  const day = today.getDate();
  
  if (month === 11 && day === 25) {
    return "Merry Christmas! 🎄";
  }
  
  const daysLeft = daysUntilChristmas();
  
  if (daysLeft <= 7) {
    return `${daysLeft} days until Christmas! 🎁`;
  }
  
  if (month === 11) {
    return "Holiday season is here! ✨";
  }
  
  return "Keep the festive spirit alive! 🎅";
}
