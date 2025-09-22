import { create } from "zustand";

export type ConfirmAction = 'delete' | 'deactivate' | 'activate';

export interface ConfirmData {
  userId: string;
  userName: string;
  userEmail: string;
  action: ConfirmAction;
}

type ConfirmModalStore = {
  isOpen: boolean;
  data?: ConfirmData;
  onOpen: (data: ConfirmData) => void;
  onClose: () => void;
}

export const useConfirmModal = create<ConfirmModalStore>((set) => ({
  isOpen: false,
  data: undefined,
  onOpen: (data: ConfirmData) => set({ isOpen: true, data }),
  onClose: () => set({ isOpen: false, data: undefined })
}));