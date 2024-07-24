"use client";
import React, { useEffect, useState } from "react";
import { LoginStatus } from "@/contexts/LoginContext";
import decodeJwt from "@/utility-functions/decodeJwt";
import { JwtPayload } from "@/types";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialStatus = {
    isLogged: false,
    accessToken: "",
    id: "",
  };
  const [loginStatus, setLoginStatus] = useState(initialStatus);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return;

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
