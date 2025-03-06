import { axiosInstance } from "@/lib/axios";
import { ISong, IAlbum } from "@/types";
import { create } from "zustand";

interface IMusicStore {
  loading: boolean;
  songs: ISong[];
  albums: IAlbum[];
  error: string | null;

  fetchAlbums: () => Promise<void>;
}

export const useMusicStore = create<IMusicStore>((set) => ({
  loading: false,
  albums: [],
  songs: [],
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
}));
