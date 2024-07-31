import { NextResponse } from "next/server";

export type JwtPayload = {
  uuid: string;
  email: string;
};

export interface Product {
  title: string;
  currentPrice: number;
  rating: string | "0";
  image: string;
  mrp: string;
  totalReviews: number;
  productId: string;
  id?: number;
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

export interface ILoginStatus {
  isLogged: undefined | boolean;
  accessToken: string;
  id: string;
  setLoginStatus: React.Dispatch<React.SetStateAction<ILoginStatus>> | null;
}

export interface NextRequestProtected extends NextResponse {
  user: JwtPayload & { id?: number };
}
