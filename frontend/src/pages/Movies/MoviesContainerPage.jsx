import { useState } from "react";
import { 
  useGetNewMoviesQuery,
  useGetTopMoviesQuery,
  useGetRandomMoviesQuery
} from "../../redux/api/movies";
import { useFetchGenreQuery } from '../../redux/api/genre';
import SliderUtil from "../../components/SliderUtil";
import MovieCardSkeleton from "../../components/MovieCardSkeleton"; 

const MoviesContainerPage = () => {
  const { data, isLoading: loadingNew } = useGetNewMoviesQuery();
  const { data: topMovies, isLoading: loadingTop } = useGetTopMoviesQuery();
  const { data: genres } = useFetchGenreQuery();
  const { data: randomMovies, isLoading: loadingRandom } = useGetRandomMoviesQuery();

  const [selectedGenre, setSelectedGenre] = useState(null);

  const handleGenreClick = (genre) => {
    if (genre.name.toLowerCase() === "all") {
      setSelectedGenre(null);
    } else {
      setSelectedGenre(genre._id);
    }
  };

  const filteredMovies = data?.filter(
    (movie) => !selectedGenre || movie.genre === selectedGenre
  ) || [];

  const renderSkeletons = () => (
    <div className="flex flex-nowrap overflow-hidden gap-4">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <MovieCardSkeleton key={item} />
      ))}
    </div>
  );

  return (
    <main className="w-full bg-[#0f0f0f] text-white min-h-screen pb-20">
      
      {/* Content Container */}
      <div className="max-w-[1400px] mx-auto p-6 md:p-10 space-y-24">
        
        {/* Section 1: Recommended (No Filter) */}
        <section>
          <h2 className="text-xl md:text-2xl font-black mb-8 flex items-center gap-3 tracking-tight uppercase">
            <span className="w-1.5 h-8 bg-blue-600 rounded-full"></span>
            Recommended For You
          </h2>
          {loadingRandom ? renderSkeletons() : <SliderUtil data={randomMovies} />}
        </section>

        {/* Section 2: Top Rated (No Filter) */}
        <section>
          <h2 className="text-xl md:text-2xl font-black mb-8 flex items-center gap-3 tracking-tight uppercase">
            <span className="w-1.5 h-8 bg-purple-600 rounded-full"></span>
            Top Rated Movies
          </h2>
          {loadingTop ? renderSkeletons() : <SliderUtil data={topMovies} />}
        </section>

        {/* --- YAHAN SE FILTER SECTION SHURU --- */}
        <section className="space-y-10">
          
          {/* Filter Bar: Ab ye sirf Just Released ke upar hai */}
          <div className="flex flex-col md:flex-row md:items-center gap-6 bg-[#141414] p-6 rounded-2xl border border-[#242424]">
            <div className="flex flex-col">
              <span className="text-blue-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">Discovery</span>
              <h3 className="text-lg font-bold">Filter by Genre</h3>
            </div>
            
            <div className="flex items-center gap-3 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
              <button 
                onClick={() => setSelectedGenre(null)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap
                ${!selectedGenre ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-[#1a1a1a] text-gray-400 hover:text-white border border-[#2e2e2e]'}`}
              >
                All Releases
              </button>
              {genres?.map((g) => (
                <button
                  key={g._id}
                  onClick={() => handleGenreClick(g)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap
                  ${selectedGenre === g._id ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-[#1a1a1a] text-gray-400 hover:text-white border border-[#2e2e2e]'}`}
                >
                  {g.name}
                </button>
              ))}
            </div>
          </div>

          {/* Section 3: Just Released (This section responds to filters) */}
          <div>
            <h2 className="text-xl md:text-2xl font-black mb-8 flex items-center gap-3 tracking-tight uppercase">
              <span className="w-1.5 h-8 bg-green-500 rounded-full"></span>
              {selectedGenre ? "Search Results" : "Just Released"}
            </h2>
            {loadingNew ? renderSkeletons() : <SliderUtil data={filteredMovies} />}
            
            {!loadingNew && filteredMovies.length === 0 && (
              <div className="py-20 text-center bg-[#141414] rounded-2xl border border-dashed border-[#242424]">
                <p className="text-gray-500 font-medium">No movies found in this genre.</p>
                <button onClick={() => setSelectedGenre(null)} className="text-blue-500 text-sm mt-2 underline">Clear filter</button>
              </div>
            )}
          </div>
        </section>

      </div>
    </main>
  );
};

export default MoviesContainerPage;