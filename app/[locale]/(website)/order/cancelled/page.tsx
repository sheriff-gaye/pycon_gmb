'use client';
import { useSearchParams } from 'next/navigation';
import { XCircle, ShoppingBag, ArrowRight, Home, HelpCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function OrderCancelled() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const reason = searchParams.get('reason');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Animation Container */}
        <div className={`transform transition-all duration-700 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* Cancelled Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-red-400 rounded-full blur-2xl opacity-20"></div>
              <div className="relative bg-gradient-to-br from-red-400 to-red-600 rounded-full p-6 shadow-xl">
                <XCircle className="h-16 w-16 text-white" strokeWidth={2.5} />
              </div>
            </div>
          </div>

          {/* Main Card */}
          <Card className="border-0 shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-red-500 to-red-600 p-8 text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                Order Cancelled
              </h1>
              <p className="text-red-50 text-lg">
                Your payment was not completed
              </p>
            </div>

            <CardContent className="p-8 space-y-6">
              {/* Order ID Section */}
              {orderId && (
                <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Cancelled Order</p>
                      <p className="text-xl font-mono font-bold text-slate-900">
                        #{orderId.substring(0, 12).toUpperCase()}
                      </p>
                    </div>
                    <div className="bg-red-100 rounded-full px-4 py-2">
                      <span className="text-red-700 font-semibold text-sm">CANCELLED</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Reason Section */}
              {reason && (
                <div className="bg-orange-50 rounded-lg p-5 border border-orange-200">
                  <div className="flex items-start gap-3">
                    <div className="bg-orange-100 rounded-full p-2 mt-1">
                      <HelpCircle className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">
                        Cancellation Reason
                      </h3>
                      <p className="text-sm text-slate-700">
                        {reason}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* What Happened Section */}
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-6 border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="bg-slate-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">?</span>
                  What happened?
                </h3>
                <p className="text-slate-700 text-sm mb-4">
                  Your order was cancelled and no payment was processed. This can happen for several reasons:
                </p>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-slate-400">•</span>
                    <span>Payment was cancelled or not completed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-400">•</span>
                    <span>Browser or payment window was closed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-400">•</span>
                    <span>Session expired during checkout</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-400">•</span>
                    <span>Payment method was declined</span>
                  </li>
                </ul>
              </div>

              {/* Reassurance Box */}
              <div className="bg-blue-50 rounded-lg p-5 border border-blue-200">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 rounded-full p-3">
                    <RefreshCw className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">
                      No Charges Were Made
                    </h3>
                    <p className="text-sm text-slate-600">
                      Don't worry! Your payment method was not charged. You can try again anytime.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button 
                  asChild 
                  className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white h-12 text-base font-semibold shadow-lg shadow-orange-500/30"
                >
                  <Link href="/shop">
                    <ShoppingBag className="h-5 w-5 mr-2" />
                    Try Again - Back to Shop
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
                <p className="text-sm text-slate-600 mb-2">
                  Having trouble completing your order?
                </p>
                <a 
                  href="mailto:info@pyconsenegambia.org" 
                  className="text-blue-600 hover:text-blue-700 font-semibold text-sm inline-flex items-center gap-1"
                >
                  <HelpCircle className="h-4 w-4" />
                  Contact Support
                </a>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}