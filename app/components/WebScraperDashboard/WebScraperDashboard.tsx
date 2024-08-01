import Wrapper from "@/app/utils/Wrapper/Wrapper";
import ProductDetails from "../ProductDetails/ProductDetails";
import PriceGraph from "../PriceGraph/PriceGraph";
import PriceComparison from "../PriceComparison/PriceComparison";
import SimilarProducts from "../SimilarProducts/SimilarProducts";
import { ScrapeData } from "@/types";
import {  useEffect, useRef } from "react";

interface IProps extends ScrapeData {
  isLoading: boolean;
}

export default function WebScraperDashboard(props: IProps) {
  const { isLoading, relevantProducts, title, graphSrc, ...rest } = props;
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [isLoading]);
  return (
    <section ref={sectionRef}>
      <Wrapper className="flex items-center gap-4 max-w-[1200px] justify-center flex-wrap pb-16">
        <ProductDetails
          productDetails={{ title, ...rest }}
          isLoading={isLoading}
        />
        <PriceComparison />
        <SimilarProducts products={relevantProducts} isLoading={isLoading} />
        <PriceGraph src={graphSrc} isLoading={isLoading} />
      </Wrapper>
    </section>
  );
}
