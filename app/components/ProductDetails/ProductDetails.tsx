import images from "@/app/constants/images";
import DashboardCard from "@/app/utils/Dashboard/DashboardCard";
import Rating from "@/app/utils/Rating/Rating";
import Image from "next/image";

type Props = {
  title: string;
  rating: string;
  image: string;
  price: string;
};

export default function ProductDetails({ title, rating, price, image }: Props) {
  return (
    <DashboardCard className="flex items-center justify-center flex-col  gap-2">
      <div>
        <Image src={image} width={100} height={100} alt={"watch"} />
      </div>
      <div title={title}>
        <h3 className="text-fs-200 font-bold text-secondary">
          {title?.length > 20 ? `${title.slice(0, 20)}...` : title}
        </h3>
      </div>
      <div>
        <h4 className="text-fs-200">{price}</h4>
      </div>
      <div>
        <Rating rating={rating} />
      </div>
      <div className="bg-secondary p-2 w-full flex gap-2 items-center justify-center">
        <div>
          <Image src={images.bell} alt="Bell" width={20} height={20} />
        </div>
        <div className="text-fs-100 text-white">Set a price drop reminder</div>
      </div>
    </DashboardCard>
  );
}
