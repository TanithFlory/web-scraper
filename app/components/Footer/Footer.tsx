import Wrapper from "@/app/utils/Wrapper/Wrapper";
import footerData from "./footerData";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-primary">
      <Wrapper className="pb-20">
        <div className="flex gap-4 flex-wrap justify-around pb-8 border-b-2 border-b-secondaryText">
          <div className="max-w-[343px] text-center">
            <div className="text-white">Icon</div>
            <div className="text-secondaryText">
              <p className="text-fs-200">
                {"Don't you dare lift your finger, experience true automation."}
              </p>
            </div>
          </div>
          <div className="flex  justify-center flex-wrap gap-8 max-md:justify-start">
            {footerData.map(({ label, tags }, index) => {
              return (
                <div key={index} className="min-w-[160px]">
                  <div className="text-secondaryText mb-4 text-fs-300 font-bold">
                    {label}
                  </div>
                  <div>
                    <ul className="flex flex-col gap-4 text-fs-200">
                      {tags.map((i, index) => {
                        return (
                          <li
                            className="text-primaryText hover:text-textActive"
                            key={index}
                          >
                            <Link href={i}>{i}</Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex justify-between items-center pt-8 flex-wrap gap-4">
          <Link
            href={"/"}
            className="text-primaryText hover:text-textActive text-fs-200"
          >
            Terms and conditions
          </Link>
          <div className="text-secondaryText text-fs-200">Copyright 2024 T</div>
        </div>
      </Wrapper>
    </footer>
  );
}
