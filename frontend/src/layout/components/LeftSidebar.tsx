import { useEffect } from "react";
import { Link } from "react-router-dom";
import { SignedIn } from "@clerk/clerk-react";
import { Home, Library, MessageCircle } from "lucide-react";
import { useMusicStore } from "@/stores/useMusicStore";
import { cn } from "@/lib/utils";
import PlayListSkeleton from "@/components/skeletons/PlayListSkeleton";
import { buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const LeftSidebar = () => {
  const { loading, albums, fetchAlbums } = useMusicStore();

  useEffect(() => {
    fetchAlbums();
  }, []);

  return (
    <div className="h-full flex flex-col gap-2">
      {/* navigation menu  */}
      <div className="rounded-lg bg-zinc-900 p-4">
        <div className="space-y-2">
          <Link
            to="/"
            className={cn(
              buttonVariants({
                variant: "ghost",
                className: "w-full justify-start text-white hover:bg-zinc-800",
              })
            )}
          >
            <Home className="size-5 mr-2" />
            <span className="hidden md:inline">Home</span>
          </Link>

          <SignedIn>
            <Link
              to="/chat"
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  className:
                    "w-full justify-start text-white hover:bg-zinc-800",
                })
              )}
            >
              <MessageCircle className="size-5 mr-2" />
              <span className="hidden md:inline">Messages</span>
            </Link>
          </SignedIn>
        </div>
      </div>

      {/* library section  */}
      <div className="flex-1 rounded-lg bg-zinc-900 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-white px-2">
            <Library className="size-5 mr-2" />
            <span>Playlists</span>
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-300px)]">
          <div className="space-y-2">
            {loading ? (
              <PlayListSkeleton />
            ) : (
              albums.map((album) => (
                <Link
                  to={`/album/${album._id}`}
                  key={album._id}
                  className="p-2 hover:bg-zinc-800 rounded-md flex items-center gap-3 group cursor-pointer"
                >
                  <img
                    src={album.imageUrl}
                    alt="Playlist img"
                    className="size-12 rounded-md object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0 hidden md:block">
                    <p className="font-medium truncate">{album.title}</p>
                    <p className="text-sm text-zinc-400 truncate">
                      {album.artist}
                    </p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default LeftSidebar;
