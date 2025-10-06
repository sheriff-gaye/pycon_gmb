'use server';

import { getAllProducts } from "@/app/actions/products";
import ProductsTable from "./table";

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

const ProductsPage = async () => {
  const result = await getAllProducts();
  const products: Product[] = result.success && result.data ? result.data : [];

  return (
    <div className="p-4 mt-4">
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <ProductsTable products={products} />
      </main>
    </div>
  );
};

export default ProductsPage;