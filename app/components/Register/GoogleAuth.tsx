import images from "@/app/constants/images";
import Image from "next/image";

export default function GoogleAuth() {
  async function initiateAuth() {
    try {
      const response = await fetch("/api/auth/google-auth", {
        method: "GET",
      });

      const json = await response.json();

      const popup = window.open(json.url, "popup", "popup=true");
      const checkPopupLocation = setInterval(() => {
        console.log(popup?.location.href);
        if (popup && popup.location.href.includes("accessToken")) {
          clearInterval(checkPopupLocation);

          const accessToken = new URLSearchParams(
            popup.location.href.split("?")[1]
          ).get("accessToken");

          if (accessToken) {
            localStorage.setItem("accessToken", accessToken);
          }

          popup.close();
        }
      }, 1000);
    } catch (error) {}
  }

  return (
    <div
      onClick={initiateAuth}
      className="px-4 py-2 bg-black rounded-md text-white cursor-pointer hover:scale-[1.01] transition-all duration-500 ease-in-out flex items-center gap-2 justify-center text-fs-200"
    >
      <Image src={images.google} alt="google" width={35} height={35} />
      <div>Continue with Google</div>
    </div>
  );
}
