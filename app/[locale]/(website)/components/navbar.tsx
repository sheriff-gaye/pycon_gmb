"use client"

import { useState } from "react";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { getTranslation } from "@/lib/i18n";
import { HeroProps } from "./interfaces/interface";
import RegistrationModal from "./register_modal";

interface DropdownItem {
  href: string;
  label: string;
  badge: 'new' | 'coming' | null;
  disabled?: boolean;
}

interface DropdownMenu {
  label: string;
  items: DropdownItem[];
}

interface Language {
  code: string;
  name: string;
  flag: string;
}

const Navbar = ({currentLocale}: HeroProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileDropdowns, setMobileDropdowns] = useState<{[key: string]: boolean}>({});
  
  const router = useRouter();
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleLangDropdown = () => setLangDropdownOpen(!langDropdownOpen);
  const closeMenu = () => {
    setIsOpen(false);
    setMobileDropdowns({});
  };
  const openRegistrationModal = () => {
    setIsRegistrationModalOpen(true);
    setIsOpen(false);
  };
  const closeRegistrationModal = () => setIsRegistrationModalOpen(false);

  const toggleMobileDropdown = (key: string) => {
    setMobileDropdowns(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const locale = currentLocale || 'en';

  const languages: Language[] = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
  ];

  const handleLanguageChange = (newLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    const newPath = segments.join('/');
    router.push(newPath);
    setLangDropdownOpen(false);
    setIsOpen(false);
  };

  const currentLang = languages.find(lang => lang.code === locale) || languages[0];

  // Define dropdown menus
  const dropdownMenus: {[key: string]: DropdownMenu} = {
    events: {
      label: getTranslation(locale, 'nav.events') || 'Events',
      items: [
        { href: `/${locale}/speakers`, label: getTranslation(locale, 'nav.speakers') || 'Speakers', badge: null },
        { href: `/${locale}/tech-events`, label: 'Tech Events', badge: 'coming', disabled: true },
      ]
    },
    resources: {
      label: getTranslation(locale, 'nav.resources') || 'Resources',
      items: [
        { href: `/${locale}/blog`, label: getTranslation(locale, 'nav.blog') || 'Blog', badge: null },
        { href: `/${locale}/visas`, label: getTranslation(locale, 'nav.visas') || 'Visas', badge: null },
        { href: `/${locale}/podcast`, label: 'Podcast', badge: 'coming', disabled: true },
      ]
    },
    participate: {
      label: getTranslation(locale, 'nav.participate') || 'Participate',
      items: [
        { href: `/${locale}/sponsorship`, label: getTranslation(locale, 'nav.sponsorship') || 'Sponsorship', badge: null },
        { href: `/${locale}/proposal`, label: getTranslation(locale, 'nav.proposal') || 'Proposal', badge: null },
        { href: `/${locale}/volunteers`, label: getTranslation(locale, 'nav.volunteers') || 'Volunteers', badge: null },
      ]
    },
    more: {
      label: getTranslation(locale, 'nav.more') || 'More',
      items: [
        { href: `/${locale}/shop`, label: 'Shop', badge: 'coming', disabled: true },
        { href: `/${locale}/careers`, label: 'Careers', badge: 'new' },
      ]
    }
  };

  const Badge = ({ type }: { type: 'new' | 'coming' }) => (
    <span className={`ml-2 text-[10px] font-bold px-1.5 py-0.5 rounded ${
      type === 'new' 
        ? 'bg-green-100 text-green-700' 
        : 'bg-blue-100 text-blue-700'
    }`}>
      {type === 'new' ? 'NEW' : 'COMING'}
    </span>
  );

  if (!currentLocale) {
    return (
      <>
        <nav className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center">
                <div className="shrink-0 flex items-center overflow-hidden">
                  <Link href="/" >
                    <Image
                      src="/images/logo.png"
                      alt="logo"
                      height={80}
                      width={80}
                      className="object-contain"
                    />
                  </Link>
                </div>
              </div>  
            </div>
          </div>
        </nav>
        
        <RegistrationModal 
          isOpen={isRegistrationModalOpen}
          onClose={closeRegistrationModal}
          currentLocale={locale}
        />
      </>
    );
  }

  return (
    <>
      <nav className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
          
            <div className="flex items-center">
              <div className="shrink-0 flex items-center overflow-hidden">
                <Link href={`/${locale}`}>
                  <Image
                    src="/images/logo.png"
                    alt="logo"
                    height={80}
                    width={80}
                    className="object-contain"
                  />
                </Link>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-1">
                <Link
                  aria-label="about"
                  href={`/${locale}/about`}
                  className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  {getTranslation(locale, 'nav.about')}
                </Link>
                
                {Object.entries(dropdownMenus).map(([key, menu]) => (
                  <div 
                    key={key}
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(key)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      aria-label={menu.label}
                      className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors flex items-center"
                    >
                      {menu.label}
                      <ChevronDown size={16} className="ml-1" />
                    </button>

                    {activeDropdown === key && (
                      <div className="absolute left-0 mt-0 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                        {menu.items.map((item) => (
                          item.disabled ? (
                            <div
                              key={item.href}
                              className="block px-4 py-2 text-sm text-gray-400 cursor-not-allowed"
                            >
                              <span className="flex items-center justify-between">
                                <span>{item.label}</span>
                                {item.badge && <Badge type={item.badge} />}
                              </span>
                            </div>
                          ) : (
                            <Link
                              key={item.href}
                              href={item.href}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                            >
                              <span className="flex items-center justify-between">
                                <span>{item.label}</span>
                                {item.badge && <Badge type={item.badge} />}
                              </span>
                            </Link>
                          )
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop CTA & Language */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                aria-label="register"
                onClick={openRegistrationModal}
                className="bg-linear-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-sm font-medium"
              >
                {getTranslation(locale, 'nav.register')}
              </button>

              {/* Language Switcher */}
              <div className="relative">
                <button
                  aria-label="language"
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
                        aria-label={lang.name}
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

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                aria-label="menu"
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
                aria-label="about"
                href={`/${locale}/about`}
                className="text-gray-600 hover:text-blue-600 px-3 py-2 text-base font-medium block"
                onClick={closeMenu}
              >
                {getTranslation(locale, 'nav.about')}
              </Link>
              
              {Object.entries(dropdownMenus).map(([key, menu]) => (
                <div key={key}>
                  <button
                    aria-label={menu.label}
                    onClick={() => toggleMobileDropdown(key)}
                    className="w-full text-left text-gray-600 hover:text-blue-600 px-3 py-2 text-base font-medium flex items-center justify-between"
                  >
                    {menu.label}
                    <ChevronDown 
                      size={16} 
                      className={`transform transition-transform ${mobileDropdowns[key] ? 'rotate-180' : ''}`}
                    />
                  </button>
                  
                  {mobileDropdowns[key] && (
                    <div className="pl-4 space-y-1">
                      {menu.items.map((item) => (
                        item.disabled ? (
                          <div
                            key={item.href}
                            className="block px-3 py-2 text-sm text-gray-400 cursor-not-allowed"
                          >
                            <span className="flex items-center justify-between">
                              <span>{item.label}</span>
                              {item.badge && <Badge type={item.badge} />}
                            </span>
                          </div>
                        ) : (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded"
                            onClick={closeMenu}
                          >
                            <span className="flex items-center justify-between">
                              <span>{item.label}</span>
                              {item.badge && <Badge type={item.badge} />}
                            </span>
                          </Link>
                        )
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              <div className="px-3 py-2 pt-4">
                <button
                  aria-label="register mobile"
                  onClick={openRegistrationModal}
                  className="w-full bg-linear-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  {getTranslation(locale, 'nav.register')}
                </button>
              </div>

              {/* Mobile Language Switcher */}
              <div className="px-3 py-2 border-t border-gray-200 mt-2">
                <div className="text-gray-600 text-sm font-medium mb-2">{getTranslation(locale, 'common.language') || 'Language'}</div>
                <div className="space-y-1">
                  {languages.map((lang) => (
                    <button
                      aria-label={lang.name}
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
      
      {/* Registration Modal */}
      <RegistrationModal 
        isOpen={isRegistrationModalOpen}
        onClose={closeRegistrationModal}
        currentLocale={locale}
      />
    </>
  );
};

export default Navbar;