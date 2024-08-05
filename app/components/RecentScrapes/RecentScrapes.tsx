"use client";

import { LoginStatus } from "@/app/contexts/LoginContext";
import { useContext, useEffect } from "react";
import { IRecentScrapes } from "@/types";
import Link from "next/link";
import images from "@/app/constants/images";
import Image from "next/image";
import useApi from "@/app/custom-hooks/useApi";

interface ApiData {
  scrapes: {
    product: IRecentScrapes;
  }[];
  totalCount: number;
}

const placeholders = new Array(4).fill({
  product: { productId: "", title: "Loading..." },
});

export default function RecentScrapes() {
  const { data, isLoading, error, makeRequest } = useApi<ApiData>();
  const { id, accessToken } = useContext(LoginStatus);

  async function getRecentScrapes() {
    const params = { id };
    const options = { headers: { Authorization: `Bearer ${accessToken}` } };

    await makeRequest("/api/protected/scrape/recent-scrapes", params, options);

    if (data && data.totalCount === 0) return;
  }

  useEffect(() => {
    if (id && accessToken) getRecentScrapes();
  }, [id, accessToken]);

  const scrapesToDisplay = data?.scrapes || placeholders;

  return (
    <div className="flex items-center gap-4 mb-4">
      <Link href={"/web-scraper/dashboard"}>
        <Image
          src={images.recent}
          alt="recent_searches"
          width={20}
          height={20}
        />
      </Link>
      <div className="flex gap-2 items-center text-fs-200">
        {scrapesToDisplay.map(({ product }, index) => {
          return (
            <Link
              href={
                product.productId
                  ? `https://amazon.in/dp/${product.productId}`
                  : "#"
              }
              className="bg-[rgba(255,255,255,0.4)] py-1 px-2 rounded-full hover:bg-[rgba(255,255,255,0.3)] cursor-pointer min-w-[112px] min-h-[31px]"
              key={index}
              title={product.title}
              target="_blank"
            >
              {product.title.length > 10
                ? `${product.title.slice(0, 10)}...`
                : product.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
