"use client";
import images from "@/app/constants/images";
import Image from "next/image";
import RegisterForm from "./RegisterForm";

interface IProps {
  isSignIn?: boolean;
}

export default function Register({ isSignIn }: IProps) {
  return (
    <div className="bg-white flex items-center justify-center rounded-lg px-2 py-8 md:px-8 modal-content gap-8 min-h-[600px] relative">
      <div className="sm:basis-[60%]">
        <RegisterForm isSignIn={isSignIn} />
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
