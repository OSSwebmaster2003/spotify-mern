import { axiosInstance } from "@/lib/axios";
import { ISong, IAlbum } from "@/types";
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

  fetchAlbums: () => Promise<void>;
  fetchSingleAlbum: (id: string) => Promise<void>;
  fetchMadeForYouSongs: () => Promise<void>;
  fetchTrensingSongs: () => Promise<void>;
  fetchFeaturedSongs: () => Promise<void>;
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
}));
