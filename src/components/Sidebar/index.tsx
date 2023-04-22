import React from "react";
import { CursorArrowRaysIcon } from "@heroicons/react/20/solid";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ className }: any) => {
  //   const a = useLocation();
  const sidebarRoutes = [
    { to: "/editor", name: "Code Translator" },
    { to: "/ide", name: "Online Compiler" },
    { to: "/code-share", name: "LIVE Code Share" },
  ];
  return (
    <div className={`bg-white px-4 pt-10 space-y-6 ${className}`}>
      {sidebarRoutes.map((i, index) => (
        <SidebarItem key={index} to={i.to} name={i.name} />
      ))}
    </div>
  );
};

export default Sidebar;

const SidebarItem = ({ to, name }: any) => {
  const location = useLocation();
  return (
    <Link to={to}>
      <div
        className={`py-2 px-4 rounded-full cursor-pointer hover:bg-[#EFEFF0] text-lg font-mono my-1 ${
          location.pathname === to && "bg-[#EFEFF0]"
        }`}
      >
        <div className="">{name}</div>
      </div>
    </Link>
  );
};
