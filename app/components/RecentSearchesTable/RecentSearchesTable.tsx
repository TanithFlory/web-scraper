"use client";
import { useState, useContext, useEffect } from "react";
import Image from "next/image";
import { LoginStatus } from "@/app/contexts/LoginContext";
import Rating from "@/app/utils/Rating/Rating";
import { ScrapeData } from "@/types";
import priceToInr from "@/app/utility-functions/priceToInr";
import useApi from "@/app/custom-hooks/useApi";
import PriceDropReminderButton from "@/app/components/ProductDetails/PriceDropReminderButton";
import Spinner from "@/app/utils/Spinner/Spinner";

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
        <table className="w-[1068px] relative min-h-[120px]">
          <thead className="bg-[#eaf3ff] h-[55px] w-full border-t-secondary border-y-2 border-b-secondary">
            <tr>
              <th className="w-[50px]">Sr. No</th>
              <th className="w-[120px]"></th>
              <th className="w-[140px]">Title</th>
              <th className="w-[140px]">Current Price</th>
              <th className="w-[140px]">Rating</th>
              <th className="w-[150px]">Date</th>
              <th className="w-[150px]">Total Reviews</th>
              <th className="w-[150px]">Actions</th>
            </tr>
          </thead>
          {isLoading ? (
            <div className="absolute left-[50%] translate-x-[-50%] top-[55%]">
              <Spinner height="50px" width="50px" color="blue" />
            </div>
          ) : data?.totalCount > 0 ? (
            <tbody className="bg-[#ffffff]">
              {data.scrapes.map(({ product, createdAt }, index) => {
                const {
                  productId,
                  image,
                  title,
                  currentPrice,
                  rating,
                  totalReviews,
                } = product;
                return (
                  <tr
                    key={productId}
                    className="border-b-2 border-b-[#F3F3F3] h-[55px] py-2 box-border text-fs-100"
                  >
                    <td className="w-[75px] text-center">
                      {currentPage > 1
                        ? (currentPage - 1) * 13 + (index + 1)
                        : index + 1}
                    </td>
                    <td className="w-[120px]">
                      <Image
                        src={image}
                        width={45}
                        height={45}
                        className="object-contain max-h-[45px] m-auto"
                        alt={title}
                      />
                    </td>
                    <td title={title} className="w-[150px] text-center">
                      {title.length > 15 ? `${title.slice(0, 25)}...` : title}
                    </td>
                    <td className="w-[140px] text-center">
                      {priceToInr(currentPrice)}
                    </td>
                    <td className="w-[140px] text-center">
                      <Rating
                        rating={rating || "0"}
                        className="justify-center"
                      />
                    </td>
                    <td className="w-[150px] text-center">
                      {new Date(createdAt).toLocaleString()}
                    </td>
                    <td className="w-[120px] text-center">
                      {totalReviews.toLocaleString()}
                    </td>
                    <td className="text-center w-[200px]">
                      <form className="bg-secondary p-1 flex items-center justify-center max-w-[150px] mx-auto">
                        <PriceDropReminderButton
                          productId={productId}
                          text={"Price drop reminder"}
                          isTable={true}
                        />
                      </form>
                    </td>
                  </tr>
                );
              })}
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
