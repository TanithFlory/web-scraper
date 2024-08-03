import { LoginStatus } from "@/app/contexts/LoginContext";
import useSubmitForm from "@/app/custom-hooks/useSubmitForm";
import { useContext } from "react";
import Image from "next/image";
import images from "@/app/constants/images";

export default function PriceDropReminderButton({
  productId,
  text,
  isTable,
}: {
  productId: string;
  text: string;
  isTable?: boolean;
}) {
  const { accessToken } = useContext(LoginStatus);
  const { loading, submitFormHandler } = useSubmitForm();
  async function setPriceDropReminder(e: React.FormEvent, productId: string) {
    console.log("clicked")
    e.preventDefault();
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
    <button
      type="submit"
      disabled={!productId || loading}
      onClick={(e) => setPriceDropReminder(e, productId)}
      className="flex items-center gap-2"
    >
      {!isTable ? (
        <div>
          <Image src={images.bell} alt="Bell" width={20} height={20} />
        </div>
      ) : null}
      <div className="text-fs-100 text-white flex">{text}</div>
    </button>
  );
}
