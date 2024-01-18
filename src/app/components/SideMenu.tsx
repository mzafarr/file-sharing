"use client";
import { UserButton } from "@clerk/nextjs";
import Logo from "../utils/logo";
import { Contact, Upload, File } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
// import { User } from "@clerk/nextjs/server";
// { user }: { user: User | null }
export function SideMenu() {
  const [activeItem, setActiveItem] = useState(1);
  const router = useRouter();
  const menuList = [
    {
      id: 1,
      name: "Upload",
      icon: <Upload />,
      path: "/upload",
    },
    {
      id: 2,
      name: "Files",
      icon: <File />,
      path: "/files",
    },
    {
      id: 3,
      name: "About Us",
      icon: <Contact />,
      path: "/",
    },
    {
      id: 4,
      name: "Contact Us",
      icon: <Contact />,
      path: "/",
    },
  ];

  const handleNavigation = (item: any) => {
    setActiveItem(item.id);
    router.push(item.path);
  };

  return (
    <div className="text-black flex h-screen flex-col justify-between border-e bg-white w-1/5">
      <div className="px-2 sm:px-4 py-6">
        <span className="flex justify-start items-center gap-2 place-content-center">
          <span className="hidden sm:flex">
            <Logo />
          </span>
          <span className="text-2xl sm:text-[36px] font-bold text-violet-600">
            {" "}
            CF.
          </span>
        </span>
        <ul className="mt-6 space-y-1">
          {menuList.map((item: any) => (
            <li key={item.id} onClick={() => handleNavigation(item)}>
              <a
                href=""
                className={`flex items-center gap-2 rounded-lg hover:bg-gray-100 p-2 text-sm font-medium text-gray-700 ${
                  activeItem == item.id
                    ? "bg-violet-50 hover:bg-violet-50 text-violet-600"
                    : ""
                }`}
              >
                {item.icon}
                <span className="hidden sm:flex">{item.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
        <a
          href="#"
          className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50"
        >
          <UserButton afterSignOutUrl="/" />
          <div>
            <strong className="hidden sm:block">View Profile</strong>
          </div>
        </a>
      </div>
    </div>
  );
}
