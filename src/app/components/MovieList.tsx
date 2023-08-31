"use client";
import Image from "next/image";
import { useState } from "react";

import { Category, Movie } from "../types";

import Dropdown from "./Dropdown";
import MovieCard from "./MovieCard";

interface MovieListProps {
  popularMovies: Movie[];
}

export default function MovieList({ popularMovies }: MovieListProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category>("popular");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSelect = (value: Category) => {
    setSelectedCategory(value);
    setIsDropdownOpen(false);
  };

  return (
    <section className="bg-[#242424] p-6 xl:bg-transparent xl:pr-16">
      <div
        className="relative flex justify-center gap-3 "
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <h3 className="my-10 cursor-pointer text-center text-2xl font-thin tracking-widest xl:text-left xl:text-xl">
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
