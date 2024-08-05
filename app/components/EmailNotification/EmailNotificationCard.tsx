import React, { FormEvent, useContext } from "react";
import { Product } from "@/types";
import Image from "next/image";
import Rating from "@/app/utils/Rating/Rating";
import priceToInr from "@/app/utility-functions/priceToInr";
import Link from "next/link";
import useSubmitForm from "@/app/custom-hooks/useSubmitForm";
import Spinner from "@/app/utils/Spinner/Spinner";
import { LoginStatus } from "@/app/contexts/LoginContext";

export default function EmailNotificationCard({
  product,
  id: priceDropId,
  removeDeletedItem,
}: {
  product: Product;
  id: number;
  removeDeletedItem: (id: number) => void;
}) {
  const { title, image, currentPrice, rating, totalReviews, productId } =
    product;
  const { status, loading, submitFormHandler } = useSubmitForm();
  const { accessToken } = useContext(LoginStatus);
  async function deleteEmailNotification(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!accessToken) return;

    await submitFormHandler({
      e,
      formData: {},
      method: "DELETE",
      apiRoute: `/api/protected/scrape/notifications-queued?priceDropId=${priceDropId}`,
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    removeDeletedItem(priceDropId);
  }

  return (
    <div
      id={productId}
      className="w-[200px] h-[200px] bg-white text-fs-100 border-[1px] border-[#BABABB]  shadow-lg p-4 rounded-md flex flex-col gap-[2px] items-center justify-center max-w-[240px]"
    >
      <div>
        <Image
          src={image}
          alt={title}
          className="object-contain"
          width={50}
          height={50}
        />
      </div>
      <div>{title.length > 12 ? `${title.slice(0, 20)}...` : title}</div>
      <div>
        <Rating rating={rating || "0"} />
      </div>
      <div>{priceToInr(currentPrice)}</div>
      <div>Total Reviews: {totalReviews}</div>
      <div className="flex gap-2 items-center">
        <form onSubmit={deleteEmailNotification}>
          <button className="bg-red p-2 text-fs-100 rounded-md w-[60px] text-center">
            {loading ? <Spinner /> : "Delete"}
          </button>
        </form>
        <Link
          target="_blank"
          href={`https://amazon.in/dp/${productId}`}
          className="bg-green p-2 h-[35px] text-fs-100 rounded-md w-[60px] text-center"
        >
          View
        </Link>
      </div>
    </div>
  );
}
