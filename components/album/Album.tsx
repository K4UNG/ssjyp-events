import React from "react";
import BackBtn from "../../components/ui/BackBtn";
import { urlFor } from "../../sanity";
import Image from "next/image";

interface Props {
  data: {
    coverImage: object;
    title: string;
    songs: string[];
    releastDate: string;
  };
}

function Album({ data }: Props) {
  return (
    <div className="grid content-center">
      <BackBtn />
      <div className="sm:grid sm:grid-cols-[1fr_1.3fr] sm:items-center sm:space-x-10">
        <div className="relative aspect-square w-full border-[2px] border-black">
          <Image
            src={urlFor(data.coverImage).url()}
            alt={data.title}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="text-lg mt-4 mb-8 md:text-xl">
          <h1 className="font-bold text-3xl mb-2 md:text-4xl">{data.title}</h1>
          <div className="space-y-1">
            <div>
              <span className="font-bold text-xl">Release Date: </span>
              {data.releastDate}
            </div>
            <div className="font-bold text-xl">Songs:</div>
            <ul className="list-disc">
              {data.songs.map((song) => (
                <li key={song} className="ml-4">
                  {song}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Album;
