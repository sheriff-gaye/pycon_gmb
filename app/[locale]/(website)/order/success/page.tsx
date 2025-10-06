'use client';
import { useSearchParams } from 'next/navigation';

export default function OrderSuccess() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-green-600 mb-4">
          Order Confirmed!
        </h1>
        <p className="text-lg text-slate-600">
          Order ID: {orderId}
        </p>
        <p className="mt-4">
          Check your email for order confirmation and details.
        </p>
      </div>
    </div>
  );
}