import Wrapper from "@/app/utils/Wrapper/Wrapper";
import ProductDetails from "../ProductDetails/ProductDetails";
import PriceGraph from "../PriceGraph/PriceGraph";
import PriceComparison from "../PriceComparison/PriceComparison";
import SimilarProducts from "../SimilarProducts/SimilarProducts";
import { ScrapeData } from "@/types";

interface IProps extends ScrapeData {
  isLoading: boolean;
}

export default function WebScraperDashboard(props: IProps) {
  const { isLoading, relevantProducts, title, ...rest } = props;
  return (
    <section>
      <Wrapper className="flex items-center gap-4 max-w-[1200px] justify-center flex-wrap">
        <ProductDetails
          productDetails={{ title, ...rest }}
          isLoading={isLoading}
        />
        <PriceComparison />
        <SimilarProducts products={relevantProducts} isLoading={isLoading} />
        <PriceGraph src={title} />
      </Wrapper>
    </section>
  );
}
