import images from "@/app/constants/images";
import DashboardCard from "@/app/utils/DashboardCard/DashboardCard";
import Rating from "@/app/utils/Rating/Rating";
import Image from "next/image";

export default function ProductDetails() {
  return (
    <DashboardCard className="flex items-center justify-center flex-col  gap-2">
      <div>
        <Image
          src={"https://m.media-amazon.com/images/I/61TapeOXotL._SX522_.jpg"}
          width={100}
          height={100}
          alt={"watch"}
        />
      </div>
      <div>
        <h3 className="text-fs-200 font-bold text-secondary">Watch</h3>
      </div>
      <div>
        <p className="text-fs-100 text-center ">
          1.38 TFT display: Featuring a vibrant round display and a stylish
          metallic finish, the smartwatch offers a premium on-screen experience.
        </p>
      </div>
      <div>
        <h4 className="text-fs-200">5.5$</h4>
      </div>
      <div>
        <Rating rating={4} />
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
