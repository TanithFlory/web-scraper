import Wrapper from "@/app/utils/Wrapper/Wrapper";
import ProductDetails from "../ProductDetails/ProductDetails";
import PriceGraph from "../PriceGraph/PriceGraph";
import PriceComparison from "../PriceComparison/PriceComparison";
import SimilarProducts from "../SimilarProducts/SimilarProducts";

export default function WebScraperDashboard() {
  return (
    <section>
      <Wrapper className="flex items-center gap-4 max-w-[900px]">
        <ProductDetails />
        <PriceComparison />
        <PriceGraph />
        <SimilarProducts />
      </Wrapper>
    </section>
  );
}
