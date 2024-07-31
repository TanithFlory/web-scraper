import { ILoginStatus } from "@/types";
import { createContext } from "react";

export const LoginStatus = createContext<ILoginStatus>({
  isLogged: undefined,
  accessToken: "",
  id: "",
  setLoginStatus: null,
});
