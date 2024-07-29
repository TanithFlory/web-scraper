"use client";
import { useState, useContext, useEffect } from "react";
import Image from "next/image";
import { LoginStatus } from "@/app/contexts/LoginContext";
import Rating from "@/app/utils/Rating/Rating";
import { ScrapeData } from "@/types";
import useProtected from "@/app/custom-hooks/useProtected";

export default function RecentSearchesTable() {
  const [recentSearches, setRecentSearches] = useState<
    {
      product: ScrapeData;
      createdAt: Date;
    }[]
  >([]);
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { id } = useContext(LoginStatus);
  const { Toastify } = useProtected();

  async function getRecentSearches(pageNumber: number) {
    try {
      const response = await fetch(
        `/api/protected/scrape/recent-scrapes/?${new URLSearchParams({
          detailsOnly: "true",
          id,
          page: pageNumber.toString(),
        })}`
      );
      if (!response.ok) throw Error;
      const json = await response.json();
      setRecentSearches(json.data.scrapes);
      setPages(Math.ceil(json.data.totalCount / 13));
    } catch (error) {
      console.error("Error fetching recent searches:", error);
    }
  }

  useEffect(() => {
    if (id) {
      getRecentSearches(currentPage);
    }
  }, [id, currentPage]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

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
          {recentSearches.length ? (
            <tbody className="bg-[#ffffff]">
              {recentSearches.map(({ product, createdAt }, index) => (
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
                    {product.currentPrice}
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
                    {product.totalReviews}
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
      <Toastify />
    </>
  );
}
