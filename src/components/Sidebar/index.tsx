import React from "react";
import { CursorArrowRaysIcon } from "@heroicons/react/20/solid";
import { Link, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const Sidebar = ({ className }: any) => {
  //   const a = useLocation();
  const sidebarRoutes = [
    { to: "/editor", name: "Code Translator" },
    { to: "/ide", name: "Online Compiler" },
    { to: `/code-share/${uuidv4()}`, name: "LIVE Code Share" },
    {
      to: null,
      name: "Code Explain",
      title: "Get an extensive explanation of any piece of code",
    },
    {
      to: null,
      name: "Component Builder",
      title: "Convert psudo code into React-tailwind component ",
    },
  ];
  return (
    <div
      className={`bg-white px-4 pt-10 flex flex-col space-y-1  ${className}`}
    >
      {sidebarRoutes.map((i, index) => (
        <SidebarItem key={index} to={i.to} name={i.name} title={i.title} />
      ))}
    </div>
  );
};

export default Sidebar;

const SidebarItem = ({ to, name, title }: any) => {
  const location = useLocation();
  return (
    <Link to={to}>
      <div
        title={title}
        className={`py-2 px-4 rounded-full cursor-pointer hover:bg-[#EFEFF0] text-lg font-mono my-1 bg-gray-50  ${
          location.pathname === to && " bg-red-400"
        }`}
      >
        <div className="">{name}</div>
        {to === null && <p className="text-xs text-right">(coming soon)</p>}
      </div>
    </Link>
  );
};
