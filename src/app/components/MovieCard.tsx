import Image from "next/image";

import { convertDateToYear } from "../utils";
import { Movie } from "../types";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <div className="group relative cursor-pointer">
      <Image
        alt={movie.title}
        className="w-full rounded-md xl:w-72"
        height={280}
        src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
        width={500}
      />
      <div className="absolute top-0 flex h-full w-full flex-col items-center justify-center bg-gradient-to-t from-gray-900 opacity-90 group-hover:hidden ">
        <Image
          alt="play icon"
          height={60}
          src="/assets/play-rounded.svg"
          width={60}
        />
        <p className="absolute bottom-1 text-center text-2xl font-light tracking-widest xl:text-sm">
          {movie.title}
        </p>
      </div>
      <div className="absolute top-0 hidden h-full w-full flex-col  justify-end bg-black/50  px-10 group-hover:flex xl:px-2">
        <div className="flex items-center gap-3 text-left">
          <Image
            alt="play icon"
            height={40}
            src="/assets/play-rounded.svg"
            width={40}
          />
          <p className="text-left text-xl font-light  tracking-widest xl:text-sm">
            {movie.title}
          </p>
        </div>
        <div className="flex justify-between gap-3 text-xl ">
          <div className="flex items-center gap-3">
            <Image
              alt="play icon"
              height={25}
              src="/assets/rating-star.svg"
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

export default MovieCard;
