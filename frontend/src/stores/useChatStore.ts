import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";

interface IChatStore {
  loading: boolean;
  users: any[];
  error: string | null;

  fetchUsers: () => Promise<void>;
}

export const useChatStore = create<IChatStore>((set) => ({
  users: [],
  loading: false,
  error: null,

  fetchUsers: async () => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get("/users");
      set({ users: res.data });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ loading: false });
    }
  },
}));
