import { axiosInstance } from "@/lib/axios";
import { ISong, IAlbum } from "@/types";
import { create } from "zustand";

interface IMusicStore {
  loading: boolean;
  songs: ISong[];
  albums: IAlbum[];
  singleAlbum: IAlbum | null;
  error: string | null;

  fetchAlbums: () => Promise<void>;
  fetchSingleAlbum: (id: string) => Promise<void>;
}

export const useMusicStore = create<IMusicStore>((set) => ({
  loading: false,
  albums: [],
  songs: [],
  singleAlbum: null,
  error: null,

  fetchAlbums: async () => {
    set({ loading: true });

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
    set({ loading: true });
    try {
      const res = await axiosInstance.get(`/albums/${id}`);
      set({ singleAlbum: res.data });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ loading: false });
    }
  },
}));
