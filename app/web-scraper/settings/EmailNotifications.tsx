"use client";
import { LoginStatus } from "@/app/contexts/LoginContext";
import useApi from "@/app/custom-hooks/useApi";
import { useContext, useEffect } from "react";

export default function EmailNotifications() {
  const { data, isLoading, error, makeRequest } = useApi();
  const { id, accessToken } = useContext(LoginStatus);

  async function getNotifications() {
    const params = { id };

    const options = { headers: { Authorization: `Bearer ${accessToken}` } };

    await makeRequest("/api/protected/scrape", params, options);
  }

  useEffect(() => {
    if (id) {
      getNotifications();
    }
  }, [getNotifications]);
  return (
    <div>
      <div>You can queue up to 5 products for price drop notifications.</div>
      <div></div>
    </div>
  );
}
