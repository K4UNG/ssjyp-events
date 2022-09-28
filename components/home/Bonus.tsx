import React from "react";
import AlbumItem from "../album/AlbumItem";
import Image from "next/image";

const data = [
  {
    name: "Twice",
    albums: [
      {
        title: "Feel Special",
        image: "/Feel_Special.jpg",
        slug: "feel-special",
      },
      {
        title: "Yes or Yes",
        image: "/YES_or_YES.jpg",
        slug: "feel-special",
      },
      {
        title: "Eyes Wide Open",
        image: "/Eyes_Wide_Open.jpg",
        slug: "eyes-wide-open",
      },
    ],
    logo: "/twice.png",
  },
  {
    name: "Itzy",
    albums: [
      {
        title: "Feel Special",
        image: "/Feel_Special.jpg",
        slug: "feel-special",
      },
      {
        title: "Yes or Yes",
        image: "/YES_or_YES.jpg",
        slug: "feel-special",
      },
    ],
    logo: "/twice.png",
  },
];

function Bonus() {
  return (
    <div className="mt-8">
      <h2 className="font-caudex font-bold text-2xl mb-4">
        Active Bonus Rewards
      </h2>
      <select className="border border-black px-2 mb-4">
        <option>All Groups</option>
        <option>Twice</option>
      </select>

      {data.map((item) => {
        return (
          <div key={item.name} className="mb-8">
            <h3 className="flex font-bold text-2xl items-center mb-2">
              {item.name}
              <div className="relative w-8 h-6 ml-1">
                <Image
                  src={item.logo}
                  layout="fill"
                  objectFit="contain"
                  alt={item.name}
                />
              </div>
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {item.albums.map((album) => {
                return (
                  <AlbumItem
                    key={album.title}
                    image={album.image}
                    percent={5}
                    slug={album.slug}
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
