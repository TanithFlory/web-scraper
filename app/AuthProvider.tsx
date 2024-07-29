"use client";
import React, { useEffect, useState } from "react";
import { LoginStatus } from "@/app/contexts/LoginContext";
import decodeJwt from "@/app/utility-functions/decodeJwt";
import { ILoginStatus, JwtPayload } from "@/types";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialStatus = {
    isLogged: undefined,
    accessToken: "",
    id: "",
  };
  const [loginStatus, setLoginStatus] = useState<ILoginStatus>(initialStatus);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      return setLoginStatus((prev) => {
        return { ...prev, isLogged: false };
      });
    }

    const payload: JwtPayload = decodeJwt(accessToken);

    setLoginStatus({
      isLogged: true,
      accessToken,
      id: payload.id,
    });

    return () => {
      setLoginStatus(initialStatus);
    };
  }, []);
  return (
    <LoginStatus.Provider value={loginStatus}>{children}</LoginStatus.Provider>
  );
}
