function Star() {
  return (
    <svg viewBox="0 0 32 32" id="star">
      <defs>
        <mask id="half">
          <rect x="50%" y="0" width="32" height="32" fill="white" />
        </mask>
        <symbol viewBox="0 0 32 32" id="star">
          <path d="..." />
        </symbol>
      </defs>
    </svg>
  );
}

export default function Rating({ rating }: { rating: number }) {
  const stars = Array.from({ length: rating }, (_, index) => index);
  return (
    <div className="c-rate">
      <svg className="fill-[#fece3c]" width="32" height="32">
        {stars.map((num) => (
          <Star key={num} />
        ))}
      </svg>
    </div>
  );
}
