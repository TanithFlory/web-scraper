"use client";

import { useState } from "react";

export default function PriceGraph({
  src,
  isLoading,
}: {
  src: string;
  isLoading: boolean;
}) {
  const [error, setError] = useState(false);
  return (
    <div style={{ position: "relative", width: "100%", height: "500px" }}>
      {(error || isLoading) && (
        <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.6)] text-white flex items-center justify-center text-fs-400 font-bold z-10">
          {error && "Price history not found!"}
          {isLoading && "Loading..."}
        </div>
      )}
      <iframe
        src={src || "https://pricehistoryapp.com/embed/abc"}
        width="100%"
        height="500"
        allowTransparency={true}
        onError={() => setError(true)}
        style={{ border: "none" }}
      />
    </div>
  );
}
