"use client"

import React, { useState, useCallback, useEffect } from 'react';
import { ShoppingCart, Plus, Minus, Star, Filter, Grid, List, X, Package, CreditCard, Truck, Check } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { getActiveProducts } from '@/app/actions/products';

type ProductCategory = 'APPAREL' | 'ACCESSORIES' | 'TECH' | 'BOOKS' | 'STICKERS';

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number | null;
  image: string;
  category: ProductCategory;
  inStock: boolean;
  rating: number;
  reviews: number;
  featured: boolean;
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
};

type CartItem = {
  productId: string;
  quantity: number;
  product: Product;
};

type Cart = {
  items: CartItem[];
  total: number;
};

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cart, setCart] = useState<Cart>({ items: [], total: 0 });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set());
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: ''
  });
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const result = await getActiveProducts();
        
        if (result.success && result.data) {
          setProducts(result.data);
        } else {
          setError(result.error || 'Failed to load products');
        }
      } catch (err) {
        setError('An error occurred while loading products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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

    setAddedItems(prev => new Set(prev).add(product.id));
    
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

  const handleCheckout = async () => {
    if (!checkoutForm.customerName || !checkoutForm.customerEmail || !checkoutForm.customerPhone) {
      alert('Please fill in all fields');
      return;
    }

    setIsCheckingOut(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cart.items.map(item => ({
            productId: item.productId,
            quantity: item.quantity
          })),
          ...checkoutForm
        }),
      });

      const data = await response.json();

      console.log("test here",data);

      if (data.success) {
        window.location.href = data.data.paymentLink;
      } else {
        alert(data.error || 'Checkout failed');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      alert('An error occurred during checkout');
    } finally {
      setIsCheckingOut(false);
    }
  };

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
    { value: 'APPAREL', label: 'Apparel' },
    { value: 'ACCESSORIES', label: 'Accessories' },
    { value: 'TECH', label: 'Tech' },
    { value: 'BOOKS', label: 'Books' },
    { value: 'STICKERS', label: 'Stickers' }
  ];

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' }
  ];

  const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  if (error) {
    return (
      <section className="relative py-24 bg-linear-to-br from-slate-50 via-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-md mx-auto">
              <p className="text-red-600 font-semibold">{error}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-24 bg-linear-to-br from-slate-50 via-white to-slate-50 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-400/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-500/5 rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-linear-to-r from-yellow-100 to-yellow-200 border border-yellow-300 mb-6">
            <Package className="w-4 h-4 text-yellow-600 mr-2" />
            <span className="text-sm font-semibold text-yellow-800">Official PyCon Merchandise</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
           
            <span className="bg-linear-to-r from-yellow-500 via-yellow-600 to-yellow-700 bg-clip-text text-transparent">
              Conference Souvenirs
            </span>
          </h2>
        </div>

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
              className="relative flex items-center gap-2 bg-linear-to-r from-yellow-500 to-yellow-600 text-white px-6 py-2 rounded-lg hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 shadow-lg"
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

        {loading ? (
          <div className={`grid gap-8 mb-16 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                <Skeleton className="aspect-square w-full" />
                <div className="p-6">
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-4" />
                  <Skeleton className="h-12 w-full rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={`grid gap-8 mb-16 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {filteredProducts.map((product) => (
              <div key={product.id} className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-200 overflow-hidden ${viewMode === 'list' ? 'flex' : ''}`}>
                {product.featured && (
                  <div className="absolute top-4 left-4 z-10 bg-linear-to-r from-yellow-400 to-yellow-500 text-slate-900 px-3 py-1 rounded-full text-xs font-bold">
                    FEATURED
                  </div>
                )}

                <div className={`${viewMode === 'list' ? 'w-48 shrink-0' : 'aspect-square'} relative overflow-hidden`}>
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
                      {product.category.toLowerCase()}
                    </span>
                    {product.reviews > 0 && (
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm text-slate-600">{product.rating.toFixed(1)}</span>
                      </div>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-slate-800 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-slate-600 mb-4">
                    {product.description}
                  </p>

                  <div className="flex items-center gap-2 mb-6">
                    <span className="text-2xl font-bold text-slate-800">D{product.price.toFixed(2)}</span>
                    {product.originalPrice && (
                      <span className="text-slate-400 line-through">D{product.originalPrice.toFixed(2)}</span>
                    )}
                  </div>

                  <button
                    onClick={() => addToCart(product)}
                    disabled={!product.inStock}
                    className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                      product.inStock
                        ? addedItems.has(product.id)
                          ? 'bg-linear-to-r from-green-500 to-green-600 text-white'
                          : 'bg-linear-to-r from-yellow-500 to-yellow-600 text-white hover:from-yellow-400 hover:to-yellow-500 shadow-lg'
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
        )}
      </div>

      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsCartOpen(false)}></div>
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-6 border-b border-slate-200">
                <h3 className="text-2xl font-bold text-slate-800">Shopping Cart</h3>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

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
                          <p className="text-slate-600">D{item.product.price.toFixed(2)}</p>
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

              {cart.items.length > 0 && (
                <div className="border-t border-slate-200 p-6">
                  {!showCheckoutForm ? (
                    <>
                      <div className="flex items-center justify-between mb-6">
                        <span className="text-xl font-bold text-slate-800">Total:</span>
                        <span className="text-2xl font-bold text-slate-800">D{cart.total.toFixed(2)}</span>
                      </div>
                      <button 
                        onClick={() => setShowCheckoutForm(true)}
                        className="w-full bg-linear-to-r from-yellow-500 to-yellow-600 text-white py-4 rounded-xl font-bold text-lg hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 shadow-lg"
                      >
                        Proceed to Checkout
                      </button>
                    </>
                  ) : (
                    <div className="space-y-4">
                      <h4 className="font-bold text-lg mb-4">Customer Information</h4>
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={checkoutForm.customerName}
                        onChange={(e) => setCheckoutForm({...checkoutForm, customerName: e.target.value})}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      />
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={checkoutForm.customerEmail}
                        onChange={(e) => setCheckoutForm({...checkoutForm, customerEmail: e.target.value})}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      />
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        value={checkoutForm.customerPhone}
                        onChange={(e) => setCheckoutForm({...checkoutForm, customerPhone: e.target.value})}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => setShowCheckoutForm(false)}
                          className="flex-1 bg-slate-200 text-slate-700 py-3 rounded-lg font-semibold hover:bg-slate-300 transition-colors"
                        >
                          Back
                        </button>
                        <button
                          onClick={handleCheckout}
                          disabled={isCheckingOut}
                          className="flex-1 bg-linear-to-r from-yellow-500 to-yellow-600 text-white py-3 rounded-lg font-semibold hover:from-yellow-400 hover:to-yellow-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isCheckingOut ? 'Processing...' : 'Complete Payment'}
                        </button>
                      </div>
                    </div>
                  )}
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