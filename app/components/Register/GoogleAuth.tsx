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
    <div
      onClick={initiateAuth}
      className="px-4 py-2 bg-black rounded-md text-white cursor-pointer hover:scale-[1.01] transition-all duration-500 ease-in-out flex items-center gap-2 justify-center text-fs-200"
    >
      <Image src={images.google} alt="google" width={35} height={35} />
      <div>Continue with Google</div>
    </div>
  );
}
