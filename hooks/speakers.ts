import { create } from 'zustand';
import { z } from 'zod';

// Zod schema for validation
export const speakerSchema = z.object({
  name: z.string().min(1, "Speaker name is required"),
  title: z.string().min(1, "Title is required"),
  company: z.string().optional().nullable(),
  location: z.string().min(1, "Location is required"),
  image: z.string().min(1, "Speaker image is required"),
  bio: z.string().min(1, "Bio is required"),
  expertise: z.array(z.string()).min(1, "At least one expertise is required"),
  isKeynote: z.boolean().default(false),
  isActive: z.boolean().default(true),
  order: z.number().int().min(0, "Order must be a non-negative integer").default(0),
  
  // Session details
  sessionTitle: z.string().min(1, "Session title is required"),
  sessionDescription: z.string().min(1, "Session description is required"),
  sessionDuration: z.string().min(1, "Session duration is required"),
  sessionTrack: z.string().min(1, "Session track is required"),
  sessionLevel: z.string().min(1, "Session level is required"),
  
  // Social links (optional)
  linkedin: z.string().optional().nullable(),
  twitter: z.string().optional().nullable(),
  github: z.string().optional().nullable(),
});

export type SpeakerFormData = z.infer<typeof speakerSchema>;

interface Speaker {
  id: string;
  name: string;
  title: string;
  company: string;
  location: string;
  image: string;
  bio: string;
  expertise: string[];
  isKeynote: boolean;
  isActive: boolean;
  order: number;
  sessionTitle: string;
  sessionDescription: string;
  sessionDuration: string;
  sessionTrack: string;
  sessionLevel: string;
  linkedin: string | null;
  twitter: string | null;
  github: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface SpeakerModalStore {
  isOpen: boolean;
  data: Speaker | null;
  isEditing: boolean;
  onOpen: (speaker?: Speaker, editing?: boolean) => void;
  onClose: () => void;
}

export const useSpeakerModal = create<SpeakerModalStore>((set) => ({
  isOpen: false,
  data: null,
  isEditing: false,
  onOpen: (speaker, editing = false) => set({ 
    isOpen: true, 
    data: speaker || null, 
    isEditing: editing 
  }),
  onClose: () => set({ 
    isOpen: false, 
    data: null, 
    isEditing: false 
  }),
}));