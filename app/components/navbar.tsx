"use client"

import  { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
        
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center overflow-hidden">
              <Image
                src="/images/logo2.png"
                alt="logo"
                height={50}
                width={200}
              />
            </div>
          </div>

         
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link
                href="/"
                className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                About
              </Link>
              <Link
                href="/visas"
                className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Visas
              </Link>
              <Link
                href="/blog"
                className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Blog
              </Link>
              <Link
                href="/speakers"
                className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Speaker
              </Link>
              <Link
                href="/proposal"
                className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Proposal
              </Link>
              <Link
                href="/volunteers"
                className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Volunteers
              </Link>
            </div>
          </div>

          
          <div className="hidden md:block">
            <Link
              href="/register"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Register Now
            </Link>
          </div>

          
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-gray-900 inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
            <Link
              href="/"
              className="text-gray-900 hover:text-blue-600 block px-3 py-2 text-base font-medium"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-gray-600 hover:text-blue-600 block px-3 py-2 text-base font-medium"
            >
              About
            </Link>
            <Link
              href="/visas"
              className="text-gray-600 hover:text-blue-600 block px-3 py-2 text-base font-medium"
            >
              Visas
            </Link>
            <Link
              href="/blog"
              className="text-gray-600 hover:text-blue-600 block px-3 py-2 text-base font-medium"
            >
              Blog
            </Link>
            <Link
              href="/speakers"
              className="text-gray-600 hover:text-blue-600 block px-3 py-2 text-base font-medium"
            >
              Speaker
            </Link>
            <Link
              href="/proposal"
              className="text-gray-600 hover:text-blue-600 block px-3 py-2 text-base font-medium"
            >
              Proposal
            </Link>
            <Link
              href="/volunteers"
              className="text-gray-600 hover:text-blue-600 block px-3 py-2 text-base font-medium"
            >
              Volunteers
            </Link>
            <div className="px-3 py-2">
              <Link
                href="/register"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105 inline-block"
              >
                Register Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;


