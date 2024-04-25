import DashboardCard from "@/app/utils/DashboardCard/DashboardCard";
import PrinceComparisonCard from "./PriceComparisonCard";

export default function PriceComparison() {
  const otherStores = ["Flipkart", "Croma", "Ajio", "Myntra"];
  return (
    <DashboardCard>
      <div className="mb-4">
        <h3 className="font-bold text-fs-200">Price Comparison</h3>
        <p className="text-fs-100">Compare the prices from other websites.</p>
      </div>
      <div className="flex gap-2 flex-wrap justify-center">
        {otherStores.map((item, index) => (
          <PrinceComparisonCard item={item} key={index} />
        ))}
      </div>
    </DashboardCard>
  );
}
