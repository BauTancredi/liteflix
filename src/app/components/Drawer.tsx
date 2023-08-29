"use client";
import React from "react";
import Image from "next/image";
import { useDrawerStore, useAddMovieDrawerStore } from "../store";
import Header from "./Header";

const options = [
  "Inicio",
  "Series",
  "Peliculas",
  "Agregados recientemente",
  "Populares",
  "Mis Peliculas",
  "Mi lista",
];

const Drawer = () => {
  const open = useDrawerStore((state) => state.open);
  const toggle = useAddMovieDrawerStore((state) => state.toggle);

  return (
    open && (
      <>
        <div className="bg-[#242424] h-screen absolute top-0 w-full">
          <Header />
          <div className="px-6 mt-10">
            <ul className="flex flex-col gap-8">
              {options.map((option) => (
                <li
                  key={option}
                  className="tracking-widest text-2xl cursor-pointer"
                >
                  {option}
                </li>
              ))}
            </ul>

            <button className="flex items-center my-28 gap-4" onClick={toggle}>
              <Image src="/plus.svg" width={25} height={25} alt="play icon" />
              <p className="tracking-widest text-2xl cursor-pointer">
                Agregar pelicula
              </p>
            </button>

            <button className="tracking-widest text-2xl cursor-pointer">
              Cerrar Sesion
            </button>
          </div>
        </div>
      </>
    )
  );
};
export default Drawer;
