import Image from "next/image";

import Drawer from "./components/Drawer";
import MovieList from "./components/MovieList";
import Header from "./components/Header";
import AddMovie from "./components/AddMovie";

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
      <Header />
      <main>
        <section
          className={`flex h-[calc(100vh-6rem)] w-full flex-col justify-end bg-gradient-to-t from-[#242424]`}
        >
          <p className="text-center text-xl font-thin tracking-widest">
            ORIGINAL DE <span className="font-bold">LITEFLIX</span>
          </p>
          <p className="mb-20 mt-5 text-center  text-8xl tracking-widest text-[#64EEBC]">
            {featuredMovie.title}
          </p>
          <div className="flex flex-col items-center gap-6 ">
            <button className="flex  w-96 items-center justify-center gap-5 bg-[#242424]  py-4">
              <Image alt="play icon" height={30} src="/play_2.svg" width={30} />
              <p className="text-2xl font-light tracking-widest">REPRODUCIR</p>
            </button>
            <button className="flex w-96 items-center justify-center gap-5  border border-gray-400 bg-[#242424] py-4 text-2xl tracking-widest">
              <Image alt="play icon" height={30} src="/plus.svg" width={30} />
              <p className="text-2xl font-light tracking-widest">MI LISTA</p>
            </button>
          </div>
        </section>
        <MovieList popularMovies={popularMovies} />
        <Drawer />
        <AddMovie />
      </main>
    </div>
  );
}
