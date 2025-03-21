import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMusicStore } from "@/stores/useMusicStore";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Clock, Pause, Play } from "lucide-react";
import { formatDuration } from "@/helpers";
import { usePlayerStore } from "@/stores/usePlayerStore";

const AlbumPage = () => {
  const { albumId } = useParams();
  const { loading, singleAlbum, fetchSingleAlbum } = useMusicStore();
  const { currentSong, isPlaying, playAlbum, togglePlay } = usePlayerStore();

  const handlePlaySong = (index: number) => {
    if (!singleAlbum) return;
    playAlbum(singleAlbum.songs, index);
  };

  const handlePlayAlbum = () => {
    if (!singleAlbum) return;

    const isCurrentAlbumPlaying = singleAlbum?.songs.some(
      (song) => song._id === currentSong?._id
    );

    if (isCurrentAlbumPlaying) togglePlay();
    else playAlbum(singleAlbum.songs, 0);
  };

  useEffect(() => {
    if (albumId) fetchSingleAlbum(albumId);
  }, [fetchSingleAlbum, albumId]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="h-full">
      <ScrollArea className="h-full rounded-md">
        <div className="relative min-h-full">
          <div
            className="absolute inset-0 bg-gradient-to-b from-[#5038a0]/80 via-zinc-900/80 to-zinc-900 pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10">
            <div className="flex p-6 gap-6 pb-8">
              <img
                src={singleAlbum?.imageUrl}
                alt={singleAlbum?.title}
                className="w-[240px] h-[240px] shadow-xl rounded"
              />
              <div className="flex flex-col justify-end">
                <p className="text-sm font-medium">Album</p>
                <h2 className="text-7xl font-bold my-4">
                  {singleAlbum?.title}
                </h2>
                <div className="flex items-center gap-2 text-sm text-zinc-100">
                  <span className="font-medium text-white">
                    {singleAlbum?.artist}
                  </span>
                  <span>- {singleAlbum?.songs.length} songs</span>
                  <span>- {singleAlbum?.releaseYear}</span>
                </div>
              </div>
            </div>

            {/* play button  */}
            <div className="px-6 pb-4 flex items-center gap-6">
              <Button
                onClick={handlePlayAlbum}
                size="icon"
                className="w-14 h-14 rounded-full cursor-pointer bg-green-500 hover:bg-green-400 hover:scale-105 transition-all"
              >
                {/* <Play className="w-7 h-7 text-black" /> */}
                {isPlaying &&
                singleAlbum?.songs.some(
                  (song) => song._id === currentSong?._id
                ) ? (
                  <Pause className="w-7 h-7 text-black" />
                ) : (
                  <Play className="w-7 h-7 text-black" />
                )}
              </Button>
            </div>

            {/* songs table  */}
            <div className="bg-black/20 backdrop-blur-sm">
              <div className="grid grid-cols-[25px_4fr_2fr_1fr] gap-4 px-10 py-2 text-sm text-zinc-400 border-b border-white/5">
                <div>#</div>
                <div>Title</div>
                <div>Released date</div>
                <div>
                  <Clock className="h-4 w-4" />
                </div>
              </div>
              <div className="px-6">
                <div className="space-y-2 py-4">
                  {singleAlbum?.songs.map((song, index) => {
                    const isCurrentSong = currentSong?._id === song?._id;
                    return (
                      <div
                        key={song._id}
                        onClick={() => handlePlaySong(index)}
                        className="grid grid-cols-[25px_4fr_2fr_1fr] gap-4 px-4 py-2 text-sm text-zinc-400 hover:bg-white/5 rounded-md group cursor-pointer"
                      >
                        <div className="flex items-center justify-center">
                          {isCurrentSong && isPlaying ? (
                            <div className="size-4 text-green-500">♫</div>
                          ) : (
                            <span className="group-hover:hidden">
                              {index + 1}
                            </span>
                          )}
                          {!isCurrentSong && (
                            <Play className="h-4 w-4 hidden group-hover:block" />
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          <img
                            src={song?.imageUrl}
                            alt={song?.title}
                            className="size-10"
                          />
                          <>
                            <div className="font-medium text-white">
                              {song?.title}
                            </div>
                            <div>{song?.artist}</div>
                          </>
                        </div>
                        <div className="flex items-center">
                          {song?.createdAt.split("T")[0]}
                        </div>
                        <div className="flex items-center">
                          {formatDuration(song?.duration)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default AlbumPage;
