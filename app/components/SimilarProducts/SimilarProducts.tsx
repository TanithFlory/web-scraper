import DashboardCard from "@/app/utils/Dashboard/DashboardCard";
import DashboardCardTitle from "@/app/utils/Dashboard/DashboardCardTitle";
import Rating from "@/app/utils/Rating/Rating";
import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import SkeletonLoader from "./SkeletonLoader";

type Props = {
  products: Omit<Product, "mrp" | "reviews">[];
  isLoading: boolean;
};

export default function SimilarProducts({ products, isLoading }: Props) {
  return (
    <DashboardCard className="overflow-y-scroll">
      <DashboardCardTitle
        title="Similar Products"
        description="Products that are related to this."
      />
      <div className="flex flex-col gap-1">
        {isLoading ? (
          <SkeletonLoader />
        ) : (
          <>
            {products?.map(({ title, image, price, rating }, index) => (
              <Link
                href={title}
                className="flex gap-2 border-b-[1px] pb-1 items-center text-fs-100 h-[75px]"
                key={index}
              >
                <Image width={50} height={50} src={image} alt={title} />
                <div>
                  <div className="">
                    {title.length > 15 ? `${title.slice(0, 15)}` : title}
                  </div>
                  <div>{price}</div>
                  <div>
                    <Rating rating={rating} />
                  </div>
                </div>
              </Link>
            ))}
          </>
        )}
      </div>
    </DashboardCard>
  );
}
