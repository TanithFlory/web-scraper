import Image, { StaticImageData } from "next/image";
import images from "@/app/constants/images";

interface IProps {
  title: string;
  description: string;
  image: StaticImageData | string;
}

export default function MoreInfoCard({ title, description, image }: IProps) {
  return (
    <div className="p-8 bg-cardColor max-w-[480px] h-[256px] flex flex-col gap-2 rounded-md">
      <div>
        <Image
          src={images[image as string]}
          width={50}
          height={50}
          alt={title}
        />
      </div>
      <h3 className="text-primaryText text-fs-300 font-bold">{title}</h3>
      <div>
        <p className="text-secondaryText text-fs-200">{description}</p>
      </div>
    </div>
  );
}
