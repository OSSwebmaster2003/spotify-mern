import { axiosInstance } from "@/lib/axios";
import { ISong, IAlbum, IStats } from "@/types";
import toast from "react-hot-toast";
import { create } from "zustand";

interface IMusicStore {
  loading: boolean;
  songs: ISong[];
  albums: IAlbum[];
  singleAlbum: IAlbum | null;
  error: string | null;
  madeForYouSongs: ISong[];
  trendingSongs: ISong[];
  featuredSongs: ISong[];
  stats: IStats;

  fetchAlbums: () => Promise<void>;
  fetchSingleAlbum: (id: string) => Promise<void>;
  fetchMadeForYouSongs: () => Promise<void>;
  fetchTrensingSongs: () => Promise<void>;
  fetchFeaturedSongs: () => Promise<void>;
  fetchStats: () => Promise<void>;
  fetchSongs: () => Promise<void>;
  deleteSong: (id: string) => Promise<void>;
  deleteAlbum: (id: string) => Promise<void>;
}

export const useMusicStore = create<IMusicStore>((set) => ({
  loading: false,
  albums: [],
  songs: [],
  singleAlbum: null,
  error: null,
  madeForYouSongs: [],
  trendingSongs: [],
  featuredSongs: [],
  stats: {
    totalSongs: 0,
    totalAlbums: 0,
    totalUsers: 0,
    totalArtists: 0,
  },

  fetchAlbums: async () => {
    set({ loading: true, error: null });

    try {
      const res = await axiosInstance.get("/albums");
      set({ albums: res.data });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ loading: false });
    }
  },

  fetchSingleAlbum: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get(`/albums/${id}`);
      set({ singleAlbum: res.data });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ loading: false });
    }
  },

  fetchMadeForYouSongs: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance("/songs/made-for-you");
      set({ madeForYouSongs: res.data });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ loading: false });
    }
  },

  fetchTrensingSongs: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance("/songs/trending");
      set({ trendingSongs: res.data });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ loading: false });
    }
  },

  fetchFeaturedSongs: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance("/songs/featured");
      set({ featuredSongs: res.data });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ loading: false });
    }
  },

  fetchStats: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get("/stats");
      set({ stats: response.data });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  fetchSongs: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get("/songs");
      set({ songs: res?.data });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  deleteSong: async (id: string) => {
    set({ loading: true, error: null });
    try {
      await axiosInstance.delete(`/admin/songs/${id}`);

      set((state) => ({
        songs: state.songs.filter((song) => song._id !== id),
      }));
      toast.success("Song deleted successfully");
    } catch (error: any) {
      console.log("Error in deleteSong", error);
      toast.error("Error deleting song");
    } finally {
      set({ loading: false });
    }
  },

  deleteAlbum: async (id: string) => {
    set({ loading: true, error: null });
    try {
      await axiosInstance.delete(`admin/albums/${id}`);

      set((state) => ({
        albums: state.albums.filter((album) => album._id !== id),
        songs: state.songs.map((song) =>
          song.albumId === state.albums.find((a) => a._id === id)?.title
            ? { ...song, album: null }
            : song
        ),
      }));

      toast.success("Album deleted successfully");
    } catch (error: any) {
      set({ error: error.message });
      toast.error("Error deleting album");
    } finally {
      set({ loading: false });
    }
  },
}));
