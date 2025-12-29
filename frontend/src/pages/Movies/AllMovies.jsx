import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  useGetAllMoviesQuery,
  useGetNewMoviesQuery,
  useGetTopMoviesQuery,
  useGetRandomMoviesQuery,
} from "../../redux/api/movies";
import { useFetchGenreQuery } from "../../redux/api/genre";

import MovieCard from "./MovieCard";
import banner from "../../assets/banner.jpg";

import {
  setMoviesFilter,
  setFilteredMovies,
  setMovieYears,
  setUniqueYears,
} from "../../redux/feactures/movies/movieSlice";

const AllMovies = () => {
  const dispatch = useDispatch();

  const { data = [] } = useGetAllMoviesQuery();
  const { data: genres = [] } = useFetchGenreQuery();
  const { data: newMovies = [] } = useGetNewMoviesQuery();
  const { data: topMovies = [] } = useGetTopMoviesQuery();
  const { data: randomMovies = [] } = useGetRandomMoviesQuery();

  const { moviesFilter, filteredMovies } = useSelector(
    (state) => state.movies
  );

  /* ✅ SAFE DERIVED DATA */
  const movieYears = useMemo(
    () => data.map((movie) => movie.year),
    [data]
  );

  const uniqueYears = useMemo(
    () => [...new Set(movieYears)],
    [movieYears]
  );

  /* ✅ RUN ONLY WHEN DATA CHANGES */
  useEffect(() => {
    if (data.length > 0) {
      dispatch(setFilteredMovies(data));
      dispatch(setMovieYears(movieYears));
      dispatch(setUniqueYears(uniqueYears));
    }
  }, [data, dispatch, movieYears, uniqueYears]);

  /* 🔍 SEARCH */
  const handleSearchChange = (e) => {
    const value = e.target.value;
    dispatch(setMoviesFilter({ searchTerm: value }));

    const filtered = data.filter((movie) =>
      movie.name.toLowerCase().includes(value.toLowerCase())
    );
    dispatch(setFilteredMovies(filtered));
  };

  /* 🎭 GENRE */
  const handleGenreChange = (genreId) => {
    if (!genreId) {
      dispatch(setFilteredMovies(data));
      return;
    }
    dispatch(
      setFilteredMovies(data.filter((movie) => movie.genre === genreId))
    );
  };

  /* 📅 YEAR */
  const handleYearChange = (year) => {
    if (!year) {
      dispatch(setFilteredMovies(data));
      return;
    }
    dispatch(
      setFilteredMovies(data.filter((movie) => movie.year === Number(year)))
    );
  };

  /* 🔃 SORT */
  const handleSortChange = (value) => {
    if (value === "new") dispatch(setFilteredMovies(newMovies));
    if (value === "top") dispatch(setFilteredMovies(topMovies));
    if (value === "random") dispatch(setFilteredMovies(randomMovies));
  };

  return (
    <div className="w-full overflow-x-hidden">
      {/* BANNER */}
      <section
        className="relative h-[30rem] w-full flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black opacity-70"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-6xl md:text-8xl font-bold mb-4">
            The Movies Hub
          </h1>
          <p className="text-xl md:text-2xl">
            Cinematic Odyssey: Unveiling the Magic of Movies
          </p>
        </div>
      </section>

      {/* SEARCH + FILTERS */}
      <section className="flex flex-col items-center gap-6 mt-[2rem] px-4">
        <input
          type="text"
          placeholder="Search Movie"
          className="w-full max-w-[50rem] h-[4rem] px-6 rounded text-black outline-none"
          value={moviesFilter.searchTerm || ""}
          onChange={handleSearchChange}
        />

        <div className="flex flex-wrap gap-4 justify-center">
          <select
            className="border p-2 rounded bg-white text-black"
            onChange={(e) => handleGenreChange(e.target.value)}
          >
            <option value="">Genres</option>
            {genres.map((g) => (
              <option key={g._id} value={g._id}>
                {g.name}
              </option>
            ))}
          </select>

          <select
            className="border p-2 rounded bg-white text-black"
            onChange={(e) => handleYearChange(e.target.value)}
          >
            <option value="">Year</option>
            {uniqueYears.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>

          <select
            className="border p-2 rounded bg-white text-black"
            onChange={(e) => handleSortChange(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="new">New Movies</option>
            <option value="top">Top Movies</option>
            <option value="random">Random Movies</option>
          </select>
        </div>
      </section>

      {/* MOVIES GRID */}
      <section className="mt-[3rem] px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredMovies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </section>
    </div>
  );
};

export default AllMovies;
