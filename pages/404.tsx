import React from "react";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";

const NotFoundPage: NextPage = () => {
  const router = useRouter();
  return (
    <div className="min-h-[80vh] grid place-items-center">
      <div className="p-4 text-center font-dm">
        <h1 className="font-bold text-3xl">404 | Page Not Found</h1>
        <button
          className="border-[2px] border-black px-4 mt-4 hover:bg-black hover:text-white focus-visible:bg-black focus-visible:text-white duration-100 transition-colors"
          onClick={() => router.back()}
        >
          Go Back
        </button>
        <p className="my-4">
          I&apos;m gonna make this simple for you. Turn around right now! You
          got two choices.
        </p>
        <div className="relative aspect-square w-full max-w-xs border-[2px] border-black mx-auto">
          <Image
            src="/momo.jpg"
            alt="mom pointing gun at you"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
