import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { productSchema } from '@/hooks/products';

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const validatedData = productSchema.parse(body);

    const product = await db.product.update({
      where: { id },
      data: {
        name: validatedData.name,
        description: validatedData.description,
        price: validatedData.price,
        originalPrice: validatedData.originalPrice || null,
        image: validatedData.image,
        category: validatedData.category,
        inStock: validatedData.inStock,
        rating: validatedData.rating,
        reviews: validatedData.reviews,
        featured: validatedData.featured,
        isActive: validatedData.isActive,
        order: validatedData.order,
      }
    });

    return NextResponse.json({ success: true, data: product });
  } catch (error: any) {
    console.error('Error updating product:', error);
    
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    await db.product.delete({
      where: { id }
    });

    return NextResponse.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}