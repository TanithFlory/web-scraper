import React, { FormEvent } from "react";
import { Product } from "@/types";
import Image from "next/image";
import Rating from "@/app/utils/Rating/Rating";
import priceToInr from "@/app/utility-functions/priceToInr";

export default function EmailNotificationCard({
  product,
}: {
  product: Product;
}) {
  const { title, image, currentPrice, rating, totalReviews, productId } =
    product;
  function deleteEmailNotification(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    
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
      <form onSubmit={deleteEmailNotification}>
        <button className="bg-red p-2 text-fs-100 rounded-md mt-2">
          Delete
        </button>
      </form>
    </div>
  );
}
