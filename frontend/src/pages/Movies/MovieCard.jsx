// import { Link } from "react-router-dom";
// import { BASE_URL } from "../../redux/constants";

// const MovieCard = ({ movie }) => {
//   return (
//     <div className="relative group m-4">
//       <Link to={`/movies/${movie._id}`}>
//         <img
//           src={movie.image} 
//           alt={movie.name}
//           loading="lazy"
//           className="w-[20rem] rounded transition duration-300 ease-in-out transform group-hover:opacity-50"
// />
//         <p className="absolute bottom-4 left-4 right-0 opacity-0 duration-300 ease-in-out group-hover:opacity-100 text-white">
//         {movie.name}
//       </p>
//       </Link>
//     </div>
//   );
// };

// export default MovieCard;

import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    // Cards ka size aur margin consistent kar diya hai
    <div className="relative group m-2 w-[14rem] md:w-[16rem] lg:w-[18rem] shrink-0">
      <Link to={`/movies/${movie._id}`}>
        
        {/* Poster Container: Iska aspect ratio fix hai (2/3) */}
        <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-[#1a1a1a] shadow-2xl border border-gray-800">
          <img
            src={movie.image}
            alt={movie.name}
            loading="lazy"
            // object-cover aur transition is se professional lagti hai
            className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110 group-hover:opacity-30"
          />
          
          {/* Hover Overlay: Ye sirf mouse le jane par dikhega */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-t from-black via-black/40 to-transparent">
             <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 mb-1">
               {movie.genre?.name || "Premium Content"}
             </span>
             <p className="text-[11px] text-gray-300 line-clamp-2 leading-relaxed italic">
                {movie.detail?.substring(0, 60) || "Click to view movie details and more..."}...
             </p>
          </div>
        </div>

        {/* Info Area: Poster ke niche hamesha dikhne wala text */}
        <div className="mt-4 px-1">
          <h3 className="truncate text-[15px] font-bold text-gray-100 group-hover:text-blue-500 transition-colors duration-300">
            {movie.name}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[11px] font-medium text-gray-500">
              {movie.year || "2026"}
            </span>
            <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
            <span className="text-[11px] font-medium text-gray-500 px-1.5 py-0.5 border border-gray-800 rounded">
              HD
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;