import webScrap from "../../public/assets/web-scrap.svg";
import webScrapIcon from "../../public/assets/scraping.svg";
import automation from "../../public/assets/automation.svg";
import migration from "../../public/assets/migration.svg";
import extensions from "../../public/assets/extensions.svg";
import arrow from "../../public/assets/arrow.svg";
import { StaticImageData } from "next/image";
import logo from "../../public/assets/logo.svg";
import register from "../../public/assets/register.svg";
import google from "../../public/assets/google.svg";
import dashboardBg from "../../public/assets/dashboard-bg.png";
import search from "../../public/assets/search.svg";
import amazon from "../../public/assets/amazon.png";
import recent from "../../public/assets/recent.svg";
import bell from "../../public/assets/bell.svg";
import { SiFlipkart } from "react-icons/si";
import Croma from "../../public/assets/Croma.svg";
import Ajio from "../../public/assets/ajio.svg";
import Myntra from "../../public/assets/myntra.svg";
import { MdReviews } from "react-icons/md";
import { MdDashboard } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";

const images: Record<string, StaticImageData | string> = {
  webScrap,
  webScrapIcon,
  automation,
  migration,
  extensions,
  arrow,
  logo,
  register,
  google,
  dashboardBg,
  search,
  amazon,
  recent,
  bell,
  Croma,
  Myntra,
  Ajio,
};

export const Icons: Record<string, JSX.Element> = {
  Flipkart: <SiFlipkart className="fill-[#FFDF00] bg-[#2874F0]" />,
  MdReviews: <MdReviews />,
  Dashboard: <MdDashboard className="w-[25px] h-[25px] fill-secondary"/>,
  Notification:<IoIosNotifications className="w-[25px] h-[25px] fill-secondary"/>
};

export default images;
