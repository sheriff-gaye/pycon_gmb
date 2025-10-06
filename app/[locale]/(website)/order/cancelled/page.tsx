'use client';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function OrderCancelled() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">
          Order Cancelled
        </h1>
        <p className="text-lg text-slate-600 mb-4">
          Your order {orderId} was cancelled.
        </p>
        <Link 
          href="/shop" 
          className="bg-yellow-500 text-white px-6 py-3 rounded-lg"
        >
          Back to Shop
        </Link>
      </div>
    </div>
  );
}