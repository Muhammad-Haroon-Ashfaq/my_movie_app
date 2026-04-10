const MovieCardSkeleton = () => {
  return (
    <div className="relative group m-2 w-[15rem] md:w-[18rem] animate-pulse">
      {/* Poster Skeleton */}
      <div className="aspect-[2/3] w-full bg-gray-800 rounded-lg"></div>
      
      {/* Title Skeleton */}
      <div className="mt-3 h-4 bg-gray-800 rounded w-3/4"></div>
      <div className="mt-2 h-3 bg-gray-800 rounded w-1/2"></div>
    </div>
  );
};

export default MovieCardSkeleton;