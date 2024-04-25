import DashboardCard from "@/app/utils/Dashboard/DashboardCard";
import PrinceComparisonCard from "./PriceComparisonCard";
import DashboardCardTitle from "@/app/utils/Dashboard/DashboardCardTitle";

export default function PriceComparison() {
  const otherStores = ["Flipkart", "Croma", "Ajio", "Myntra"];
  return (
    <DashboardCard>
      <DashboardCardTitle
        title="Price Comparison"
        description="Compare the prices from other websites."
      />
      <div className="flex gap-2 flex-wrap justify-center">
        {otherStores.map((item, index) => (
          <PrinceComparisonCard item={item} key={index} />
        ))}
      </div>
    </DashboardCard>
  );
}
