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
      const json = await response.json();

      const popup = window.open(json.url, "popup", "width=600,height=400");

      if (!popup) return;

      const popupCheckInterval = setInterval(() => {
        if (popup.closed) {
          clearInterval(popupCheckInterval);
          setIsLoading(false);
          console.log("Popup window closed.");
        } else {
          checkPopupUrl(popup, window.location.origin);
        }
      }, 1000); // Check every second
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  function checkPopupUrl(popupWindow: Window, redirectUrl: string) {
    if (popupWindow.location.href.includes(redirectUrl)) {
      const accessToken = new URLSearchParams(popupWindow.location.search).get(
        "access_token"
      );

      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
        popupWindow.close();
        setIsLoading(false);
        console.log("Access token:", accessToken);
      }
    }
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
