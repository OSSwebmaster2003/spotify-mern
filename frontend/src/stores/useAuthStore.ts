import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";

interface IAuthStore {
  loading: boolean;
  isAdmin: boolean;
  error: string | null;

  checkAdminStatus: () => Promise<void>;
  reset: () => void;
}

export const useAuthStore = create<IAuthStore>((set) => ({
  loading: false,
  isAdmin: false,
  error: null,

  checkAdminStatus: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get("/admin/check-admin");
      set({ isAdmin: res.data.admin });
    } catch (error: any) {
      set({ isAdmin: false, error: error.response.data.message });
    } finally {
      set({ loading: false });
    }
  },

  reset: () => {
    set({ isAdmin: false, loading: false, error: null });
  },
}));
