"use client";
import React, { useEffect, useState } from "react";
import { LoginStatus } from "@/contexts/LoginContext";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialStatus = {
    isLogged: false,
    accessToken: "",
  };
  const [loginStatus, setLoginStatus] = useState(initialStatus);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return;

    setLoginStatus({
      isLogged: true,
      accessToken,
    });
    return () => {
      setLoginStatus(initialStatus);
    };
  }, []);
  return (
    <LoginStatus.Provider value={loginStatus}>{children}</LoginStatus.Provider>
  );
}
