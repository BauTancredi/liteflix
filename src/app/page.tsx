import Image from "next/image";

import Dropdown from "./components/Dropdown";
import MovieList from "./components/MovieList";

const getPopularMovies = async () => {
  const result = await fetch(process.env.URL + "/api/popular", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  });

  if (result.ok) {
    return result.json();
  }

  return [];
};

const getFeaturedMovie = async () => {
  const result = await fetch(process.env.URL + "/api/featured", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  });

  if (result.ok) {
    return result.json();
  }

  return [];
};

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  release_date: string;
}

export default async function Home() {
  const data = await getPopularMovies();
  const data2 = await getFeaturedMovie();

  const popularMovies: Movie[] = data.data.results.splice(0, 4);
  const featuredMovie: Movie = data2.res.results[3];

  return (
    <div
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${featuredMovie.poster_path})`,
        backgroundSize: "130%",
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <header className="flex justify-between p-6">
        <Image
          src="/hamburger-icon.svg"
          width={40}
          height={40}
          alt="hamburger icon"
        />
        <h1 className="text-3xl tracking-widest font-thin text-[#64EEBC]">
          <span className="font-bold">LITE</span>
          FLIX
        </h1>
        <Image src="/user-icon.svg" width={40} height={40} alt="search icon" />
      </header>
      <main>
        <section
          className={`h-[calc(100vh-6rem)] flex flex-col justify-end w-full bg-gradient-to-t from-[#242424] `}
        >
          <p className="text-xl tracking-widest font-thin text-center">
            ORIGINAL DE <span className="font-bold">LITEFLIX</span>
          </p>
          <p className="text-8xl text-center tracking-wider  mt-5 mb-20 text-[#64EEBC]">
            {featuredMovie.title}
          </p>
          <div className="flex flex-col items-center gap-6 ">
            <button className="flex  py-4 w-96 justify-center gap-5 bg-[#242424] tracking-widest text-2xl items-center ">
              <Image src="/play_2.svg" width={30} height={30} alt="play icon" />
              REPRODUCIR
            </button>
            <button className="flex border border-gray-400 py-4 w-96  justify-center gap-5 bg-[#242424] tracking-widest text-2xl items-center">
              <Image src="/plus.svg" width={30} height={30} alt="play icon" />
              MI LISTA
            </button>
          </div>
        </section>
        <MovieList popularMovies={popularMovies} />
      </main>
    </div>
  );
}
