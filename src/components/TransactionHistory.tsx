"use client";

import { useAccount } from "wagmi";
import { useState, useEffect } from "react";
import { ArrowUpRight, ArrowDownLeft, Loader2 } from "lucide-react";

interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  timestamp: number;
  type: "sent" | "received";
  status: "pending" | "confirmed";
}

export default function TransactionHistory() {
  const { address } = useAccount();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!address) return;

    const fetchTransactions = async () => {
      setLoading(true);
      try {
        // Fetch from Basescan API
        const response = await fetch(
          `https://api.basescan.org/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=desc&apikey=YourApiKeyToken`
        );
        const data = await response.json();
        
        if (data.result && Array.isArray(data.result)) {
          const formattedTxs = data.result.slice(0, 5).map((tx: any) => ({
            hash: tx.hash,
            from: tx.from,
            to: tx.to,
            value: (Number(tx.value) / 1e18).toFixed(4),
            timestamp: Number(tx.timeStamp),
            type: tx.from.toLowerCase() === address.toLowerCase() ? "sent" : "received",
            status: tx.isError === "0" ? "confirmed" : "pending",
          }));
          setTransactions(formattedTxs);
        }
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      }
      setLoading(false);
    };

    const timer = setTimeout(fetchTransactions, 1000);
    return () => clearTimeout(timer);
  }, [address]);

  if (!address) return null;

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Recent Transactions</h2>
        {loading && <Loader2 className="animate-spin text-festive-red" size={20} />}
      </div>

      <div className="space-y-2 max-h-64 overflow-y-auto">
        {transactions.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-4">No transactions yet</p>
        ) : (
          transactions.map((tx) => (
            <a
              key={tx.hash}
              href={`https://basescan.org/tx/${tx.hash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 rounded-lg transition border border-white/10 group"
            >
              <div className="flex items-center gap-3 flex-1">
                <div className={`p-2 rounded-full ${tx.type === "sent" ? "bg-red-500/20" : "bg-green-500/20"}`}>
                  {tx.type === "sent" ? (
                    <ArrowUpRight className="text-red-400" size={18} />
                  ) : (
                    <ArrowDownLeft className="text-green-400" size={18} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate group-hover:text-festive-red transition">
                    {tx.type === "sent" ? "Sent" : "Received"} ETH
                  </p>
                  <p className="text-gray-400 text-xs">
                    {new Date(tx.timestamp * 1000).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-semibold text-sm ${tx.type === "sent" ? "text-red-400" : "text-green-400"}`}>
                  {tx.type === "sent" ? "-" : "+"}{tx.value} ETH
                </p>
                <span className="text-xs text-gray-400">{tx.status}</span>
              </div>
            </a>
          ))
        )}
      </div>
    </div>
  );
}
