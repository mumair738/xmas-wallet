"use client";

import { useAccount } from "wagmi";
import { useState, useEffect } from "react";
import { Image, ExternalLink, Heart } from "lucide-react";

interface NFT {
  id: string;
  name: string;
  collection: string;
  image: string;
  description: string;
  tokenId: string;
  liked: boolean;
}

export default function NFTGallery() {
  const { address } = useAccount();
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null);

  useEffect(() => {
    if (!address) return;

    const fetchNFTs = async () => {
      setLoading(true);
      // Simulate fetching NFTs - in production, use Alchemy or similar API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockNFTs: NFT[] = [
        {
          id: "1",
          name: "Festive Spirit #123",
          collection: "Christmas Collection",
          image: "/wallet-icon.jpg",
          description: "A magical Christmas NFT celebrating the holiday season",
          tokenId: "123",
          liked: false,
        },
        {
          id: "2",
          name: "Winter Wonderland #456",
          collection: "Seasonal Series",
          image: "/rewards-badge.jpg",
          description: "Beautiful winter scene captured as digital art",
          tokenId: "456",
          liked: true,
        },
        {
          id: "3",
          name: "Base Builder #789",
          collection: "Base Network",
          image: "/base-logo.jpg",
          description: "Commemorating builders on Base blockchain",
          tokenId: "789",
          liked: false,
        },
      ];

      setNfts(mockNFTs);
      setLoading(false);
    };

    fetchNFTs();
  }, [address]);

  const toggleLike = (id: string) => {
    setNfts((prev) =>
      prev.map((nft) => (nft.id === id ? { ...nft, liked: !nft.liked } : nft))
    );
  };

  if (!address) return null;

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center gap-2">
        <Image className="text-purple-400" size={20} />
        <h2 className="text-lg font-semibold text-white">NFT Gallery</h2>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 gap-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="aspect-square bg-white/5 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : nfts.length === 0 ? (
        <div className="bg-white/5 rounded-lg p-8 text-center border border-white/10">
          <Image className="mx-auto mb-3 text-gray-500" size={48} />
          <p className="text-gray-400">No NFTs found in your wallet</p>
          <p className="text-gray-500 text-sm mt-1">Collect NFTs to see them here</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {nfts.map((nft) => (
            <div
              key={nft.id}
              className="group relative bg-white/5 rounded-lg overflow-hidden border border-white/10 hover:border-purple-400/50 transition cursor-pointer"
              onClick={() => setSelectedNFT(nft)}
            >
              <div className="aspect-square relative">
                <img
                  src={nft.image}
                  alt={nft.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-3">
                <p className="text-white font-semibold text-sm truncate">{nft.name}</p>
                <p className="text-gray-400 text-xs truncate">{nft.collection}</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLike(nft.id);
                }}
                className="absolute top-2 right-2 p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition"
              >
                <Heart
                  size={16}
                  className={nft.liked ? "fill-red-500 text-red-500" : "text-white"}
                />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* NFT Detail Modal */}
      {selectedNFT && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in"
          onClick={() => setSelectedNFT(null)}
        >
          <div
            className="bg-gray-900 rounded-2xl border border-white/20 max-w-md w-full overflow-hidden animate-in zoom-in"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedNFT.image}
              alt={selectedNFT.name}
              className="w-full aspect-square object-cover"
            />
            <div className="p-4 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-white font-bold text-lg">{selectedNFT.name}</h3>
                  <p className="text-gray-400 text-sm">{selectedNFT.collection}</p>
                </div>
                <button
                  onClick={() => toggleLike(selectedNFT.id)}
                  className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition"
                >
                  <Heart
                    size={20}
                    className={selectedNFT.liked ? "fill-red-500 text-red-500" : "text-white"}
                  />
                </button>
              </div>
              <p className="text-gray-300 text-sm">{selectedNFT.description}</p>
              <div className="flex gap-2">
                <a
                  href={`https://basescan.org/token/${address}?a=${selectedNFT.tokenId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg text-sm font-semibold transition"
                >
                  <ExternalLink size={16} />
                  View on BaseScan
                </a>
              </div>
              <button
                onClick={() => setSelectedNFT(null)}
                className="w-full p-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm font-semibold transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
