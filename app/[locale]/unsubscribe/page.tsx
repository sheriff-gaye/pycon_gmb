"use client";

import { Mail, CheckCircle, XCircle, ArrowLeft, Home } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter, useParams } from "next/navigation";


const UnsubscribePage = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');
  const [isUnsubscribed, setIsUnsubscribed] = useState(false);
  
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = useParams();
  const currentLocale = params?.locale as string || 'en';

  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(decodeURIComponent(emailParam));
    }
  }, [searchParams]);

  const handleUnsubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setMessage('Please enter your email address');
      setMessageType('error');
      return;
    }

    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await fetch('/api/unsubscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Successfully unsubscribed from newsletter!');
        setMessageType('success');
        setIsUnsubscribed(true);
      } else {
        setMessage(data.error || 'Failed to unsubscribe');
        setMessageType('error');
      }
    } catch (error) {
      setMessage(`Something went wrong. Please try again. ${error}`);
      setMessageType('error');
    }

    setIsSubmitting(false);
  };

  const handleGoBack = () => {
    router.push(`/${currentLocale}`);
  };

  if (isUnsubscribed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Successfully Unsubscribed
            </h1>
            
            <p className="text-gray-600 mb-8 leading-relaxed">
              You have been successfully unsubscribed from the PyConSeneGambia newsletter. 
              We are sorry to see you go, but you wont receive any more emails from us.
            </p>

            <div className="space-y-4">
              <button
                onClick={handleGoBack}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <Home className="w-4 h-4 mr-2" />
                Back to Homepage
              </button>
              
              <p className="text-sm text-gray-500">
                Changed your mind? You can always subscribe again on our homepage.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-center text-white">
            <div className="flex justify-center mb-4">
              <Image src="/images/logo.png" alt="PyConSeneGambia" height={40} width={160} />
            </div>
            <h1 className="text-2xl font-bold mb-2">Unsubscribe</h1>
            <p className="text-blue-100">
              We are sorry to see you go
            </p>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-red-600" />
              </div>
              <p className="text-gray-600 leading-relaxed">
                Enter your email address below to unsubscribe from the PyConSeneGambia newsletter. 
                You will no longer receive updates about our conferences and events.
              </p>
            </div>

            <form onSubmit={handleUnsubscribe} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                  required
                />
              </div>

              {message && (
                <div className={`p-4 rounded-xl text-sm ${
                  messageType === 'success' 
                    ? 'bg-green-50 text-green-800 border border-green-200' 
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}>
                  <div className="flex items-center">
                    {messageType === 'success' ? (
                      <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                    )}
                    {message}
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Unsubscribing...' : 'Unsubscribe'}
                </button>

                <button
                  type="button"
                  onClick={handleGoBack}
                  className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Homepage
                </button>
              </div>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">Before you go...</h3>
              <p className="text-sm text-gray-600 mb-4">
                Consider adjusting your email preferences instead of unsubscribing completely. 
                You might want to receive only important updates about:
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Conference announcements</li>
                <li>• Early bird ticket releases</li>
                <li>• Special workshops and events</li>
              </ul>
              <p className="text-sm text-gray-500 mt-4">
                If you have feedback about our emails, please contact us at{' '}
                <a href="mailto:info@pyconsenegambia.org" className="text-blue-600 hover:underline">
                  info@pyconsenegambia.org
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnsubscribePage;