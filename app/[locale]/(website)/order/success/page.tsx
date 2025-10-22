'use client';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Package, Mail, ArrowRight, Home, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function OrderSuccess() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Success Animation Container */}
        <div className={`transform transition-all duration-700 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-green-400 rounded-full blur-2xl opacity-30 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-green-400 to-green-600 rounded-full p-6 shadow-xl">
                <CheckCircle className="h-16 w-16 text-white" strokeWidth={2.5} />
              </div>
            </div>
          </div>

          {/* Main Card */}
          <Card className="border-0 shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-8 text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                Order Confirmed!
              </h1>
              <p className="text-green-50 text-lg">
                Thank you for your purchase at PyCon Senegambia 2025
              </p>
            </div>

            <CardContent className="p-8 space-y-6">
              {/* Order ID Section */}
              <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Order Number</p>
                    <p className="text-2xl font-mono font-bold text-slate-900">
                      {orderId ? `#${orderId.substring(0, 12).toUpperCase()}` : 'Processing...'}
                    </p>
                  </div>
                  <Package className="h-12 w-12 text-green-600" />
                </div>
              </div>

              {/* Info Cards */}
              <div className="grid md:grid-cols-2 gap-4">
                {/* Email Card */}
                <div className="bg-blue-50 rounded-lg p-5 border border-blue-200">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 rounded-full p-3">
                      <Mail className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">
                        Check Your Email
                      </h3>
                      <p className="text-sm text-slate-600">
                        Order confirmation and receipt sent to your inbox
                      </p>
                    </div>
                  </div>
                </div>

                {/* Shipping Card */}
                <div className="bg-purple-50 rounded-lg p-5 border border-purple-200">
                  <div className="flex items-start gap-3">
                    <div className="bg-purple-100 rounded-full p-3">
                      <Package className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">
                        Order Processing
                      </h3>
                      <p className="text-sm text-slate-600">
                        We'll notify you when your order ships
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* What's Next Section */}
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-6 border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">✓</span>
                  What happens next?
                </h3>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold">1.</span>
                    <span className="text-sm">You'll receive an email confirmation with your order details</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold">2.</span>
                    <span className="text-sm">We'll process your order and prepare it for shipping</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold">3.</span>
                    <span className="text-sm">You'll get tracking information once your order ships</span>
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button 
                  asChild 
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white h-12 text-base font-semibold shadow-lg shadow-green-600/30"
                >
                  <Link href="/shop">
                    <ShoppingBag className="h-5 w-5 mr-2" />
                    Continue Shopping
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Link>
                </Button>
                <Button 
                  asChild 
                  variant="outline" 
                  className="flex-1 h-12 text-base font-semibold border-2"
                >
                  <Link href="/">
                    <Home className="h-5 w-5 mr-2" />
                    Back to Home
                  </Link>
                </Button>
              </div>

              {/* Support Section */}
              <div className="text-center pt-4 border-t border-slate-200">
                <p className="text-sm text-slate-600">
                  Need help? Contact us at{' '}
                  <a href="mailto:support@pyconsenegambia.org" className="text-green-600 hover:text-green-700 font-semibold">
                    info@pyconsenegambia.org
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>

        
        </div>
      </div>
    </div>
  );
}