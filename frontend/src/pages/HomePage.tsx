import FeaturedSection from "@/components/FeaturedSection";
import SectionGrid from "@/components/SectionGrid";
import TopBar from "@/components/TopBar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMusicStore } from "@/stores/useMusicStore";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { useEffect } from "react";

const HomePage = () => {
  const {
    loading,
    featuredSongs,
    fetchMadeForYouSongs,
    trendingSongs,
    fetchFeaturedSongs,
    fetchTrensingSongs,
    madeForYouSongs,
  } = useMusicStore();

  const { initializeQueue } = usePlayerStore();

  useEffect(() => {
    if (
      madeForYouSongs.length &&
      trendingSongs.length &&
      featuredSongs.length
    ) {
      const allSongs = [...featuredSongs, ...madeForYouSongs, ...trendingSongs];
      initializeQueue(allSongs);
    }
  }, [initializeQueue, madeForYouSongs, featuredSongs, trendingSongs]);

  useEffect(() => {
    fetchMadeForYouSongs();
    fetchTrensingSongs();
    fetchFeaturedSongs();
  }, [fetchMadeForYouSongs, fetchFeaturedSongs, fetchTrensingSongs]);
  return (
    <main className="rounded-md overflow-hidden h-full bg-gradient-to-b from-zinc-800 to-zinc-900">
      <TopBar />
      <ScrollArea className="h-[calc(100vh-180px)]">
        <div className="p-4 sm:p-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6">
            Good Afternoon
          </h1>
          <FeaturedSection />
        </div>
        <div className="space-y-8">
          <SectionGrid
            title="Made for you"
            songs={madeForYouSongs}
            loading={loading}
          />
          <SectionGrid
            title="Trending"
            songs={trendingSongs}
            loading={loading}
          />
        </div>
      </ScrollArea>
    </main>
  );
};

export default HomePage;
