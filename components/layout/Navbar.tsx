import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

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
  const [scroll, setScroll] = useState(false);
  const router = useRouter();

  useEffect(() => {
    function scrollHandler() {
      const progress = document.documentElement.scrollTop;
      if (progress === 0) {
        setScroll(false);
      } else if (progress > 0 && !scroll) {
        setScroll(true);
      }
    }
    window.addEventListener("scroll", scrollHandler);

    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  useEffect(() => {
    if (menu) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [menu]);

  return (
    <div
      className={`border-b duration-200 transition-shadow border-black border-opacity-30 sticky top-0 z-50 ${
        scroll ? "shadow-lg" : ""
      }`}
    >
      <nav
        className={`container p-4 py-3 flex justify-between items-center transition-colors duration-1000 ${
          menu ? "bg-white duration-300" : "bg-body"
        }`}
      >
        <div className="font-bold text-2xl">
          <Link href="/">SSJYP</Link>
        </div>
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
        <div
          className={`absolute w-full top-full left-0 transition-[height] duration-700 ease-in-out overflow-hidden bg-white ${
            menu ? "h-screen" : "h-0"
          }`}
        >
          <ul className="absolute left-1/2 top-1/4 -translate-x-1/2 text-center">
            {links.map((link) => {
              return (
                <li key={link.name} className="my-8">
                  <Link href={link.link}>
                    <a
                      className={`font-dm uppercase text-3xl ${
                        router.pathname === link.link ? "font-bold" : ""
                      }`}
                    >
                      {link.name}
                    </a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
