import { Link } from "react-router-dom";
import { BASE_URL } from "../../redux/constants";

const MovieCard = ({ movie }) => {
  // Check karein ke image path sahi ban raha hai
  const imageSrc = movie.image.startsWith('http') 
    ? movie.image 
    : `${BASE_URL}${movie.image.startsWith('/') ? '' : '/'}${movie.image}`;

  return (
    <div className="relative group m-4">
      <Link to={`/movies/${movie._id}`}>
        <img
          src={imageSrc} 
          alt={movie.name}
          onError={(e) => { e.target.src = 'https://via.placeholder.com/320x480?text=No+Image'; }} // Backup image
          className="w-[20rem] h-[30rem] object-cover rounded transition duration-300 ease-in-out transform group-hover:opacity-50"
        />
        <p className="absolute bottom-4 left-4 right-0 opacity-0 duration-300 ease-in-out group-hover:opacity-100 text-white font-bold">
          {movie.name}
        </p>
      </Link>
    </div>
  );
};

export default MovieCard;