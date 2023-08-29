"use client";
import Image from "next/image";

import Dropdown from "./Dropdown";
import { useState } from "react";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  release_date: string;
}

// util conver date to year
const convertDateToYear = (date: string) => {
  return new Date(date).getFullYear();
};

const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
    <div className="relative cursor-pointer group">
      <Image
        src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
        alt={movie.title}
        width={500}
        height={280}
        className="w-full rounded-md "
      />
      <div className="group-hover:hidden absolute w-full h-full  top-0 opacity-90 flex flex-col justify-end items-center bg-gradient-to-t from-gray-900">
        <Image src="/play.svg" width={80} height={80} alt="play icon" />
        <p className="text-center text-2xl tracking-widest my-8 uppercase font-semibold">
          {movie.title}
        </p>
      </div>
      <div className="group-hover:flex hidden absolute w-full h-full top-0  flex-col justify-end  bg-black/50 px-10">
        <div className="flex gap-3 items-center text-left">
          <Image src="/play.svg" width={40} height={40} alt="play icon" />
          <p className="text-xl tracking-widest uppercase font-semibold text-left">
            {movie.title}
          </p>
        </div>
        <div className="flex gap-3 justify-between text-xl">
          <div className="flex items-center gap-3">
            <Image
              src="/rating-star.svg"
              width={25}
              height={25}
              alt="play icon"
            />
            <p className="text-center tracking-widest uppercase ">
              {movie.vote_average}
            </p>
          </div>
          <p className="text-center tracking-widest my-6 uppercase font-semibold">
            {convertDateToYear(movie.release_date)}
          </p>
        </div>
      </div>
    </div>
  );
};

interface MovieListProps {
  popularMovies: Movie[];
}

export default function MovieList({ popularMovies }: MovieListProps) {
  const [selectedCategory, setSelectedCategory] = useState<
    "popular" | "my-movies"
  >("popular");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSelect = (value: "popular" | "my-movies") => {
    setSelectedCategory(value);
    setIsDropdownOpen(false);
  };

  return (
    <section className="p-6 bg-[#242424]">
      <div
        className="relative flex justify-center gap-3 "
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <h3 className="text-3xl tracking-wider text-center mt-10 mb-10 cursor-pointer">
          VER: &nbsp;
          <span className="font-bold ">
            {selectedCategory === "popular" ? "POPULARES" : "MIS PELICULAS"}
          </span>
        </h3>
        <Image
          src="/arrow.svg"
          width={20}
          height={20}
          alt="arrow down icon"
          className={`cursor-pointer ${
            isDropdownOpen ? "rotate-180" : ""
          } transition-transform`}
        />
        {isDropdownOpen && (
          <Dropdown
            selectCategory={handleSelect}
            selectedCategory={selectedCategory}
          />
        )}
      </div>
      <ul className="flex gap-5 flex-col">
        {selectedCategory === "popular" &&
          popularMovies.map((movie) => (
            <li key={movie.id}>
              <MovieCard movie={movie} />
            </li>
          ))}
      </ul>
    </section>
  );
}
