import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <div className="relative group m-4">
      <Link to={`/movies/${movie._id}`}>
        <img
          src={movie.image}
          alt={movie.name}
          className="w-[20rem] rounded transition duration-300 ease-in-out transform group-hover:opacity-50"
        />
        <p className="absolute bottom-4 left-4 right-0 opacity-0 duration-300 ease-in-out group-hover:opacity-100 text-white">
        {movie.name}
      </p>
      </Link>

      
    </div>
  );
};

export default MovieCard;
