import React from "react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  image: string;
  title: string;
  percent: number;
  slug: string;
}

function AlbumItem({ image, title, percent, slug }: Props) {
  return (
    <Link href={"/album/" + slug} passHref={true}>
      <a className="border-[2px] border-black relative bg-white group">
        {percent !== 0 && (
          <div className="absolute font-bold bg-white top-0 left-0 z-10 leading-0 px-2 border-b border-r border-black font-caudex text-sm">
            {percent + " %"}
          </div>
        )}
        <div className="relative aspect-square">
          <Image
            src={image}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="hover:scale-105 duration-200 transition-transform group-focus-visible:scale-105"
            priority={true}
          />
        </div>
        <div className="border-t-[2px] border-black px-2 py-1">
          <h3 className="font-bold text-sm">{title}</h3>
        </div>
      </a>
    </Link>
  );
}

export default AlbumItem;
