import React from "react";
import { NavLink } from "react-router-dom";
import { LINKS } from "../constants";


const navItems = [
  { url: LINKS.search, text: "🔎 All" },
  { url: LINKS.news, text: "📰 News" },
  { url: LINKS.images, text: "📸 Images" },
  { url: LINKS.videos, text: "📺 Videos" },
];

export const Links = () => {
  return (
    <div className="flex sm:justify-around justify-between items-center mt-4">
      {navItems.map(({ url, text }, index) => (
        <NavLink
          key={index}
          to={url}
          className="m-2 mb-0"
          activeClassName="text-blue-700 border-b-2 border-blue-700 dark:text-blue-300 dark:border-blue-400 pb-2"
        >
          {text}
        </NavLink>
      ))}
    </div>
  );
};
