import { create } from 'zustand';
import { z } from 'zod';

export const staffSchema = z.object({
  email: z.string().email("Valid email is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  role: z.enum(["ADMIN", "FRONTDESK", "SECURITY"]),
  isActive: z.boolean()
});

export type StaffFormData = z.infer<typeof staffSchema>;

interface Staff {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "ADMIN" | "FRONTDESK" | "SECURITY";
  isActive: boolean;
  lastLogin: string | null;
  createdAt: string;
  updatedAt: string;
  _count?: {
    checkedInTickets: number;
  };
}

interface StaffModalStore {
  isOpen: boolean;
  data: Staff | null;
  isEditing: boolean;
  onOpen: (staff?: Staff, editing?: boolean) => void;
  onClose: () => void;
}

export const useStaffModal = create<StaffModalStore>((set) => ({
  isOpen: false,
  data: null,
  isEditing: false,
  onOpen: (staff, editing = false) => set({
    isOpen: true,
    data: staff || null,
    isEditing: editing
  }),
  onClose: () => set({
    isOpen: false,
    data: null,
    isEditing: false
  }),
}));