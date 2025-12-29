import { useState } from "react";
import { useGetNewMoviesQuery,
         useGetTopMoviesQuery,
         useGetRandomMoviesQuery
 } from "../../redux/api/movies";

 import {useFetchGenreQuery} from '../../redux/api/genre';
 import SliderUtil from "../../components/SliderUtil";
const MoviesContainerPage = () => {
    const {data} = useGetNewMoviesQuery()
    const {data: topMovies} = useGetTopMoviesQuery()
    const {data: genres} = useFetchGenreQuery()
    const {data: randomMovies} = useGetRandomMoviesQuery()

    const [selectedGenre, setSelectedGenre] = useState(null)

    const handleGenreClick = (genre) => {
    if (genre.name.toLowerCase() === "all") {
        setSelectedGenre(null);   // ALL → sari movies
    } else {
        setSelectedGenre(genre._id);
    }
};


   const filteredMovies = data?.filter(
  movie => !selectedGenre || movie.genre === selectedGenre
) || [];




  return (
    <div className="flex flex-col lg:flex-row lg:justify-start items-center">
      <nav className="ml-[3rem] mt-[30rem] flex flex-row xl:flex-col lg:flex-col md:flex-row sm:flex-row ">
        {genres?.map((g) => (
            <button key={g._id} className={`transition duration-300 ease-in-out hover:bg-gray-200
            block p-2 hover:text-black rounded mb-[1rem] text-lg ${selectedGenre === g._id ? "bg-gray-200" : ""}`}
            onClick={() => handleGenreClick(g)}
            >    
            {g.name}
            </button>
        ))}
      </nav>

      <section className="flex flex-col justify-start ml-14 items-center w-full lg:w-auto">
        <div className="w-full lg:w-[72rem] mb-8">
            <h1 className="mb-5">Choose For You</h1>
            <SliderUtil data={randomMovies} />
        </div>

        <div className="w-full lg:w-[72rem] mb-8">
            <h1 className="mb-5">Top Movies</h1>
            <SliderUtil data={topMovies} />
        </div>

        <div className="w-full lg:w-[72rem] mb-8">
            <h1 className="mb-5">Choose Movies</h1>
            <SliderUtil data={filteredMovies} />
        </div>

      </section>

      
    </div>
  )
}

export default MoviesContainerPage
