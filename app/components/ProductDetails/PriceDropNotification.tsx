"use client";
import PriceDropReminderButton from "./PriceDropReminderButton";

export default function PriceDropNotification({
  productId,
}: {
  productId: string;
}) {
  return (
    <form className="bg-secondary p-2 w-full flex gap-2 items-center justify-center cursor-pointer">
      <PriceDropReminderButton
        productId={productId}
        text={"Set a price drop reminder"}
      />
    </form>
  );
}
