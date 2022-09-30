import React from "react";

function Footer() {
  return (
    <footer className="bg-white border-t-[2px] border-black text-center py-6 font-caudex">
      <div>
        Designed and developed by{" "}
        <a
          className="underline"
          href="https://www.facebook.com/kgzin.hein.71/"
          rel="noreferrer"
          target="_blank"
        >
          Kaung Zin Hein
        </a>
      </div>
      <a className="underline" href="mailto:kgzinhein.my@gmail.com">
        kgzinhein.my@gmail.com
      </a>
    </footer>
  );
}

export default Footer;
