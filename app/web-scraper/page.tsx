"use client";
import Image from "next/image";
import Wrapper from "../utils/Wrapper/Wrapper";
import images from "../constants/images";
import WebScraperSearch from "../components/WebScraperSearch/WebScraperSearch";
import WebScraperDashboard from "../components/WebScraperDashboard/WebScraperDashboard";
import { FormEvent, RefObject, useContext, useEffect, useState } from "react";
import { ScrapeData } from "@/types";
import { LoginStatus } from "@/app/contexts/LoginContext";
import RecentScrapes from "../components/RecentScrapes/RecentScrapes";
import "react-toastify/dist/ReactToastify.min.css";
import { toast, ToastContainer } from "react-toastify";
import useApi from "../custom-hooks/useApi";

export default function Page() {
  const [search, setSearch] = useState("");
  const { id, accessToken } = useContext(LoginStatus);
  const { data, isLoading, error, makeRequest } = useApi();

  async function scrapeProduct(e: FormEvent) {
    e.preventDefault();
    const params = { scrapeLink: search, id };
    if (!search) return toast.error("Search is empty...");

    if (!search.includes("amazon.in") && !search.includes("amzn.in")) {
      return toast.error("Please ensure the link is for amazon.in or amzn.in.");
    }

    const options = { headers: { Authorization: `Bearer ${accessToken}` } };

    await makeRequest("/api/protected/scrape", params, options);
  }

  useEffect(() => {
    if (!isLoading) return;

    const id = toast("We are generating your results!", {
      position: "top-right",
      autoClose: 9000,
      hideProgressBar: false,
      closeOnClick: true,
      progress: undefined,
      theme: "light",
    });

    if (error) {
      toast.error("Please try again later, or try a different product!");
    }

    return () => {
      toast.dismiss(id);
    };
  }, [isLoading, error]);

  return (
    <>
      <div className="relative">
        <Image
          src={images.dashboardBg}
          alt="waves"
          className="absolute top-0 left-0 w-screen h-screen"
        />
        <div className=" z-10 bg-[rgba(0,0,0,0.7)] h-screen w-screen absolute"></div>
        <Wrapper className="h-screen relative z-20 text-white pt-0 flex flex-col items-center justify-center">
          <div className="flex items-center justify-center mb-4">
            <h1 className="font-bold text-center text-fs-800 textGradient">
              Accurate results with
              <span className="block text-center">intelligent search.</span>
            </h1>
          </div>
          <div className="mx-auto max-w-[550px] w-full">
            <WebScraperSearch
              setSearch={setSearch}
              search={search}
              onSubmit={scrapeProduct}
            />
            <RecentScrapes />
            <div className="flex flex-col items-center justify-center gap-2">
              <h3 className="text-fs-300 ">Currently Supported</h3>
              <div className="flex items-center">
                <Image
                  src={images.amazon}
                  alt="amazon"
                  width={100}
                  height={100}
                />
                <span className="pb-[5px]">.in</span>
              </div>
            </div>
          </div>
        </Wrapper>
      </div>
      {isLoading || data ? (
        <WebScraperDashboard {...(data as ScrapeData)} isLoading={isLoading} />
      ) : null}
      <ToastContainer position="bottom-left" autoClose={2000} />
    </>
  );
}
