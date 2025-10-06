import { create } from 'zustand';
import { z } from 'zod';

// Zod schema for validation
export const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().positive("Price must be positive"),
  originalPrice: z.number().positive().optional().nullable(),
  image: z.string().min(1, "Product image is required"),
  category: z.enum(['APPAREL', 'ACCESSORIES', 'TECH', 'BOOKS', 'STICKERS']),
  inStock: z.boolean().default(true),
  rating: z.number().min(0).max(5).default(0),
  reviews: z.number().min(0).default(0),
  featured: z.boolean().default(false),
  isActive: z.boolean().default(true),
  order: z.number().int().min(0, "Order must be a non-negative integer").default(0)
});

export type ProductFormData = z.infer<typeof productSchema>;

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number | null;
  image: string;
  category: 'APPAREL' | 'ACCESSORIES' | 'TECH' | 'BOOKS' | 'STICKERS';
  inStock: boolean;
  rating: number;
  reviews: number;
  featured: boolean;
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

interface ProductModalStore {
  isOpen: boolean;
  data: Product | null;
  isEditing: boolean;
  onOpen: (product?: Product, editing?: boolean) => void;
  onClose: () => void;
}

export const useProductModal = create<ProductModalStore>((set) => ({
  isOpen: false,
  data: null,
  isEditing: false,
  onOpen: (product, editing = false) => set({ 
    isOpen: true, 
    data: product || null, 
    isEditing: editing 
  }),
  onClose: () => set({ 
    isOpen: false, 
    data: null, 
    isEditing: false 
  }),
}));