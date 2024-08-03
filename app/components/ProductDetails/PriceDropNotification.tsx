"use client";
import images from "@/app/constants/images";
import { LoginStatus } from "@/app/contexts/LoginContext";
import useSubmitForm from "@/app/custom-hooks/useSubmitForm";
import Spinner from "@/app/utils/Spinner/Spinner";
import Image from "next/image";
import { useContext } from "react";

export default function PriceDropNotification({
  productId,
}: {
  productId: string;
}) {
  const { accessToken } = useContext(LoginStatus);
  const { loading, submitFormHandler } = useSubmitForm();

  async function setPriceDropReminder(e: React.FormEvent) {
    if (!productId || !accessToken) return;

    await submitFormHandler({
      e,
      formData: { productId },
      method: "POST",
      apiRoute: "/api/protected/scrape/notifications-queued",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  return (
    <form
      onSubmit={setPriceDropReminder}
      className="bg-secondary p-2 w-full flex gap-2 cursor-pointer items-center justify-center"
    >
      {loading ? (
        <Spinner />
      ) : (
        <button type="submit" disabled={!productId || loading} className="flex items-center gap-2">
          <div>
            <Image src={images.bell} alt="Bell" width={20} height={20} />
          </div>
          <div className="text-fs-100 text-white flex">
            Set a price drop reminder
          </div>
        </button>
      )}
    </form>
  );
}
