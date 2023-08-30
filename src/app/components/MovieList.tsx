"use client";
import Image from "next/image";
import { useState } from "react";

import Dropdown from "./Dropdown";

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
    <div className="group relative cursor-pointer">
      <Image
        alt={movie.title}
        className="w-full rounded-md "
        height={280}
        src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
        width={500}
      />
      <div className="absolute top-0 flex h-full  w-full flex-col items-center justify-end bg-gradient-to-t from-gray-900 opacity-90 group-hover:hidden">
        <Image alt="play icon" height={80} src="/play.svg" width={80} />
        <p className="my-8 text-center text-2xl font-light tracking-widest">
          {movie.title}
        </p>
      </div>
      <div className="absolute top-0 hidden h-full w-full flex-col  justify-end bg-black/50  px-10 group-hover:flex">
        <div className="flex items-center gap-3 text-left">
          <Image alt="play icon" height={40} src="/play.svg" width={40} />
          <p className="text-left text-xl font-light  tracking-widest">
            {movie.title}
          </p>
        </div>
        <div className="flex justify-between gap-3 text-xl">
          <div className="flex items-center gap-3">
            <Image
              alt="play icon"
              height={25}
              src="/rating-star.svg"
              width={25}
            />
            <p className="text-center font-light tracking-widest ">
              {movie.vote_average}
            </p>
          </div>
          <p className="my-6 text-center font-light tracking-widest">
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
    <section className="bg-[#242424] p-6">
      <div
        className="relative flex justify-center gap-3 "
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <h3 className="my-10 cursor-pointer text-center text-2xl font-thin tracking-widest">
          VER: &nbsp;
          <span className="font-bold ">
            {selectedCategory === "popular" ? "POPULARES" : "MIS PELICULAS"}
          </span>
        </h3>
        <Image
          alt="arrow down icon"
          className={`cursor-pointer ${
            isDropdownOpen ? "rotate-180" : ""
          } transition-transform`}
          height={20}
          src="/arrow.svg"
          width={20}
        />
        {isDropdownOpen && (
          <Dropdown
            selectCategory={handleSelect}
            selectedCategory={selectedCategory}
          />
        )}
      </div>
      <ul className="flex flex-col gap-5">
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
