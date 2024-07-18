import TextInput from "@/app/utils/TextInput/TextInput";
import PrimaryButton from "@/app/utils/PrimaryButton/PrimaryButton";
import GoogleAuth from "./GoogleAuth";
import { useEffect, useState } from "react";
import useSubmitForm from "@/app/custom-hooks/useSubmitForm";
import OtpForm from "./OtpForm";
import Title from "@/app/utils/Title/Title";

interface IProps {
  isSignIn?: boolean;
}

export default function RegisterForm({ isSignIn }: IProps) {
  const [signIn, setSignIn] = useState(isSignIn);
  const [otpForm, setOtpForm] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { status, loading, submitFormHandler } = useSubmitForm();

  const inputFields = [
    { label: "Email", type: "text" },
    { label: "Password", type: "password" },
    { label: "Confirm Password", type: "password", condition: !signIn },
  ];

  function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [target.name]: target.value,
      };
    });
  }

  useEffect(() => {
    let otpTimeout: NodeJS.Timeout;
    let loginTimeout: NodeJS.Timeout;
    if (status.success && !signIn) {
      otpTimeout = setTimeout(() => {
        setOtpForm(true);
      }, 1500);
    } else {
      loginTimeout = setTimeout(() => {
        localStorage.setItem("accessToken", status.data?.token);
        window.location.reload();
      }, 1500);
    }

    return () => {
      clearTimeout(otpTimeout);
      clearTimeout(loginTimeout);
    };
  }, [status]);

  if (otpForm) {
    return <OtpForm email={formData.email} id={status.data?.id} />;
  }

  return (
    <form
      className="flex flex-col justify-center max-w-[450px] mx-auto gap-4"
      onSubmit={(e) =>
        submitFormHandler({
          e,
          formData,
          apiRoute: `/api/auth/${isSignIn ? "signin" : "signup"}`,
          method: "POST",
        })
      }
    >
      <Title text={signIn ? "Sign Up" : "Sign In"} />
      {inputFields.map(({ condition, label, type }, index) => {
        const name = label.toLowerCase();
        return (
          (condition || condition === undefined) && (
            <div key={index}>
              <div className="font-bold text-fs-100 mb-2">{label}</div>
              <TextInput
                onChangeHandler={onChangeHandler}
                type={type}
                name={name}
                value={(formData as any)[name]}
              />
            </div>
          )
        );
      })}
      <div className="flex items-center gap-2">
        <input type="checkbox" />
        <div className="text-fs-100">I agree to terms and conditions.</div>
      </div>
      <div className="flex items-center justify-center flex-col">
        <PrimaryButton
          className={"bg-gradientBackground text-white block"}
          isLoading={loading}
          type="submit"
        >
          Submit
        </PrimaryButton>
        <div
          className={`${
            status.success ? "text-green" : "text-red"
          } text-fs-100 text-center mt-2`}
        >
          {status.message}
        </div>
      </div>

      <div
        className={`relative text-center after:absolute after:content-[""] after:h-[1px] after:w-[50%] after:bg-[#DDDFE1] after:top-[50%] after:right-[-10px] before:absolute before:content-[""] before:h-[1px] before:w-[50%] before:bg-[#DDDFE1] before:top-[50%] before:left-[-10px]`}
      >
        or
      </div>
      <div className="flex items-center justify-center">
        <GoogleAuth />
      </div>
      <div className="text-fs-100">
        {signIn ? "Don't have an account? " : "Already have an account? "}
        <span
          className="font-bold text-secondary cursor-pointer"
          onClick={() => setSignIn((prev) => !prev)}
        >
          {signIn ? "Sign In" : "Sign Up"}
        </span>
      </div>
    </form>
  );
}
