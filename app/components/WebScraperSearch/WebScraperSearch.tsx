import images from "@/app/constants/images";
import Image from "next/image";

export default function WebScraperSearch() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] rounded-lg p-[12px] mb-4">
      <div className="flex items-center gap-4">
        <div>
          <Image src={images.search} alt="search" width={25} height={25} />
        </div>
        <div className="w-full">
          <input
            className="bg-transparent outline-none active:outline-none text-fs-200 w-full text-white"
            placeholder="Search a link..."
          />
        </div>
      </div>
    </div>
  );
}
