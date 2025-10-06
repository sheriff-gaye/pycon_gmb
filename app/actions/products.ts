"use server";

import { db } from "@/lib/db";

export async function getAllProducts() {
  try {
    const products = await db.product.findMany({
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' }
      ]
    });

    const serializedProducts = products.map(product => ({
      ...product,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt
    }));

    return { 
      success: true, 
      data: serializedProducts,
      count: serializedProducts.length 
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { 
      success: false, 
      error: "Failed to fetch products",
      data: [],
      count: 0
    };
  }
}

export async function getActiveProducts() {
  try {
    const products = await db.product.findMany({
      where: {
        isActive: true,
        inStock: true
      },
      orderBy: [
        { featured: 'desc' },
        { order: 'asc' },
        { createdAt: 'desc' }
      ]
    });
    
    const serializedProducts = products.map(product => ({
      ...product,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt
    }));

    return {
      success: true,
      data: serializedProducts,
      count: serializedProducts.length
    };
  } catch (error) {
    console.error("Error fetching active products:", error);
    return {
      success: false,
      error: "Failed to fetch active products",
      data: [],
      count: 0
    };
  }
}

export async function getProductsByCategory(category: string) {
  try {
    const products = await db.product.findMany({
      where: {
        isActive: true,
        inStock: true,
        category: category as any
      },
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' }
      ]
    });

    return {
      success: true,
      data: products,
      count: products.length
    };
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return {
      success: false,
      error: "Failed to fetch products",
      data: [],
      count: 0
    };
  }
}

export async function getActiveProductsCount() {
  try {
    return await db.product.count({
      where: {
        isActive: true,
        inStock: true
      }
    });
  } catch (error) {
    console.error("Error counting products:", error);
    return 0;
  }
}