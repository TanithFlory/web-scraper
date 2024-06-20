"use client";
import "./PriceGraph.styles.css";

export default function PriceGraph({ src }: { src: string }) {
  return (
    <iframe
      src={src || "https://pricehistoryapp.com/embed/abc"}
      width="100%"
      height="500"
      allowTransparency={true}
    />
  );
}
