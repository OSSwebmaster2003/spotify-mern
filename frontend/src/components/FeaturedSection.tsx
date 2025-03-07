import { useMusicStore } from "@/stores/useMusicStore";
import FeaturedGridSkeleton from "./skeletons/FeaturedGridSkeleton";

const FeaturedSection = () => {
  const { featuredSongs, loading, error } = useMusicStore();

  if (loading) return <FeaturedGridSkeleton />;

  if (error) return <p className="text-red-600 mb-4 text-lg">{error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:grid-cols-3 mb-4">
      {featuredSongs.map((song) => (
        <div
          key={song?._id}
          className="flex items-center bg-zinc-800/50 rounded-md overflow-hidden hover:bg-zinc-700/50 transition-colors group cursor-pointer relative"
        >
          <img
            src={song.imageUrl}
            alt={song.title}
            className="w-16 sm:w-30 h-16 sm:h-20 object-cover shrink-0"
          />
          <div className="flex-1 p-4">
            <p className="font-medium truncate">{song.title}</p>
            <p className="text-sm text-zinc-400 truncate">{song.artist}</p>
          </div>
        </div>

        // play button
      ))}
    </div>
  );
};

export default FeaturedSection;
