import Drawer from "./components/Drawer";
import MovieList from "./components/MovieList";
import Header from "./components/Header";
import AddMovieDrawer from "./components/AddMovieDrawer";
import FeaturedMovie from "./components/FeaturedMovie";
import { Movie } from "./types";

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
        <FeaturedMovie featuredMovie={featuredMovie} />
        <MovieList popularMovies={popularMovies} />
        <Drawer />
        <AddMovieDrawer />
      </main>
    </div>
  );
}
