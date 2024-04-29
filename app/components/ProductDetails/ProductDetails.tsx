import images from "@/app/constants/images";
import DashboardCard from "@/app/utils/Dashboard/DashboardCard";
import Rating from "@/app/utils/Rating/Rating";
import Image from "next/image";
import SkeletonLoader from "./SkeletonLoader";
import { Product } from "@/types";

export default function ProductDetails({
  productDetails,
  isLoading,
}: {
  productDetails: Product;
  isLoading?: boolean;
}) {
  const { title, mrp, image, rating, reviews, price } = productDetails;

  return (
    <DashboardCard className="flex items-center text-fs-200 justify-center flex-col  gap-2">
      {isLoading ? (
        <SkeletonLoader />
      ) : (
        <>
          <div>
            <Image src={image} width={100} height={100} alt={"watch"} />
          </div>
          <div title={title}>
            <h3 className="font-bold text-secondary">
              {title?.length > 20 ? `${title.slice(0, 20)}...` : title}
            </h3>
          </div>
          <div className="flex gap-2">
            <Rating rating={rating} />
            <div className="text-fs-100">{`(${reviews})`}</div>
          </div>
          <div className="line-through text-fs-100">{mrp}</div>
          <div>
            <h4 className="text-center">{price}</h4>
          </div>
        </>
      )}
      <div className="bg-secondary p-2 w-full flex gap-2 items-center justify-center my-auto">
        <div>
          <Image src={images.bell} alt="Bell" width={20} height={20} />
        </div>
        <div className="text-fs-100 text-white">Set a price drop reminder</div>
      </div>
    </DashboardCard>
  );
}
