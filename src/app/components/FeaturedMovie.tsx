import React from "react";
import Image from "next/image";

import { Movie } from "../types";

interface FeaturedMovieProps {
  featuredMovie: Movie;
}

const FeaturedMovie = ({ featuredMovie }: FeaturedMovieProps) => {
  return (
    <section
      className={`flex h-[calc(100vh-6rem)] w-full flex-col justify-end bg-gradient-to-t from-[#242424]`}
    >
      <p className="text-center text-xl font-thin tracking-widest">
        ORIGINAL DE <span className="font-bold">LITEFLIX</span>
      </p>
      <p className="mb-20 mt-5 text-center  text-8xl tracking-widest text-[#64EEBC]">
        {featuredMovie.title}
      </p>
      <div className="flex flex-col items-center gap-6 ">
        <button className="flex  w-96 items-center justify-center gap-5 bg-[#242424]  py-4">
          <Image alt="play icon" height={30} src="/play_2.svg" width={30} />
          <p className="text-2xl font-light tracking-widest">REPRODUCIR</p>
        </button>
        <button className="flex w-96 items-center justify-center gap-5  border border-gray-400 bg-[#242424] py-4 text-2xl tracking-widest">
          <Image alt="play icon" height={30} src="/plus.svg" width={30} />
          <p className="text-2xl font-light tracking-widest">MI LISTA</p>
        </button>
      </div>
    </section>
  );
};

export default FeaturedMovie;
