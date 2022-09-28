import Link from "next/link";
import React, { useState } from "react";

const links = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Groups",
    link: "/groups",
  },
  {
    name: "Albums",
    link: "/albums",
  },
];

function Navbar() {
  const [menu, setMenu] = useState(false);

  return (
    <div className="border-b border-inherit">
      <nav className="container p-4 py-3 flex justify-between items-center">
        <div className="font-bold text-2xl">SSJYP</div>
        <ul className="hidden">
          {links.map((link) => {
            return (
              <li key={link.name}>
                <Link href={link.link}>{link.name}</Link>
              </li>
            );
          })}
        </ul>
        <button
          className="w-7 h-5 relative"
          onClick={() => setMenu((prev) => !prev)}
        >
          <span
            className={`absolute w-full h-[3px] bg-black rounded-full left-0 top-0 transition-transform duration-150 origin-left ${
              menu ? "rotate-45" : ""
            }`}
          />
          <span
            className={`absolute w-full h-[3px] bg-black rounded-full left-0 top-1/2 -translate-y-1/2 origin-center duration-150 transition-[transform_opacity]   ${
              menu ? "scale-x-0 opacity-0" : ""
            }`}
          />
          <span
            className={`absolute w-full h-[3px] bg-black rounded-full left-0 bottom-0 transition-transform duration-15- origin-left ${
              menu ? "-rotate-45 translate-y-[.2rem]" : ""
            }`}
          />
        </button>
      </nav>
    </div>
  );
}

export default Navbar;
