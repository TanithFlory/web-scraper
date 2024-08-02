import DashboardCard from "@/app/utils/Dashboard/DashboardCard";
import PrinceComparisonCard from "./PriceComparisonCard";
import DashboardCardTitle from "@/app/utils/Dashboard/DashboardCardTitle";

export default function PriceComparison() {
  const otherStores = ["Flipkart", "Croma", "Ajio", "Myntra"];
  return (
    <DashboardCard className="relative">
      <DashboardCardTitle
        title="Price Comparison"
        description="Compare the prices from other websites."
      />
      <div className="flex gap-2 flex-wrap justify-center">
        {otherStores.map((item, index) => (
          <PrinceComparisonCard item={item} key={index} />
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.7)]  text-white text-lg font-bold">
        <span>Coming Soon...</span>
      </div>
    </DashboardCard>
  );
}
