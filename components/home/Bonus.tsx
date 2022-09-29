import React, { useState } from "react";
import AlbumItem from "../album/AlbumItem";
import Image from "next/image";
import { DataProps } from "../../pages";
import { urlFor } from "../../sanity";
import { isBirthday, isBonus } from "../../util/util";

function Bonus({ data }: DataProps) {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [group, setGroup] = useState("all");

  const groups = data.map((d) => d.name);

  return (
    <div className="mt-8 lg:mt-12 lg:mb-8">
      <h2 className="font-caudex font-bold text-2xl mb-4 lg:text-2.5xl">
        Active Bonus Rewards
      </h2>
      <select
        value={group}
        onChange={(e) => setGroup(e.target.value)}
        className="border border-black px-2 mb-2 font-dm"
      >
        <option value="all">All Groups</option>
        {groups.map((group) => (
          <option key={group} value={group}>
            {group}
          </option>
        ))}
      </select>
      <br className="md:hidden" />
      <label htmlFor="date" className="font-bold md:ml-4">
        Choose a date:{" "}
      </label>
      <br className="md:hidden" />
      <input
        value={date}
        onChange={(e) => setDate(e.target.value)}
        type="date"
        id="date"
        className="border border-black px-2 mb-4 font-dm"
      />

      {data.map((item) => {
        if (group !== "all" && group !== item.name) return;
        const birthdays = isBirthday(item.artists, date);
        const bonus = isBonus(item.albums, date);
        let birthdayBonus: string[] = [];
        if (birthdays.length > 0) {
          item.albums.forEach((album) => {
            birthdayBonus.push(album.title);
          });
        }
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
              {bonus.length === 0 && birthdayBonus.length === 0 && (
                <div className="font-bold text-lg col-span-full">
                  No Active Bonus Reward
                </div>
              )}
              {item.albums.map((album) => {
                const title = album.title;
                let percent = 0;

                let count = 0;
                birthdayBonus.forEach((b) => {
                  if (b === title) {
                    count++;
                  }
                });

                const check = bonus.indexOf(title);
                if (check === -1) {
                  if (birthdayBonus.indexOf(title) === -1) {
                    return;
                  } else {
                    percent += 2 * count;
                  }
                } else {
                  percent += 3 + 2 * count;
                }
                return (
                  <AlbumItem
                    key={album.title}
                    image={urlFor(album.coverImage).url()}
                    percent={percent}
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
