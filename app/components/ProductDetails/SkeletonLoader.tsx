import Rating from "@/app/utils/Rating/Rating";
import SkeletonLoaderImg from "@/app/utils/SkeletonLoaderImg/SkeletonLoaderImg";

export default function SkeletonLoader() {
  const txtStyles = `h-3 bg-skeletonLoad rounded-full`;
  return (
    <div className="flex flex-col gap-4 animate-pulse">
      <div className="w-[180px] h-[100px] flex items-center justify-center rounded  bg-skeletonLoad my-auto">
        <SkeletonLoaderImg />
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        <div className={`w-[180px] ${txtStyles}`} />
        <Rating rating="0" />
        <div className={`${txtStyles} w-[100px]`} />
        <div className="flex flex-col gap-2">
          <div className={`${txtStyles} w-[180px]`} />
          <div className={`${txtStyles} w-[120px] mx-auto`} />
        </div>
      </div>
    </div>
  );
}
