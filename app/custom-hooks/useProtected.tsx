import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { LoginStatus } from "../contexts/LoginContext";

export default function useProtected() {
  const router = useRouter();
  const { isLogged } = useContext(LoginStatus);

  useEffect(() => {
    if (typeof isLogged === "undefined") return;

    if (!isLogged) {
      toast.error("You're not logged in! Redirecting...");
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }
  }, [isLogged, router]);

  return {
    Toastify: () => <ToastContainer position="bottom-left" autoClose={2000} />,
  };
}
