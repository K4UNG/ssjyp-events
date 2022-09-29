import React from "react";
import Image from "next/image";
import { urlFor } from "../../sanity";

interface Props {
  members: {
    name: string;
    avatar: object;
  }[];
}

function Members({ members }: Props) {
  return (
    <div className="md:grid md:grid-cols-[140px_auto]">
      <div className="grid grid-cols-5 gap-2 mt-4 sm:grid-cols-7 md:grid-cols-9 md:col-start-2 lg:grid-cols-10">
        {members.map((member) => {
          return (
            <div
              className="relative w-full aspect-square rounded-full overflow-hidden border border-black"
              key={member.name}
            >
              <div className="uppercase text-white font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-xs text-shadow">
                {member.name}
              </div>
              <Image
                src={urlFor(member.avatar).url()}
                alt={member.name}
                layout="fill"
                objectFit="cover"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Members;
