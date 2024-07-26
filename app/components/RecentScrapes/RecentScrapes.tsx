"use client";

import { LoginStatus } from "@/app/contexts/LoginContext";
import { useContext, useEffect, useState } from "react";
import { IRecentScrapes } from "@/types";
import Link from "next/link";
import images from "@/app/constants/images";
import Image from "next/image";

interface RecentScrapes {
  product: IRecentScrapes;
}

export default function RecentScrapes() {
  const [scrapes, setScrapes] = useState<RecentScrapes[]>(
    Array.from({ length: 4 }, (_item, _index) => {
      return {
        product: {
          productId: "",
          title: "",
        },
      };
    })
  );
  const { id } = useContext(LoginStatus);

  async function getRecentScrapes() {
    try {
      const response = await fetch(
        `/api/protected/scrape/recent-scrapes?${new URLSearchParams({
          id,
        })}`
      );
      if (!response.ok) throw Error;
      const json = await response.json();

      if (json.data.totalCount === 0) return;

      setScrapes(json.data.scrapes);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (!id) return;

    getRecentScrapes();
  }, [id]);
  if (!scrapes) return;

  return (
    <div className="flex items-center gap-4 mb-4">
      <Image src={images.recent} alt="recent_searches" width={20} height={20} />
      <div className="flex gap-2 items-center text-fs-200">
        {scrapes.map(({ product }, index) => {
          return (
            <Link
              href={`https://amazon.in/dp/${product.productId}`}
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
