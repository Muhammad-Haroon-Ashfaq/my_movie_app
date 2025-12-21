import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateMovieMutation,
  useUploadImageMutation,
} from "../../redux/api/movies";
import { useFetchGenreQuery } from "../../redux/api/genre";
import { toast } from "react-toastify";

const CreateMovie = () => {
  const navigate = useNavigate();

  const [movieData, setMovieData] = useState({
    name: "",
    year: "",
    detail: "",
    cast: "",
    rating: 0,
    image: null,
    genre: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);

  const [createMovie, { isLoading: isCreatingMovie }] =
    useCreateMovieMutation();

  const [uploadImage, { isLoading: isUploadingImage }] =
    useUploadImageMutation();

  const { data: genres = [], isLoading: isLoadingGenres } =
    useFetchGenreQuery();

  // Set default genre when genres load
  useEffect(() => {
    if (genres.length > 0) {
      setMovieData((prev) => ({
        ...prev,
        genre: genres[0]._id,
      }));
    }
  }, [genres]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData((prev) => ({ ...prev, [name]: value }));
  };

  // Image change
  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  // Create movie
  const handleCreateMovie = async (e) => {
    e.preventDefault();

    if (
      !movieData.name ||
      !movieData.year ||
      !movieData.detail ||
      !movieData.cast ||
      !movieData.genre ||
      !selectedImage
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      // Upload image
      const formData = new FormData();
      formData.append("image", selectedImage);

      const uploadRes = await uploadImage(formData).unwrap();

      // Create movie
      await createMovie({
        ...movieData,
        cast: movieData.cast.split(",").map((c) => c.trim()),
        image: uploadRes.image,
      }).unwrap();

      toast.success("Movie added successfully");
      navigate("/admin/movies-list");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create movie");
    }
  };

  return (
    <div className="container flex justify-center items-center mt-4">
      <form onSubmit={handleCreateMovie} className="w-[50rem]">
        <p className="text-green-200 text-2xl mb-4">Create Movie</p>

        <input
          type="text"
          name="name"
          placeholder="Movie Name"
          value={movieData.name}
          onChange={handleChange}
          className="border px-2 py-1 w-full mb-3"
        />

        <input
          type="number"
          name="year"
          placeholder="Year"
          value={movieData.year}
          onChange={handleChange}
          className="border px-2 py-1 w-full mb-3"
        />

        <textarea
          name="detail"
          placeholder="Details"
          value={movieData.detail}
          onChange={handleChange}
          className="border px-2 py-1 w-full mb-3"
        />

        <input
          type="text"
          name="cast"
          placeholder="Cast (comma separated)"
          value={movieData.cast}
          onChange={handleChange}
          className="border px-2 py-1 w-full mb-3"
        />

        <select
          name="genre"
          value={movieData.genre}
          onChange={handleChange}
          className="border px-2 py-1 w-full mb-3"
        >
          {isLoadingGenres ? (
            <option>Loading genres...</option>
          ) : (
            genres.map((genre) => (
              <option key={genre._id} value={genre._id}>
                {genre.name}
              </option>
            ))
          )}
        </select>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mb-4"
        />
        <br/>
        <button
          type="submit"
          disabled={isCreatingMovie || isUploadingImage}
          className="bg-teal-500 text-white px-4 py-2 rounded"
        >
          {isCreatingMovie || isUploadingImage
            ? "Creating..."
            : "Create Movie"}
        </button>
      </form>
    </div>
  );
};

export default CreateMovie;
