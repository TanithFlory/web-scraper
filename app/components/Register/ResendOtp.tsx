import useSubmitForm from "@/app/custom-hooks/useSubmitForm";
import PrimaryButton from "@/app/utils/PrimaryButton/PrimaryButton";
import Spinner from "@/app/utils/Spinner/Spinner";

export default function ResendOtp({ email }: { email: string }) {
  const { status, loading, submitFormHandler } = useSubmitForm();
  async function resendOtp(e: React.FormEvent) {
    await submitFormHandler({
      e,
      formData: { email },
      apiRoute: "/api/auth/resend-otp",
      method: "POST",
    });
  }
  return (
    <>
      <form
        onSubmit={(e) => resendOtp(e)}
        className="flex items-center justify-center mx-auto p-2 mt-4 text-white text-center  rounded-md cursor-pointer bg-gradientBackground w-[110px] text-fs-200"
      >
        {loading ? (
          <Spinner />
        ) : (
          <PrimaryButton
            className={"bg-gradientBackground text-white block !h-[25px]"}
            isLoading={loading}
            type="submit"
          >
            Resend OTP
          </PrimaryButton>
        )}
      </form>
      {!loading ? (
        <div
          className={`text-center mt-2 ${
            status.success ? "text-green" : "text-red"
          }`}
        >
          {status.message}
        </div>
      ) : null}
    </>
  );
}
