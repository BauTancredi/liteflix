"use client";

import React from "react";
import Image from "next/image";

import { useDrawerStore, useAddMovieDrawerStore } from "../store";

const Header = () => {
  const toggleDrawer = useDrawerStore((state) => state.toggle);
  const openDrawer = useDrawerStore((state) => state.open);
  const toggleAddMovieDrawer = useAddMovieDrawerStore((state) => state.toggle);
  const openAddMovieDrawer = useAddMovieDrawerStore((state) => state.open);

  const handleClick = () => {
    if (openAddMovieDrawer) toggleAddMovieDrawer();
    toggleDrawer();
  };

  return (
    <header className="top-0 z-20 flex w-full justify-between p-6">
      <Image
        alt="hamburger icon"
        className="cursor-pointer"
        height={40}
        src={openDrawer ? "/close.svg" : "/hamburger-icon.svg"}
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
