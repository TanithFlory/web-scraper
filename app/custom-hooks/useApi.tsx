import { useContext, useState } from "react";
import { LoginStatus } from "../contexts/LoginContext";
import useRedirect from "./useRedirect";

export default function useApi<T>() {
  const [data, setData] = useState<null | T>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isLogged } = useContext(LoginStatus);
  const { redirect } = useRedirect();

  async function makeRequest(url: string, params = {}, options = {}) {
    setIsLoading(true);
    setError(null);
    if (!isLogged) return;
    try {
      const response = await fetchData(url, params, options, redirect);
      if (!response) return;

      setData(response.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      //   setError((err as any).message);
      throw err;
    }
  }

  return { data, isLoading, error, makeRequest };
}

async function fetchData(
  url: string,
  params = {},
  options = {},
  redirect: (message: string) => void
) {
  try {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${url}?${queryString}`, options);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    if (response.headers.get("Clear-Token") === "true") {
      redirect("Issue with access token, please relogin, redirecting...");
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error("Fetch data error:", error);
  }
}
