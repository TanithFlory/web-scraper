import DashboardCard from "@/app/utils/Dashboard/DashboardCard";
import Rating from "@/app/utils/Rating/Rating";
import Image from "next/image";
import SkeletonLoader from "./SkeletonLoader";
import { Product } from "@/types";
import priceToInr from "@/app/utility-functions/priceToInr";
import PriceDropNotification from "./PriceDropNotification";

export default function ProductDetails({
  productDetails,
  isLoading,
}: {
  productDetails: Product;
  isLoading?: boolean;
}) {
  const { title, mrp, image, rating, totalReviews, currentPrice, productId } =
    productDetails;

  return (
    <DashboardCard className="flex items-center text-fs-200 justify-center flex-col  gap-2">
      {isLoading ? (
        <SkeletonLoader />
      ) : (
        <>
          <div>
            <Image
              src={image}
              alt={title}
              className="max-h-[100px] object-contain"
              height={150}
              width={100}
            />
          </div>
          <div title={title}>
            <h3 className="font-bold text-secondary">
              {title?.length > 20 ? `${title.slice(0, 20)}...` : title}
            </h3>
          </div>
          <div className="flex gap-2">
            <Rating rating={rating || "0"} />
            <div className="text-fs-100">{`(${totalReviews.toLocaleString()})`}</div>
          </div>
          <div className="line-through text-fs-100">{mrp}</div>
          <div>
            <h4 className="text-center">{priceToInr(currentPrice)}</h4>
          </div>
        </>
      )}
      <PriceDropNotification productId={productId}/>
    </DashboardCard>
  );
}
