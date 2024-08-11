import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

const dropDownLinks = [
  {
    href: "/web-scraper",
    title: "Web Scraper",
  },
  {
    href: "/web-scraper/dashboard",
    title: "Recent Scrapes",
  },
  {
    href: "/web-scraper/settings",
    title: "Settings",
  },
  {
    title: "Logout",
  },
];

export default function DropDown({
  setIsDropdownOpen,
}: {
  setIsDropdownOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsDropdownOpen(false);
    window.location.href = "/";
  };

  return (
    <div className="absolute right-0 w-40 pt-2 text-fs-100 space-y-2">
      {dropDownLinks.map(({ href, title }, index) => {
        return title === "Logout" ? (
          <button
            key={index}
            className={`block w-full px-4 py-2 text-left text-white bg-secondary hover:bg-cardColor rounded-md`}
            onClick={handleLogout}
          >
            {title}
          </button>
        ) : (
          <Link
            href={href as string}
            key={index}
            className={`block px-4 py-2 text-white bg-secondary hover:bg-cardColor rounded-md`}
            onClick={() => setIsDropdownOpen(false)}
          >
            {title}
          </Link>
        );
      })}
    </div>
  );
}
