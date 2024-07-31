"use client";
import React, { useState, ReactNode, useEffect } from "react";
import { ILoginStatus } from "@/types";
import decodeJwt from "./utility-functions/decodeJwt";
import { LoginStatus } from "./contexts/LoginContext";

const initialStatus = {
  isLogged: undefined,
  accessToken: "",
  id: "",
  setLoginStatus: null,
};

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [loginStatus, setLoginStatus] = useState<ILoginStatus>(initialStatus);

  useEffect(() => {
    let accessToken = null;
    const localStorageToken = localStorage.getItem("accessToken");
    const urlParams = new URLSearchParams(window.location.search);
    const searchParamsToken = urlParams.get("accessToken");

    accessToken = searchParamsToken || localStorageToken;

    if (!accessToken) {
      return setLoginStatus((prev) => {
        return { ...prev, isLogged: false };
      });
    }

    const payload = decodeJwt(accessToken);

    if (!payload) {
      return setLoginStatus((prev) => {
        return { ...prev, isLogged: false };
      });
    }
    if (searchParamsToken) {
      localStorage.setItem("accessToken", searchParamsToken);
    }
    setLoginStatus({
      isLogged: true,
      accessToken,
      id: payload.uuid,
      setLoginStatus,
    });

    return () => {
      setLoginStatus(initialStatus);
    };
  }, []);
  return (
    <LoginStatus.Provider value={loginStatus}>{children}</LoginStatus.Provider>
  );
}
