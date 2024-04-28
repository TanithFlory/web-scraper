import DashboardCard from "@/app/utils/Dashboard/DashboardCard";
import DashboardCardTitle from "@/app/utils/Dashboard/DashboardCardTitle";
import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";

type Props = {
  products: Product[];
};

export default function SimilarProducts({ products }: Props) {
  console.log(products)
  return (
    <DashboardCard className="overflow-y-scroll">
      <DashboardCardTitle
        title="Similar Products"
        description="Products that are related to this."
      />
      <div className="flex flex-col gap-1">
        {products?.map(({ title, image }, index) => (
          <Link
            href={title}
            className="flex gap-2 border-b-[1px] pb-1 items-center"
            key={index}
          >
            <Image width={50} height={50} src={image} alt={title} />
            <div className="text-fs-100">
              {title.length > 15 ? `${title.slice(0, 15)}` : title}
            </div>
          </Link>
        ))}
      </div>
    </DashboardCard>
  );
}
