import { getDocs, collection, getFirestore } from "firebase/firestore";

import Drawer from "./components/Drawer";
import MovieList from "./components/MovieList";
import AddMovieDrawer from "./components/AddMovieDrawer";
import FeaturedMovie from "./components/FeaturedMovie";
import { Movie } from "./types";
import getPopularMovies from "./utils/getPopularMovies";
import getFeaturedMovie from "./utils/getFeaturedMovie";
import appFirebase from "./firebaseConfig";

export default async function Home() {
  const db = getFirestore(appFirebase);
  const popularMovies: Movie[] = await getPopularMovies();
  const featuredMovie: Movie = await getFeaturedMovie();

  const myMoviesDoc = await getDocs(collection(db, "movies"));

  // convert the myMoviesDoc to an array of Movie
  const myMovies = myMoviesDoc.docs.map((doc) => {
    const data = doc.data();

    return {
      title: data.title,
      backdrop_path: data.imgUrl,
      id: doc.id,
    };
  });

  return (
    <div>
      <main>
        <div>
          <FeaturedMovie featuredMovie={featuredMovie} />
          <MovieList myMovies={myMovies} popularMovies={popularMovies} />
        </div>
        <Drawer />
        <AddMovieDrawer />
      </main>
    </div>
  );
}
