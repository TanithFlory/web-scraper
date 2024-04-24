"use client";
import images from "@/app/constants/images";
import useSubmitForm from "@/app/custom-hooks/useSubmitForm";
import TextInput from "@/app/utils/TextInput/TextInput";
import Image from "next/image";
import React, { useState } from "react";
import GoogleAuth from "./GoogleAuth";
import PrimaryButton from "@/app/utils/PrimaryButton/PrimaryButton";

interface IProps {
  isSignIn?: boolean;
}

export default function Register({ isSignIn }: IProps) {
  const [signIn, setSignIn] = useState(isSignIn || false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { status, loading, submitFormHandler } = useSubmitForm(
    formData,
    `/api/auth/${isSignIn ? "signin" : "signup"}`,
    "POST"
  );
  const inputFields = [
    { label: "Email", type: "text" },
    { label: "Password", type: "password" },
    { label: "Confirm Password", type: "password", condition: signIn },
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

  return (
    <div className="bg-white flex items-center justify-center rounded-lg px-2 py-8 md:px-8 modal-content gap-8">
      <div className="sm:basis-[60%]">
        <div className="flex items-center gap-1 mb-8">
          <Image
            src={images.logo}
            width={150}
            height={150}
            className="h-[50px]"
            alt="scrap-io-logo"
          />
          <h2 className="font-bold text-fs-400 text-secondaryText">Scrap Io</h2>
        </div>
        <form
          className="flex flex-col justify-center max-w-[450px] mx-auto gap-8"
          onSubmit={submitFormHandler}
        >
          <div className="font-bold text-fs-200">
            {signIn ? "Sign Up" : "Sign In"}
          </div>
          {inputFields.map(
            ({ condition, label, type }, index) =>
              (condition || condition === undefined) && (
                <div key={index}>
                  <div className="font-bold text-fs-100 mb-2">{label}</div>
                  <TextInput
                    onChangeHandler={onChangeHandler}
                    type={type}
                    name={label.toLowerCase()}
                  />
                </div>
              )
          )}
          <div className="flex items-center gap-2">
            <input type="checkbox" />
            <div className="text-fs-100">I agree to terms and conditions.</div>
          </div>
          <div className="flex items-center justify-center">
            <PrimaryButton
              className={"bg-gradientBackground text-white"}
              isLoading={loading}
            >
              Submit
            </PrimaryButton>
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
      </div>
      <div className="hidden lg:block">
        <Image
          src={images.register}
          width={600}
          height={600}
          alt="register-picture"
        />
      </div>
    </div>
  );
}
