"use client";
import { useState, useContext, useEffect } from "react";
import Image from "next/image";
import { LoginStatus } from "@/app/contexts/LoginContext";
import Rating from "@/app/utils/Rating/Rating";
import { ScrapeData } from "@/types";
import priceToInr from "@/app/utility-functions/priceToInr";
import useApi from "@/app/custom-hooks/useApi";

interface ApiData {
  totalCount: number;
  scrapes: {
    product: ScrapeData;
    createdAt: Date;
  }[];
}

export default function RecentSearchesTable() {
  const { data, isLoading, error, makeRequest } = useApi<ApiData>();
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { id, accessToken } = useContext(LoginStatus);

  async function getRecentSearches(pageNumber: number) {
    const params = { id, detailsOnly: "true", page: pageNumber.toString() };
    const options = { headers: { Authorization: `Bearer ${accessToken}` } };

    await makeRequest("/api/protected/scrape/recent-scrapes/", params, options);
    if (!data || data.totalCount === 0) return;
  }

  useEffect(() => {
    if (id) {
      getRecentSearches(currentPage);
    }
  }, [id, currentPage]);

  useEffect(() => {
    if (data?.totalCount) {
      setPages(Math.ceil(data.totalCount / 13));
    }
  }, [data?.totalCount]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  if (!data) return;

  return (
    <>
      <div className="bg-white text-black overflow-auto">
        <table className="w-[1068px]">
          <thead className="bg-[#eaf3ff] h-[55px] w-full border-t-secondary border-y-2 border-b-secondary">
            <tr>
              <th className="w-[50px]">Sr. No</th>
              <th className="w-[120px]"></th>
              <th className="w-[140px]">Title</th>
              <th className="w-[140px]">Current Price</th>
              <th className="w-[140px]">Rating</th>
              <th className="w-[150px]">Date</th>
              <th className="w-[150px]">Total Reviews</th>
            </tr>
          </thead>
          {data?.totalCount > 0 ? (
            <tbody className="bg-[#ffffff]">
              {data.scrapes.map(({ product, createdAt }, index) => (
                <tr
                  key={product.productId}
                  className="border-b-2 border-b-[#F3F3F3] h-[55px] py-2 box-border text-fs-100"
                >
                  <td className="w-[50px] text-center">
                    {currentPage > 1
                      ? (currentPage - 1) * 13 + (index + 1)
                      : index + 1}
                  </td>
                  <td className="w-[120px]">
                    <Image
                      src={product.image}
                      width={45}
                      height={45}
                      className="object-contain max-h-[45px] m-auto"
                      alt={product.title}
                    />
                  </td>
                  <td title={product.title} className="w-[150px] text-center">
                    {product.title.length > 15
                      ? `${product.title.slice(0, 25)}...`
                      : product.title}
                  </td>
                  <td className="w-[140px] text-center">
                    {priceToInr(product.currentPrice)}
                  </td>
                  <td className="w-[140px] text-center">
                    <Rating
                      rating={product.rating || "0"}
                      className="justify-center"
                    />
                  </td>
                  <td className="w-[150px] text-center">
                    {new Date(createdAt).toLocaleString()}
                  </td>
                  <td className="w-[150px] text-center">
                    {product.totalReviews.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          ) : null}
        </table>
        {pages > 0 ? (
          <div className="flex justify-center my-4 gap-2">
            {Array.from({ length: pages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`mx-1 px-3 py-1 rounded-md border-[1px] border-secondary ${
                  page === currentPage
                    ? "bg-gray-300"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </>
  );
}
