"use client";
import images from "@/app/constants/images";
import { LoginStatus } from "@/app/contexts/LoginContext";
import useSubmitForm from "@/app/custom-hooks/useSubmitForm";
import Spinner from "@/app/utils/Spinner/Spinner";
import Image from "next/image";
import { useContext } from "react";
import { toast } from "react-toastify";

export default function PriceDropNotification({
  productId,
}: {
  productId: string;
}) {
  const { accessToken } = useContext(LoginStatus);
  const { status, loading, submitFormHandler } = useSubmitForm();

  async function setPriceDropReminder(e: React.FormEvent) {
    if (!productId || !accessToken) return;

    const toastId = toast.loading("Please wait...");
    await submitFormHandler({
      e,
      formData: { productId },
      method: "POST",
      apiRoute: "/api/protected/scrape/notifications-queued",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (status.success) {
      return toast.update(toastId, {
        render: "Successful",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
    }
    toast.update(toastId, {
      render: status.message,
      type: "error",
      isLoading: false,
      autoClose: 2000,
    });
  }

  return (
    <div className="bg-secondary p-2 w-full flex gap-2 cursor-pointer items-center justify-center">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div>
            <Image src={images.bell} alt="Bell" width={20} height={20} />
          </div>
          <form onSubmit={setPriceDropReminder}>
            <button
              type="submit"
              className="text-fs-100 text-white flex"
              disabled={!productId}
            >
              Set a price drop reminder
            </button>
          </form>
        </>
      )}
    </div>
  );
}
