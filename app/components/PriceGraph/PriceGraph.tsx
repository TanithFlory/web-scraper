"use client";
import "./PriceGraph.styles.css";

export default function PriceGraph({ src }: { src: string }) {
  function validateSrc(src: string) {
    const test = `https://pricehistoryapp.com/embed/${src
      ?.toLowerCase()
      .replace(/[^a-z0-9\-]/g, " ")
      .replace(/\s+/g, "-")}`;

    if (test[test.length - 1] === "-") {
      return test.slice(0, test.length - 1);
    }

    return test;
  }

  return (
    <iframe
      src={validateSrc(src)}
      width="100%"
      height="500"
      allowTransparency={true}
    />
  );
}
