import Wrapper from "@/app/utils/Wrapper/Wrapper";
import ProductDetails from "../ProductDetails/ProductDetails";
import PriceGraph from "../PriceGraph/PriceGraph";
import PriceComparison from "../PriceComparison/PriceComparison";
import SimilarProducts from "../SimilarProducts/SimilarProducts";
import { ScrapeData } from "@/types";
import ProductGraph from "../ProductGraph/ProductGraph";

interface IProps extends ScrapeData {
  isLoading: boolean;
}

export default function WebScraperDashboard(props: IProps) {
  const { isLoading, relevantProducts, ...rest } = props;
  return (
    <section>
      <Wrapper className="flex items-center gap-4 max-w-[1200px] justify-center flex-wrap">
        <ProductDetails productDetails={{ ...rest }} isLoading={isLoading} />
        <PriceComparison />
        <PriceGraph />
        <SimilarProducts products={relevantProducts} isLoading={isLoading} />
        <ProductGraph />
      </Wrapper>
    </section>
  );
}
