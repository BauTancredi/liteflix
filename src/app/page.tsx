import Drawer from "./components/Drawer";
import MovieList from "./components/MovieList";
import AddMovieDrawer from "./components/AddMovieDrawer";
import FeaturedMovie from "./components/FeaturedMovie";
import { Movie } from "./types";
import getPopularMovies from "./utils/getPopularMovies";
import getFeaturedMovie from "./utils/getFeaturedMovie";

export default async function Home() {
  const popularMovies: Movie[] = await getPopularMovies();
  const featuredMovie: Movie = await getFeaturedMovie();

  return (
    <div>
      <main>
        <div>
          <FeaturedMovie featuredMovie={featuredMovie} />
          <MovieList popularMovies={popularMovies} />
        </div>
        <Drawer />
        <AddMovieDrawer />
      </main>
    </div>
  );
}
