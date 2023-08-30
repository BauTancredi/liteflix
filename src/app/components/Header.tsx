"use client";

import React from "react";
import Image from "next/image";

import { useDrawerStore, useAddMovieDrawerStore } from "../store";

const Header = () => {
  const toggle = useDrawerStore((state) => state.toggle);
  const open = useDrawerStore((state) => state.open);
  const toggleAddMovie = useAddMovieDrawerStore((state) => state.toggle);
  const openAddMovie = useAddMovieDrawerStore((state) => state.open);

  const handleClick = () => {
    if (openAddMovie) toggleAddMovie();
    toggle();
  };

  return (
    <header className="top-0 z-20 flex w-full justify-between p-6">
      <Image
        alt="hamburger icon"
        className="cursor-pointer"
        height={40}
        src={open ? "/close.svg" : "/hamburger-icon.svg"}
        width={40}
        onClick={handleClick}
      />
      <h1 className="text-3xl font-thin tracking-widest text-[#64EEBC]">
        <span className="font-bold">LITE</span>
        FLIX
      </h1>
      <Image alt="search icon" height={40} src="/user-icon.svg" width={40} />
    </header>
  );
};

export default Header;
