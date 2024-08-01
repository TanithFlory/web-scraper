import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function useRedirect() {
  const router = useRouter();

  function redirect(redirectMessage?: string) {
    toast.error(redirectMessage || "You're not logged in! Redirecting...");
    localStorage.removeItem("accessToken");
    setTimeout(() => {
      router.push("/");
    }, 2500);
  }

  return { redirect };
}
