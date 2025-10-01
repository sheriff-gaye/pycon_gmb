"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { getTranslation } from "@/lib/i18n";
import { getActiveSponsors } from "@/app/actions/sponsors";
import { Skeleton } from "@/components/ui/skeleton";

interface Sponsor {
  id: string;
  name: string;
  logo: string;
  website: string | null; 
  description: string | null; 
  isActive: boolean; 
  order: number; 
  createdAt: Date;
  updatedAt: Date;
}

interface SponsorsProps {
  currentLocale: string;
}

const Sponsors = ({ currentLocale }: SponsorsProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [swiperLoaded, setSwiperLoaded] = useState(false);

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const result = await getActiveSponsors();
        if (result.success) {
          setSponsors(result.data);
        } else {
          setError(result.error || "Failed to load sponsors");
        }
      } catch (err) {
        setError("Failed to load sponsors");
        console.error("Error loading sponsors:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSponsors();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Load Swiper CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/Swiper/11.0.5/swiper-bundle.min.css';
    document.head.appendChild(link);

    // Load Swiper JS
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/Swiper/11.0.5/swiper-bundle.min.js';
    script.onload = () => {
      setSwiperLoaded(true);
    };
    document.body.appendChild(script);

    return () => {
      document.head.removeChild(link);
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (swiperLoaded && sponsors.length > 0) {
      // @ts-ignore
      new window.Swiper('.sponsors-swiper', {
        slidesPerView: 2,
        spaceBetween: 30,
        loop: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: true,
        },
        speed: 800,
        breakpoints: {
          640: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 60,
          },
          1280: {
            slidesPerView: 6,
            spaceBetween: 60,
          },
        },
        effect: 'slide',
        grabCursor: true,
      });
    }
  }, [swiperLoaded, sponsors]);

  const handleSponsorClick = (sponsor: Sponsor) => {
    if (sponsor.website) {
      window.open(sponsor.website, '_blank', 'noopener,noreferrer');
    }
  };

  if (loading) {
    return (
      <section className="bg-slate-900 py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-800/20 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <Skeleton className="h-8 md:h-10 w-64 mx-auto mb-4 bg-slate-800" />
            <Skeleton className="h-4 w-96 max-w-2xl mx-auto bg-slate-800" />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="flex justify-center">
                <Skeleton className="h-16 md:h-20 w-full bg-slate-800 rounded-xl" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (sponsors.length === 0) {
    return null; 
  }

  return (
    <section className="bg-slate-900 py-16 md:py-24 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-800/20 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className={`text-center mb-16 transform transition-all duration-1000 ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-blue-400 bg-clip-text text-transparent">
              {getTranslation(currentLocale, 'sponsors.title')}
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            {getTranslation(currentLocale, 'sponsors.subtitle')}
          </p>
        </div>

        <div
          className={`transform transition-all duration-1000 delay-300 ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="sponsors-swiper overflow-hidden">
            <div className="swiper-wrapper">
              {sponsors.map((sponsor) => (
                <div
                  key={sponsor.id}
                  className="swiper-slide"
                >
                  <div
                    onClick={() => handleSponsorClick(sponsor)}
                    className={`group relative p-6 h-32 flex items-center justify-center transition-all duration-500 hover:scale-110 ${
                      sponsor.website ? 'cursor-pointer' : ''
                    }`}
                  >
                    
                    <Image
                      src={sponsor.logo}
                      alt={sponsor.name}
                      width={200}
                      height={80}
                      className="relative z-10 max-h-20 w-auto object-contain filter brightness-90 group-hover:brightness-110 transition-all duration-500 group-hover:scale-110"
                    />
                    
                    {/* Fallback */}
                    <div className="fallback hidden items-center justify-center">
                      <span className="text-gray-400 font-medium text-sm group-hover:text-gray-300 transition-colors">
                        {sponsor.name}
                      </span>
                    </div>

                    {/* Tooltip on hover */}
                    {sponsor.website && (
                      <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <div className="bg-slate-800 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg">
                          Visit {sponsor.name}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Custom navigation hint */}
          <div className="text-center mt-12">
            <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
              <span className="inline-block w-8 h-0.5 bg-gradient-to-r from-transparent via-gray-500 to-transparent animate-pulse" />
              Drag to explore our partners
              <span className="inline-block w-8 h-0.5 bg-gradient-to-r from-transparent via-gray-500 to-transparent animate-pulse" />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sponsors;