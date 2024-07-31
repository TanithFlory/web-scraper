import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { LoginStatus } from "../contexts/LoginContext";

export default function useProtected() {
  const router = useRouter();
  const { isLogged, setLoginStatus } = useContext(LoginStatus);

  useEffect(() => {
    if (typeof isLogged === "undefined") return;

    if (isLogged) return;

    redirect();
  }, [isLogged, router]);

  function redirect(redirectMessage?: string) {
    toast.error(redirectMessage || "You're not logged in! Redirecting...");
    setTimeout(() => {
      if (setLoginStatus) {
        setLoginStatus((prev) => {
          return {
            ...prev,
            isLogged: false,
          };
        });
      }
      router.push("/");
    }, 2000);
  }

  return {
    redirect,
  };
}
