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
    <header className="flex justify-between p-6 z-20 w-full top-0">
      <Image
        src={open ? "/close.svg" : "/hamburger-icon.svg"}
        width={40}
        height={40}
        alt="hamburger icon"
        className="cursor-pointer"
        onClick={handleClick}
      />
      <h1 className="text-3xl tracking-widest font-thin text-[#64EEBC]">
        <span className="font-bold">LITE</span>
        FLIX
      </h1>
      <Image src="/user-icon.svg" width={40} height={40} alt="search icon" />
    </header>
  );
};

export default Header;
