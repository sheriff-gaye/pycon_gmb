"use client"

import { useState } from "react";
import { Menu, X, Globe } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { getTranslation } from "@/lib/i18n";
import Logo from "../../../public/images/logo.png"
import { HeroProps } from "./interfaces/interface";

const Navbar = ({currentLocale}: HeroProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleLangDropdown = () => setLangDropdownOpen(!langDropdownOpen);
  const closeMenu = () => setIsOpen(false); // Add this helper function

  const locale = currentLocale || 'en';

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
  ];

  const handleLanguageChange = (newLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    const newPath = segments.join('/');
    router.push(newPath);
    setLangDropdownOpen(false);
    setIsOpen(false); // Close mobile menu when language changes
  };

  const currentLang = languages.find(lang => lang.code === locale) || languages[0];

  if (!currentLocale) {
    return (
      <nav className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center overflow-hidden">
                <Link href="/">
                  <Image
                    src={Logo}
                    alt="logo"
                    height={80}
                    width={80}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
        
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center overflow-hidden">
                <Link href="/">
              <Image
                src={Logo}
                alt="logo"
                height={80}
                width={80}
              />
              </Link>
            </div>
          </div>

         
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
             
              <Link
                href={`/${locale}/about`}
                className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                {getTranslation(locale, 'nav.about')}
              </Link>
              <Link
                href={`/${locale}/visas`}
                className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                {getTranslation(locale, 'nav.visas')}
              </Link>
              <Link
                href={`/${locale}/blog`}
                className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                {getTranslation(locale, 'nav.blog')}
              </Link>
              <Link
                href={`/${locale}/speakers`}
                className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                {getTranslation(locale, 'nav.speakers')}
              </Link>
              <Link
                href={`/${locale}/proposal`}
                className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                {getTranslation(locale, 'nav.proposal')}
              </Link>
              <Link
                href={`/${locale}/volunteers`}
                className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                {getTranslation(locale, 'nav.volunteers')}
              </Link>
            </div>
          </div>

          
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href={`/${locale}/register`}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              {getTranslation(locale, 'nav.register')}
            </Link>

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={toggleLangDropdown}
                className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 px-3 py-2 rounded-lg transition-colors"
              >
                <Globe size={18} />
                <span className="text-sm font-medium">{currentLang.flag}</span>
                <span className="text-sm font-medium">{currentLang.code.toUpperCase()}</span>
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center space-x-3 ${
                        locale === lang.code ? 'text-blue-600 bg-blue-50' : 'text-gray-700'
                      }`}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
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
              href={`/${locale}/about`}
              className="text-gray-600 hover:text-blue-600 block px-3 py-2 text-base font-medium"
              onClick={closeMenu}
            >
              {getTranslation(locale, 'nav.about')}
            </Link>
            <Link
              href={`/${locale}/visas`}
              className="text-gray-600 hover:text-blue-600 block px-3 py-2 text-base font-medium"
              onClick={closeMenu}
            >
              {getTranslation(locale, 'nav.visas')}
            </Link>
            <Link
              href={`/${locale}/blog`}
              className="text-gray-600 hover:text-blue-600 block px-3 py-2 text-base font-medium"
              onClick={closeMenu}
            >
              {getTranslation(locale, 'nav.blog')}
            </Link>
            <Link
              href={`/${locale}/speakers`}
              className="text-gray-600 hover:text-blue-600 block px-3 py-2 text-base font-medium"
              onClick={closeMenu}
            >
              {getTranslation(locale, 'nav.speakers')}
            </Link>
            <Link
              href={`/${locale}/proposal`}
              className="text-gray-600 hover:text-blue-600 block px-3 py-2 text-base font-medium"
              onClick={closeMenu}
            >
              {getTranslation(locale, 'nav.proposal')}
            </Link>
            <Link
              href={`/${locale}/volunteers`}
              className="text-gray-600 hover:text-blue-600 block px-3 py-2 text-base font-medium"
              onClick={closeMenu}
            >
              {getTranslation(locale, 'nav.volunteers')}
            </Link>
            
            <div className="px-3 py-2">
              <Link
                href={`/${locale}/register`}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105 inline-block"
                onClick={closeMenu}
              >
                {getTranslation(locale, 'nav.register')}
              </Link>
            </div>

            {/* Mobile Language Switcher */}
            <div className="px-3 py-2 border-t border-gray-200">
              <div className="text-gray-600 text-sm font-medium mb-2">{getTranslation(locale, 'common.language')}</div>
              <div className="space-y-1">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center space-x-3 ${
                      locale === lang.code
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-lg">{lang.flag}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;