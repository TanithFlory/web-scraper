"use client";
import images from "@/app/constants/images";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";

export default function WebScraperSearch() {
  const ref = useRef(null);
  const tl = gsap.timeline();
  gsap.registerPlugin(useGSAP);
  const [trigger, setTrigger] = useState(false);
  useGSAP(
    () => {
      if (trigger) {
        const element = document.querySelector(".gsap-search-top");
        if (!element) return;
        const y = element?.getBoundingClientRect().y;
        const animatePx = y + 96 - window.innerHeight;
        tl.to(".gsap-search-ref", { opacity: 0, ease: "power2.inOut" });
        tl.to(".gsap-search-top", {
          y: animatePx,
        });
      }
    },
    { dependencies: [trigger] }
  );

  function submitHandler(e: React.FormEvent) {
    e.preventDefault();
    setTrigger(true);
  }

  return (
    <div
      className="bg-[rgba(255,255,255,0.1)] rounded-lg p-[12px] mb-4 "
      ref={ref}
    >
      <div className="flex items-center gap-4 ">
        <div>
          <Image src={images.search} alt="search" width={25} height={25} />
        </div>
        <div className="w-full">
          <form onSubmit={submitHandler}>
            <input
              className="bg-transparent outline-none  text-fs-200 w-full text-white font-bold"
              placeholder="Search a link..."
            />
          </form>
        </div>
      </div>
    </div>
  );
}
