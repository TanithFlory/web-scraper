"use client";
import { LoginStatus } from "@/app/contexts/LoginContext";
import useApi from "@/app/custom-hooks/useApi";
import { Product } from "@/types";
import { useContext, useEffect } from "react";
import EmailNotificationCard from "./EmailNotificationCard";

interface Data {
  product: Product;
}

export default function EmailNotifications() {
  const { data, isLoading, error, makeRequest } = useApi<Data[]>();
  const { id, accessToken } = useContext(LoginStatus);

  async function getNotifications() {
    const params = { id };

    const options = { headers: { Authorization: `Bearer ${accessToken}` } };

    await makeRequest(
      "/api/protected/scrape/notifications-queued",
      params,
      options
    );
  }

  useEffect(() => {
    if (id) {
      getNotifications();
    }
  }, [id]);
  return (
    <div className="p-4">
      <div className="mb-4 ">
        <h3 className="text-secondary font-bold text-fs-200">
          Control product price drop email notifications.
        </h3>
        <p className="text-fs-100">You can queue up to 5 products for price drop notifications.</p>
      </div>
      <div>
        {data &&
          data.map(({ product }, index) => {
            return <EmailNotificationCard product={product} key={index} />;
          })}
      </div>
    </div>
  );
}
