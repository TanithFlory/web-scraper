import DashboardCard from "@/app/utils/DashboardCard/DashboardCard";
import images, { Icons } from "../../constants/images";
import Link from "next/link";
import Image from "next/image";

export default function PriceComparison() {
  const otherStores = ["Flipkart", "Croma", "Ajio", "Myntra"];
  return (
    <DashboardCard>
      <div className="mb-4">
        <h3 className="font-bold text-fs-200">Price Comparison</h3>
        <p className="text-fs-100">Compare the prices from other websites.</p>
      </div>
      <div className="flex gap-2 flex-wrap justify-center">
        {otherStores.map((item, index) => {
          const styles =
            "bg-[#F4F3F1] mb-1 flex flex-col justify-center w-[100px] h-[100px] p-2 rounded-sm items-center cursor-pointer";
          const renderItems = (
            <>
              <div className="h-[35px] flex items-center">
                {Icons?.[item] || (
                  <Image src={images[item]} alt={item} width={35} height={35} />
                )}
              </div>
              <div className="text-fs-100">{item}</div>
            </>
          );
          return (item as any).href ? (
            <Link href={""} className={styles} key={index}>
              {renderItems}
            </Link>
          ) : (
            <div className={styles}>{renderItems}</div>
          );
        })}
      </div>
    </DashboardCard>
  );
}
