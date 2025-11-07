import { create } from 'zustand';
import { z } from 'zod';

export const scholarshipTicketSchema = z.object({
  customerName: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters"),
  
  customerEmail: z.string()
    .email("Invalid email address")
    .min(1, "Email is required"),
  
  customerPhone: z.string()
    .min(7, "Phone number must be at least 7 characters")
    .max(20, "Phone number must not exceed 20 characters")
    .regex(/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/, 
      "Invalid phone number format"),
  
  ticketType: z.enum(['STUDENTS', 'INDIVIDUAL', 'CORPORATE']),
  
  notes: z.string()
    .max(500, "Notes must not exceed 500 characters")
    .optional()
    .nullable(),
});

export type ScholarshipTicketFormData = z.infer<typeof scholarshipTicketSchema>;

// Default form values
export const defaultScholarshipValues: ScholarshipTicketFormData = {
  customerName: '',
  customerEmail: '',
  customerPhone: '',
  ticketType: 'STUDENTS',
  notes: null,
};

export interface ScholarshipTicketResponse {
  success: boolean;
  message?: string;
  error?: string;
  ticket?: {
    id: string;
    ticketType: string;
    transactionReference: string;
    customerName: string;
    customerEmail: string;
    createdAt: Date | string;
  };
  existingTicket?: {
    id: string;
    ticketType: string;
    transactionReference: string;
  };
  emailError?: string;
}

interface ScholarshipModalStore {
  isOpen: boolean;
  isLoading: boolean;
  onOpen: () => void;
  onClose: () => void;
  setLoading: (loading: boolean) => void;
}

export const useScholarshipModal = create<ScholarshipModalStore>((set) => ({
  isOpen: false,
  isLoading: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false, isLoading: false }),
  setLoading: (loading) => set({ isLoading: loading }),
}));

// API helper function
export async function createScholarshipTicket(
  data: ScholarshipTicketFormData
): Promise<ScholarshipTicketResponse> {
  try {
    const response = await fetch('/api/tickets/scholarship', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result: ScholarshipTicketResponse = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to create scholarship ticket');
    }

    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred');
  }
}