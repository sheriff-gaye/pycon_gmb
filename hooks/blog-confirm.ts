import { create } from "zustand";

export interface BlogConfirmData {
  postId: string;
  postTitle: string;
}

type BlogConfirmModalStore = {
  isOpen: boolean;
  data?: BlogConfirmData;
  onOpen: (data: BlogConfirmData) => void;
  onClose: () => void;
}

export const useBlogConfirmModal = create<BlogConfirmModalStore>((set) => ({
  isOpen: false,
  data: undefined,
  onOpen: (data: BlogConfirmData) => set({ isOpen: true, data }),
  onClose: () => set({ isOpen: false, data: undefined })
}));

