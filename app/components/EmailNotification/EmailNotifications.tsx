"use client";
import { LoginStatus } from "@/app/contexts/LoginContext";
import useApi from "@/app/custom-hooks/useApi";
import { Product } from "@/types";
import { useContext, useEffect } from "react";
import EmailNotificationCard from "./EmailNotificationCard";
import Spinner from "@/app/utils/Spinner/Spinner";

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
    <div className="p-4 w-full">
      <div className="mb-4 ">
        <h3 className="text-secondary font-bold text-fs-200">
          Control product price drop email notifications.
        </h3>
        <p className="text-fs-100">
          You can queue up to 5 products for price drop notifications.
        </p>
      </div>
      <div className="flex items-center justify-center gap-4 flex-wrap max-w-[650px] mx-auto">
        {data
          ? data.map(({ product }) => {
              return (
                <EmailNotificationCard
                  product={product}
                  key={product.productId}
                />
              );
            })
          : Array.from({ length: 5 }, (_, index) => index).map((_, index) => {
              return (
                <div
                  className="h-[200px] w-[200px] flex items-center justify-center"
                  key={index}
                >
                  <Spinner color="blue" />
                </div>
              );
            })}
      </div>
    </div>
  );
}
