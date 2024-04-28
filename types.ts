export type JwtPayload = {
  id: number;
  email: string;
};

export interface Product {
  title: string;
  price: string;
  rating: string;
  image: string;
}

export interface ScrapeData extends Product {
  mrp: string;
  reviews: string;
  relevantProducts: Product[];
}
