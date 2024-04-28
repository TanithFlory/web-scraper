import images from "@/app/constants/images";
import Image from "next/image";
import { Dispatch, FormEvent, SetStateAction } from "react";

type Props = {
  setSearch: Dispatch<SetStateAction<string>>;
  search: string;
  onSubmit: (e: FormEvent) => void;
};

export default function WebScraperSearch({
  setSearch,
  search,
  onSubmit,
}: Props) {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] rounded-lg p-[12px] mb-4">
      <div className="flex items-center gap-4">
        <div>
          <Image src={images.search} alt="search" width={25} height={25} />
        </div>
        <div className="w-full">
          <form onSubmit={onSubmit}>
            <input
              className="bg-transparent outline-none  text-fs-200 w-full text-white font-bold"
              placeholder="Search a link..."
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
