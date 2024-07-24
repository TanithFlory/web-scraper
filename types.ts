export type JwtPayload = {
  id: string;
  email: string;
};

export interface Product {
  title: string;
  currentPrice: string;
  rating: string | undefined;
  image: string;
  mrp: string;
  totalReviews: string;
  productId: string;
}

export type RelevantProducts = Omit<Product, "mrp" | "totalReviews">;
export interface ScrapeData extends Product {
  relevantProducts: RelevantProducts[];
  graphSrc: string;
}

export interface IRecentScrapes {
  title: string;
  productId: string;
}
