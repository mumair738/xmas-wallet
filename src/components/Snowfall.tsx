"use client";

import React, { useEffect, useState } from "react";

export default function Snowfall() {
  const [flakes, setFlakes] = useState<{ id: number; left: string; duration: string; size: string; opacity: number }[]>([]);

  useEffect(() => {
    const newFlakes = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      duration: `${Math.random() * 10 + 5}s`,
      size: `${Math.random() * 5 + 2}px`,
      opacity: Math.random() * 0.5 + 0.3,
    }));
    setFlakes(newFlakes);
  }, []);

  return (
    <div className="snow-container">
      {flakes.map((flake) => (
        <div
          key={flake.id}
          className="snowflake"
          style={{
            left: flake.left,
            width: flake.size,
            height: flake.size,
            opacity: flake.opacity,
            animationDuration: flake.duration,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}
    </div>
  );
}
