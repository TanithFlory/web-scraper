import { createContext } from "react";

export const LoginStatus = createContext({
  isLogged: false,
  accessToken: "",
});
