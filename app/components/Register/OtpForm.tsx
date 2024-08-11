"use client";
import useSubmitForm from "@/app/custom-hooks/useSubmitForm";
import PrimaryButton from "@/app/utils/PrimaryButton/PrimaryButton";
import TextInput from "@/app/utils/TextInput/TextInput";
import { useEffect, useState } from "react";
import ResendOtp from "./ResendOtp";

export default function OtpForm({
  email,
  uuid,
}: {
  email: string;
  uuid: string;
}) {
  const [otp, setOtp] = useState("");
  const { status, loading, submitFormHandler } = useSubmitForm();
  async function onSubmit(e: React.FormEvent) {
    await submitFormHandler({
      e,
      formData: { otp, uuid },
      apiRoute: "/api/auth/verify-otp",
      method: "POST",
    });
  }

  useEffect(() => {
    if (status.success) {
      localStorage.setItem("accessToken", status?.data?.token);
      window.location.reload();
    }
  }, [status.success]);

  return (
    <>
      <form
        className="flex flex-col justify-center max-w-[450px] mx-auto gap-4"
        onSubmit={(e) => onSubmit(e)}
      >
        <div className="font-bold text-fs-200">
          Enter the otp sent to{" "}
          <span className="font-bold text-green">{email}</span>
        </div>
        <TextInput
          type="text"
          name="otp"
          pattern="\d*"
          placeholder="Enter otp..."
          onChangeHandler={function (
            e: React.ChangeEvent<HTMLInputElement>
          ): void {
            setOtp(e.target.value);
          }}
          value={otp}
          maxLength={6}
        />
        <div className="flex items-center justify-center">
          <PrimaryButton
            className={"bg-gradientBackground text-white block"}
            isLoading={loading}
            type="submit"
          >
            Submit
          </PrimaryButton>
        </div>
      </form>
      <ResendOtp email={email} />
    </>
  );
}
