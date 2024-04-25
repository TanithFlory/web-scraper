import Wrapper from "@/app/utils/Wrapper/Wrapper";
import ProductDetails from "../ProductDetails/ProductDetails";
import PriceGraph from "../PriceGraph/PriceGraph";
import PriceComparison from "../PriceComparison/PriceComparison";
import SimilarProducts from "../SimilarProducts/SimilarProducts";

export default function WebScraperDashboard() {
  return (
    <section>
      <Wrapper className="flex items-center gap-4 max-w-[900px]">
        <ProductDetails
          title="[Upgraded Version] Aqara Motion Sensor P1, Requires AQARA HUB"
          price="₹3,498"
          description="
          Brand	Aqara
          Power Source	Battery Powered
          Item Weight	0.15 Pounds
          Maximum Range	7 metres
          Mounting Type	Wall Mount"
          rating={5}
          image={`https://m.media-amazon.com/images/I/6197566IwpL._SX466_.jpg`}
        />
        <PriceComparison />
        <PriceGraph />
        <SimilarProducts />
      </Wrapper>
    </section>
  );
}
