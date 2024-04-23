import images from "@/app/constants/images";
import PrimaryButton from "@/app/utils/PrimaryButton/PrimaryButton";
import Image from "next/image";
import { useState } from "react";

export default function GoogleAuth() {
  const [isLoading, setIsLoading] = useState(false);

  async function initiateAuth() {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/google-auth", {
        method: "GET",
      });
      setIsLoading(false);
      const json = await response.json();

      const popup = window.open(json.url, "popup", "popup=true");

      window.addEventListener("message", (event) => {
        if (event.source !== popup || !popup) return;

        const { accessToken } = event.data;
        console.log(event.data);

        if (accessToken) {
          localStorage.setItem("accessToken", accessToken);
          popup.close();
        }
      });

      if (!popup) return;

      popup.addEventListener("unload", () => {
        const accessToken = new URLSearchParams(
          window.location.hash.substring(1)
        ).get("accessToken");

        if (accessToken) {
          localStorage.setItem("accessToken", accessToken);
        }
      });
    } catch (error) {}
  }

  return (
    <PrimaryButton
      onClick={initiateAuth}
      className="bg-black text-white"
      isLoading={isLoading}
    >
      <Image src={images.google} alt="google" width={35} height={35} />
      <div>Continue with Google</div>
    </PrimaryButton>
  );
}
