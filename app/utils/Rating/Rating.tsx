import { FaStar } from "react-icons/fa";

export default function Rating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-2">
      {Array.from({ length: 5 }, (_, index) => index).map((num) => (
        <FaStar
          key={num}
          className={`stroke-[3%] stroke-black ${
            num < rating ? "fill-[#fece3c]" : "fill-none"
          }`}
        />
      ))}
    </div>
  );
}
