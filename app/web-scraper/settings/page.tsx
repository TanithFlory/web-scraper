import { Icons } from "@/app/constants/images";
import Wrapper from "@/app/utils/Wrapper/Wrapper";
import React from "react";
import EmailNotifications from "../../components/EmailNotification/EmailNotifications";

interface NavigationItemProps {
  icon: JSX.Element;
  text: string;
}

interface NavigationLabelProps {
  text: string;
  className?: string;
}

function NavigationLabel({ text, className }: NavigationLabelProps) {
  return (
    <label
      className={`${
        className || ""
      } text-fs-100 uppercase text-primary font-bold tracking-wide block`}
    >
      {text}
    </label>
  );
}

function NavigationItem({ icon, text }: NavigationItemProps) {
  return (
    <div className="flex items-center gap-2 hover:bg-[#eeeeee] p-2 rounded-md cursor-pointer text-fs-100">
      <div>{icon}</div>
      <div>{text}</div>
    </div>
  );
}

export default function Page() {
  const sections = [
    {
      label: "General",
      items: [{ icon: Icons.Dashboard, text: "Account Settings" }],
    },
    {
      label: "Scrape Information",
      items: [{ icon: Icons.Notification, text: "Email Notifications" }],
    },
  ];
  const components = {
    EmailNotifications: <EmailNotifications />,
  };
  return (
    <section>
      <Wrapper>
        <div className="bg-white rounded-md min-h-[600px] flex max-md:flex-wrap max-md:justify-center">
          <div className="w-[240px] border-r-2 border-[#E8E8E8] max-md:border-0 p-4">
            <div className="text-fs-200 text-secondary font-bold uppercase tracking-widest mb-4">
              Settings
            </div>
            <nav className="text-fs-200">
              {sections.map(({ label, items }, index) => {
                return (
                  <React.Fragment key={index}>
                    <NavigationLabel text={label} className="mb-2" />
                    {items.map((item, index) => (
                      <div
                        key={index}
                        className="border-b-2 border-b-[#E8E8E8] mb-4 pb-2"
                      >
                        <NavigationItem icon={item.icon} text={item.text} />
                      </div>
                    ))}
                  </React.Fragment>
                );
              })}
            </nav>
          </div>
          <div className="w-full">{components.EmailNotifications}</div>
        </div>
      </Wrapper>
    </section>
  );
}
