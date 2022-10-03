import React from "react";
import Image from "next/image";
import { urlFor } from "../../sanity";
import Link from "next/link";

interface Props {
  members: {
    name: string;
    avatar: object;
    slug: { current: string };
  }[];
}

function Members({ members }: Props) {
  return (
    <div className="md:grid md:grid-cols-[140px_auto]">
      <div className="grid grid-cols-5 gap-2 mt-4 sm:grid-cols-7 md:grid-cols-9 md:col-start-2 lg:grid-cols-10">
        {members.map((member) => {
          return (
            <Link
              href={"/artist/" + member.slug.current}
              key={member.name}
              passHref={true}
            >
              <a className="relative w-full aspect-square rounded-full overflow-hidden outline outline-[1px] outline-black group">
                <div className="uppercase text-white font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 text-xs text-shadow text-center">
                  {member.name}
                </div>
                <div className="absolute w-full h-full top-0 left-0 z-10 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 duration-150 transition-opacity" />
                <Image
                  src={urlFor(member.avatar).url()}
                  alt={member.name}
                  layout="fill"
                  objectFit="cover"
                />
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Members;
