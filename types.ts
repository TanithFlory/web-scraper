export type JwtPayload = {
  id: string;
  email: string;
};

export interface Product {
  title: string;
  price: string;
  rating: string;
  image: string;
  mrp: string;
  totalReviews: string;
}

export interface ScrapeData extends Product {
  relevantProducts: Omit<Product, "mrp" | "reviews">[];
  graphSrc: string;
}
