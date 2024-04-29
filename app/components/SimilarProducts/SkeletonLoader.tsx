import Rating from "@/app/utils/Rating/Rating";
import SkeletonLoaderImg from "@/app/utils/SkeletonLoaderImg/SkeletonLoaderImg";

export default function SkeletonLoader() {
  const array = Array.from({ length: 5 }, (_, index) => index);

  return (
    <div className="animate-pulse">
      {array.map((value) => {
        return (
          <div key={value} className="flex gap-2 border-b-[1px] pb-1 h-[80px] items-center">
            <div className="h-[50px] w-[50px] bg-skeletonLoad flex items-center justify-center">
              <SkeletonLoaderImg />
            </div>
            <div className="flex flex-col gap-2">
              <div className="w-[100px] h-2 rounded bg-skeletonLoad" />
              <div className="w-[80x] h-2 rounded bg-skeletonLoad" />
              <Rating rating="0" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
