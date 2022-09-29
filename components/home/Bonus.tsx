import React from "react";
import AlbumItem from "../album/AlbumItem";
import Image from "next/image";
import { DataProps } from "../../pages";
import { urlFor } from "../../sanity";

// const data = [
//   {
//     name: "Twice",
//     albums: [
//       {
//         title: "Feel Special",
//         image: "/Feel_Special.jpg",
//         slug: "feel-special",
//       },
//       {
//         title: "Yes or Yes",
//         image: "/YES_or_YES.jpg",
//         slug: "feel-special",
//       },
//       {
//         title: "Eyes Wide Open",
//         image: "/Eyes_Wide_Open.jpg",
//         slug: "eyes-wide-open",
//       },
//     ],
//     logo: "/twice.png",
//   },
//   {
//     name: "Itzy",
//     albums: [
//       {
//         title: "Feel Special",
//         image: "/Feel_Special.jpg",
//         slug: "feel-special",
//       },
//       {
//         title: "Yes or Yes",
//         image: "/YES_or_YES.jpg",
//         slug: "feel-special",
//       },
//     ],
//     logo: "/twice.png",
//   },
// ];

function Bonus({ data }: DataProps) {
  return (
    <div className="mt-8 lg:mt-12 lg:mb-8">
      <h2 className="font-caudex font-bold text-2xl mb-4 lg:text-2.5xl">
        Active Bonus Rewards
      </h2>
      <select className="border border-black px-2 mb-4 font-bold">
        <option>All Groups</option>
        <option>Twice</option>
      </select>

      {data.map((item) => {
        return (
          <div key={item.name} className="mb-8">
            <h3 className="flex font-bold text-2xl items-center mb-2 uppercase">
              {item.name}
              <div className="relative w-8 h-6 ml-1">
                <Image
                  src={urlFor(item.logo).url()}
                  layout="fill"
                  objectFit="contain"
                  alt={item.name}
                />
              </div>
            </h3>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
              {item.albums.map((album) => {
                return (
                  <AlbumItem
                    key={album.title}
                    image={urlFor(album.coverImage).url()}
                    percent={5}
                    slug={album.slug.current}
                    title={album.title}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Bonus;
