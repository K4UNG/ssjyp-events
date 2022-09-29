import React from "react";
import { useRouter } from "next/router";

function BackBtn() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center py-px px-4 font-bold border-[2px] border-black w-fit mb-4 hover:bg-black hover:text-white duraiton-100 transition-colors"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 inline-block mr-1"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
        />
      </svg>
      Back
    </button>
  );
}

export default BackBtn;
