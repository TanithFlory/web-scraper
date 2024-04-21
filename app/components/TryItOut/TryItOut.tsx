import images from "@/app/constants/images";
import Wrapper from "@/app/utils/Wrapper/Wrapper";
import Image from "next/image";
import Link from "next/link";

export default function TryItOut() {
  return (
    <section className="bg-secondary">
      <Wrapper className="max-w-[900px] pb-20">
        <div className=" text-center">
          <h3 className="text-fs-400 max-w-[800px] font-bold text-primaryText mb-4">
            Discover Effortless Data Gathering: Try Our Web Scraper!
          </h3>
        </div>
        <div className=" text-center">
          <p className="text-fs-300 text-black max-w-[790px]">
            Experience seamless data extraction with our powerful web scraper.
            Say goodbye to manual collection and hello to efficiency. Unlock
            insights instantly – try it now!
          </p>
        </div>
        <div className="flex items-center justify-center gap-4 mt-4">
          <div>
            <Image
              src={images.arrow}
              width={100}
              height={100}
              alt="arrow"
              className="rotate-[9deg]"
            />
          </div>
          <Link
            href={"/web-scraper"}
            className="rounded-md p-4 flex items-center justify-center font-bold text-fs-200 text-black bg-white h-[45px] w-[150px] hover:bg-primary cursor-pointer hover:text-primaryText transition-all duration-500 ease-in-out"
          >
            Try out!
          </Link>
        </div>
      </Wrapper>
    </section>
  );
}
