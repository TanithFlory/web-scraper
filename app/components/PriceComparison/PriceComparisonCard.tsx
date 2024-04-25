import Link from "next/link";
import images, { Icons } from "@/app/constants/images";
import Image from "next/image";

export default function PrinceComparisonCard({item}:{item:string}) {
  const renderItems = (
    <>
      <div className="h-[35px] flex items-center">
        {Icons?.[item] || (
          <Image src={images[item]} alt={item} width={35} height={35} />
        )}
      </div>
      <div className="text-fs-100">{item}</div>
    </>
  );
  const styles =
    "bg-[#F4F3F1] mb-1 flex flex-col justify-center w-[100px] h-[100px] p-2 rounded-sm items-center cursor-pointer";
  return (item as any).href ? (
    <Link href={""} className={styles}>
      {renderItems}
    </Link>
  ) : (
    <div className={styles}>{renderItems}</div>
  );
}
