import { create } from 'zustand';
import { z } from 'zod';

// Zod schema for validation
export const sponsorSchema = z.object({
  name: z.string().min(1, "Sponsor name is required"),
  logo: z.string().url("Logo must be a valid URL"),
  website: z.string().url("Website must be a valid URL").optional().or(z.literal("")),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
  order: z.number().int().min(0, "Order must be a non-negative integer").default(0)
});

export type SponsorFormData = z.infer<typeof sponsorSchema>;

interface Sponsor {
  id: string;
  name: string;
  logo: string;
  website: string | null;
  description: string | null;
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

interface SponsorModalStore {
  isOpen: boolean;
  data: Sponsor | null;
  isEditing: boolean;
  onOpen: (sponsor?: Sponsor, editing?: boolean) => void;
  onClose: () => void;
}

export const useSponsorModal = create<SponsorModalStore>((set) => ({
  isOpen: false,
  data: null,
  isEditing: false,
  onOpen: (sponsor, editing = false) => set({ 
    isOpen: true, 
    data: sponsor || null, 
    isEditing: editing 
  }),
  onClose: () => set({ 
    isOpen: false, 
    data: null, 
    isEditing: false 
  }),
}));