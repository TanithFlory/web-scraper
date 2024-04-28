import Wrapper from "@/app/utils/Wrapper/Wrapper";
import ProductDetails from "../ProductDetails/ProductDetails";
import PriceGraph from "../PriceGraph/PriceGraph";
import PriceComparison from "../PriceComparison/PriceComparison";
import SimilarProducts from "../SimilarProducts/SimilarProducts";
import { ScrapeData } from "@/types";

export default function WebScraperDashboard(props: ScrapeData) {
  return (
    <section>
      <Wrapper className="flex items-center gap-4 max-w-[900px]">
        <ProductDetails {...props} />
        <PriceComparison />
        <PriceGraph />
        <SimilarProducts products={props.relevantProducts} />
      </Wrapper>
    </section>
  );
}
