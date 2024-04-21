import images from "@/app/constants/images";
import Image from "next/image";
import Wrapper from "@/app/utils/Wrapper/Wrapper";

export default function Header() {
  return (
    <header>
      <Wrapper>
        <div className="flex items-center justify-center">
          <h1 className="text-lh-custom font-bold tracking-tight text-center textGradient">
            <span className="text-secondary block">
              On demand web scraping{" "}
            </span>
            tailored to your needs.
          </h1>
        </div>
        <div>
          <Image
            src={images.webScrap}
            alt="web-scraper"
            width={1200}
            height={1200}
          />
        </div>
      </Wrapper>
    </header>
  );
}
