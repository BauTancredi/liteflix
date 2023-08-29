"use client";
import React from "react";
import Image from "next/image";
import { useDrawerStore } from "../store";

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

  return (
    open && (
      <div className="bg-[#242424] h-screen absolute top-0 w-full px-6">
        <ul className="flex flex-col gap-8 mt-28">
          {options.map((option) => (
            <li
              key={option}
              className="tracking-widest text-2xl cursor-pointer"
            >
              {option}
            </li>
          ))}
        </ul>

        <button className="flex items-center my-28 gap-4">
          <Image src="/plus.svg" width={25} height={25} alt="play icon" />
          <p className="tracking-widest text-2xl cursor-pointer">
            Agregar pelicula
          </p>
        </button>

        <button className="tracking-widest text-2xl cursor-pointer">
          Cerrar Sesion
        </button>
      </div>
    )
  );
};
export default Drawer;
