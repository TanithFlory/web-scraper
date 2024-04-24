import DashboardCard from "@/app/utils/DashboardCard/DashboardCard";
import { Icons } from "../../constants/images";

export default function PriceComparison() {
  const otherStores = ["Flipkart", "Croma", "Ajio", "Myntra"];
  return (
    <DashboardCard>
      <div className="mb-4">
        <h3 className="font-bold text-fs-200">Price Comparison</h3>
        <p className="text-fs-100">Compare the prices from other websites.</p>
      </div>
      {otherStores.map((item, index) => {
        return (
          <div className="bg-[#F4F3F1] mb-1 flex gap-2 p-2 rounded-sm items-center">
            <div>{Icons[item]}</div>
            <div className="text-fs-100">{item}</div>
          </div>
        );
      })}
    </DashboardCard>
  );
}
