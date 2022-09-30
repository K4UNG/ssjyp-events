import React from "react";
import { Data } from "../../pages/albums";
import { urlFor } from "../../sanity";
import Image from "next/image";
import AlbumItem from "./AlbumItem";

interface Props {
  data: Data;
}

function AlbumList({ data }: Props) {
  return (
    <div>
      <div>
        <div className="flex items-center space-x-1 mb-2">
          <h2 className="text-2xl font-bold">{data.name}</h2>
          <div className="relative w-10 aspect-video">
            <Image
              src={urlFor(data.logo).url()}
              alt={data.name}
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
          {data.albums.map((album) => {
            return (
              <AlbumItem
                key={album.slug.current}
                image={urlFor(album.coverImage).url()}
                percent={0}
                slug={album.slug.current}
                title={album.title}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default AlbumList;
