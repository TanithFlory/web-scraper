"use client";
import Image from "next/image";
import Wrapper from "../utils/Wrapper/Wrapper";
import images from "../constants/images";
import WebScraperSearch from "../components/WebScraperSearch/WebScraperSearch";
import WebScraperDashboard from "../components/WebScraperDashboard/WebScraperDashboard";
import { FormEvent, useState } from "react";
import { ScrapeData } from "@/types";

export default function Page() {
  const [search, setSearch] = useState("");
  const [productDetails, setProductDetails] = useState<ScrapeData>();

  async function scrapeProduct(e: FormEvent) {
    e.preventDefault();
    try {
      const response = await fetch(
        `/api/protected/scrape?${new URLSearchParams({
          scrapeLink: search,
        })}`,
        {
          method: "GET",
        }
      );
      const json = await response.json();

      setProductDetails(json.data);
    } catch (error) {}
  }

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
            <div className="flex items-center gap-4 mb-4">
              <Image
                src={images.recent}
                alt="recent_searches"
                width={20}
                height={20}
              />
              <div className="flex gap-2 items-center text-fs-200">
                {["iPhone 15", "S23"].map((item, index) => {
                  return (
                    <div
                      className="bg-[rgba(255,255,255,0.4)] py-1 px-2 rounded-full hover:bg-[rgba(255,255,255,0.3)] cursor-pointer"
                      key={index}
                    >
                      {item}
                    </div>
                  );
                })}
              </div>
            </div>
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
      <WebScraperDashboard {...(productDetails as ScrapeData)} />
    </>
  );
}
