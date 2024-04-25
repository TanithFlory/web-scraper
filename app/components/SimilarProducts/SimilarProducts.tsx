import DashboardCard from "@/app/utils/Dashboard/DashboardCard";
import DashboardCardTitle from "@/app/utils/Dashboard/DashboardCardTitle";
import Image from "next/image";
import Link from "next/link";

const dummy_data = [
  {
    title: "Aqara Roller Shade Driver E1",
    img: "https://m.media-amazon.com/images/I/51qfqaJsFyL._SX679_.jpg",
  },
  {
    title: "Aqara Smart Video Doorbell G4",
    img: "https://m.media-amazon.com/images/I/61VOM8uRs-L._SX679_.jpg",
  },
  {
    title: "Aqara Smart Smoke Detector",
    img: "https://m.media-amazon.com/images/I/51Pz76kejuL._SX679_.jpg",
  },
  {
    title:
      "Aqara Smart Hub M2, Smart Home Bridge For Alarm System, IR Remote Control, Home Automation, Supports Alexa, Google Assistant, Apple HomeKit And IFTTT",
    img: "https://m.media-amazon.com/images/I/61jb2d7B3-S._SX679_.jpg",
  },
  {
    title:
      "Aqara Temperature and Humidity Sensor, REQUIRES AQARA HUB, Zigbee, for Remote Monitoring and Home Automation, Wireless Thermometer Hygrometer, Compatible with Apple HomeKit, Alexa, Works with IFTTT",
    img: "https://m.media-amazon.com/images/I/31SP+6B2UqL.jpg",
  },
];

export default function SimilarProducts() {
  return (
    <DashboardCard className="overflow-y-scroll">
      <DashboardCardTitle
        title="Similar Products"
        description="Products that are related to this."
      />
      <div className="flex flex-col gap-1">
        {dummy_data.map(({ title, img }, index) => (
          <Link
            href={title}
            className="flex gap-2 border-b-[1px] pb-1 items-center"
            key={index}
          >
            <Image width={50} height={50} src={img} alt={title} />
            <div className="text-fs-100">
              {title.length > 15 ? `${title.slice(0, 15)}` : title}
            </div>
          </Link>
        ))}
      </div>
    </DashboardCard>
  );
}
