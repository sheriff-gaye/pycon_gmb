"use client"

import React, { useState, useCallback } from 'react';
import { ShoppingCart, Plus, Minus, Star, Filter, Grid, List, X, Package, CreditCard, Truck, Check } from 'lucide-react';
import { z } from 'zod';

// Zod schemas for validation
const ProductSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  description: z.string(),
  price: z.number().positive(),
  originalPrice: z.number().positive().optional(),
  image: z.string().url(),
  category: z.enum(['apparel', 'accessories', 'tech', 'books', 'stickers']),
  inStock: z.boolean(),
  rating: z.number().min(0).max(5),
  reviews: z.number().min(0),
  featured: z.boolean().optional()
});

const CartItemSchema = z.object({
  productId: z.string(),
  quantity: z.number().positive(),
  product: ProductSchema
});

const CartSchema = z.object({
  items: z.array(CartItemSchema),
  total: z.number().min(0)
});

type Product = z.infer<typeof ProductSchema>;
type CartItem = z.infer<typeof CartItemSchema>;
type Cart = z.infer<typeof CartSchema>;

const Shop = () => {
  // Sample products data
  const products: Product[] = [
    {
      id: '1',
      name: 'PyCon Senegambia 2024 T-Shirt',
      description: 'Premium cotton t-shirt with exclusive PyCon Senegambia design',
      price: 25,
      originalPrice: 35,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
      category: 'apparel',
      inStock: true,
      rating: 4.8,
      reviews: 124,
      featured: true
    },
    {
      id: '2',
      name: 'Python Logo Hoodie',
      description: 'Comfortable hoodie perfect for coding sessions',
      price: 45,
      originalPrice: 60,
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop',
      category: 'apparel',
      inStock: true,
      rating: 4.9,
      reviews: 89
    },
    {
      id: '3',
      name: 'PyCon Coffee Mug',
      description: 'Start your day with Python and coffee',
      price: 12,
      image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=400&h=400&fit=crop',
      category: 'accessories',
      inStock: true,
      rating: 4.6,
      reviews: 203
    },
    {
      id: '4',
      name: 'Python Sticker Pack',
      description: 'Collection of 10 premium Python and PyCon stickers',
      price: 8,
      originalPrice: 12,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
      category: 'stickers',
      inStock: true,
      rating: 4.7,
      reviews: 156,
      featured: true
    },
    {
      id: '5',
      name: 'Python Programming Book',
      description: 'Advanced Python techniques by conference speakers',
      price: 32,
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop',
      category: 'books',
      inStock: true,
      rating: 4.9,
      reviews: 67
    },
    {
      id: '6',
      name: 'USB Python Drive',
      description: '32GB USB drive with Python resources and conference materials',
      price: 18,
      originalPrice: 25,
      image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=400&fit=crop',
      category: 'tech',
      inStock: false,
      rating: 4.5,
      reviews: 43
    }
  ];

  // State management
  const [cart, setCart] = useState<Cart>({ items: [], total: 0 });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set());

  // Cart functions
  const addToCart = useCallback((product: Product, quantity: number = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.items.find(item => item.productId === product.id);
      let updatedItems;

      if (existingItem) {
        updatedItems = prevCart.items.map(item =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        const newItem: CartItem = {
          productId: product.id,
          quantity,
          product
        };
        updatedItems = [...prevCart.items, newItem];
      }

      const total = updatedItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      
      return { items: updatedItems, total };
    });

    // Show "Added" state
    setAddedItems(prev => new Set(prev).add(product.id));
    
    // Reset after 2 seconds
    setTimeout(() => {
      setAddedItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(product.id);
        return newSet;
      });
    }, 2000);
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart(prevCart => {
      const updatedItems = prevCart.items.filter(item => item.productId !== productId);
      const total = updatedItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      
      return { items: updatedItems, total };
    });
  }, []);

  const updateQuantity = useCallback((productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart(prevCart => {
      const updatedItems = prevCart.items.map(item =>
        item.productId === productId
          ? { ...item, quantity: newQuantity }
          : item
      );
      const total = updatedItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      
      return { items: updatedItems, total };
    });
  }, [removeFromCart]);

  // Filter and sort products
  const filteredProducts = products
    .filter(product => selectedCategory === 'all' || product.category === selectedCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'featured':
        default:
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      }
    });

  const categories = [
    { value: 'all', label: 'All Items' },
    { value: 'apparel', label: 'Apparel' },
    { value: 'accessories', label: 'Accessories' },
    { value: 'tech', label: 'Tech' },
    { value: 'books', label: 'Books' },
    { value: 'stickers', label: 'Stickers' }
  ];

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' }
  ];

  const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <section className="relative py-24 bg-gradient-to-br from-slate-50 via-white to-slate-50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-400/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-500/5 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-yellow-100 to-yellow-200 border border-yellow-300 mb-6">
            <Package className="w-4 h-4 text-yellow-600 mr-2" />
            <span className="text-sm font-semibold text-yellow-800">Official PyCon Merchandise</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="text-slate-800">Shop</span>
            <br />
            <span className="bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 bg-clip-text text-transparent">
              Conference Souvenirs
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Take home a piece of PyCon Senegambia with our exclusive merchandise collection
          </p>
        </div>

        {/* Filters and Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 p-6 bg-white rounded-2xl shadow-lg border border-slate-200">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-600" />
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-transparent border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-yellow-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-yellow-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-6 py-2 rounded-lg hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 shadow-lg"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="font-semibold">Cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className={`grid gap-8 mb-16 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
          {filteredProducts.map((product) => (
            <div key={product.id} className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-200 overflow-hidden ${viewMode === 'list' ? 'flex' : ''}`}>
              {product.featured && (
                <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 px-3 py-1 rounded-full text-xs font-bold">
                  FEATURED
                </div>
              )}

              <div className={`${viewMode === 'list' ? 'w-48 flex-shrink-0' : 'aspect-square'} relative overflow-hidden`}>
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold">
                      Out of Stock
                    </span>
                  </div>
                )}
              </div>

              <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-slate-600">{product.rating}</span>
                    <span className="text-xs text-slate-400">({product.reviews})</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-yellow-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  {product.description}
                </p>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-slate-800">D{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-slate-400 line-through">D{product.originalPrice}</span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => addToCart(product)}
                  disabled={!product.inStock}
                  className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                    product.inStock
                      ? addedItems.has(product.id)
                        ? 'bg-gradient-to-r from-green-500 to-green-600 text-white'
                        : 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white hover:from-yellow-400 hover:to-yellow-500 shadow-lg hover:shadow-xl'
                      : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  {product.inStock ? (
                    <div className="flex items-center justify-center gap-2">
                      {addedItems.has(product.id) ? (
                        <>
                          <Check className="w-4 h-4" />
                          Added to Cart
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" />
                          Add to Cart
                        </>
                      )}
                    </div>
                  ) : (
                    'Out of Stock'
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center bg-white rounded-2xl p-6 border border-slate-200 shadow-lg">
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <Truck className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-bold text-slate-800 mb-2">Free Shipping</h4>
            <p className="text-sm text-slate-600">Free delivery for orders over D100</p>
          </div>

          <div className="text-center bg-white rounded-2xl p-6 border border-slate-200 shadow-lg">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-bold text-slate-800 mb-2">Secure Payment</h4>
            <p className="text-sm text-slate-600">SSL encrypted secure checkout</p>
          </div>

          <div className="text-center bg-white rounded-2xl p-6 border border-slate-200 shadow-lg">
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <Package className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-bold text-slate-800 mb-2">Premium Quality</h4>
            <p className="text-sm text-slate-600">Carefully selected materials and designs</p>
          </div>
        </div>
      </div>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsCartOpen(false)}></div>
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
            <div className="flex flex-col h-full">
              {/* Cart Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-200">
                <h3 className="text-2xl font-bold text-slate-800">Shopping Cart</h3>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {cart.items.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500">Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.items.map((item) => (
                      <div key={item.productId} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-800">{item.product.name}</h4>
                          <p className="text-slate-600">D{item.product.price}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center bg-slate-200 hover:bg-slate-300 rounded-lg transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center font-semibold">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center bg-slate-200 hover:bg-slate-300 rounded-lg transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.productId)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Cart Footer */}
              {cart.items.length > 0 && (
                <div className="border-t border-slate-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xl font-bold text-slate-800">Total:</span>
                    <span className="text-2xl font-bold text-slate-800">D{cart.total.toFixed(2)}</span>
                  </div>
                  <button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-4 rounded-xl font-bold text-lg hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 transform hover:scale-105 shadow-lg">
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Shop;