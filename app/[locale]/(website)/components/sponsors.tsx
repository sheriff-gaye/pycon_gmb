"use client";

import { useState, useEffect } from "react";
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



  if (loading) {
    return (
      <section className="bg-white py-16 md:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Skeleton className="h-10 w-64 mx-auto mb-4 bg-gray-200" />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="flex justify-center">
                <Skeleton className="h-20 w-full bg-gray-200 rounded-xl" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }


  // Duplicate sponsors for seamless infinite scroll
  const duplicatedSponsors = [...sponsors, ...sponsors, ...sponsors];

  return (
    <section className="bg-white py-16 md:py-24 relative overflow-hidden">
      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        @keyframes scroll-right {
          0% {
            transform: translateX(-33.333%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-scroll-left {
          animation: scroll-left 30s linear infinite;
        }

        .animate-scroll-right {
          animation: scroll-right 30s linear infinite;
        }

        .animate-scroll-left:hover,
        .animate-scroll-right:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div
          className={`text-center mb-16 transform transition-all duration-1000 ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
           <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight s">
           <span className="text-slate-800 mr-2">
  {getTranslation(currentLocale, "sponsors.our")}
</span>
<span className="bg-linear-to-r from-yellow-500 via-yellow-600 to-yellow-700 bg-clip-text text-transparent">
  {getTranslation(currentLocale, "sponsors.title")}
</span>

          </h2>
        </div>

        {/* Scrolling Row - Left to Right */}
        <div
          className={`mb-12 transform transition-all duration-1000 delay-300 ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="relative">
            <div className="flex animate-scroll-left">
              {duplicatedSponsors.map((sponsor, index) => (
                <div
                  key={`${sponsor.id}-${index}`}
                  className="shrink-0 px-8"
                  style={{ width: '250px' }}
                >
                  <div
                  
                    className={`group relative h-32 flex items-center justify-center transition-all duration-300 ${
                      sponsor.website ? 'cursor-pointer' : ''
                    }`}
                  >
                    <img
                      src={sponsor.logo}
                      alt={sponsor.name}
                      className="max-h-20 max-w-full w-auto object-contain filter  transition-all duration-300 group-hover:scale-110"
                    />
                    
                   
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scrolling Row - Right to Left */}
        <div
          className={`transform transition-all duration-1000 delay-500 ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="relative">
            <div className="flex animate-scroll-right">
              {duplicatedSponsors.slice().reverse().map((sponsor, index) => (
                <div
                  key={`${sponsor.id}-reverse-${index}`}
                  className="shrink-0 px-8"
                  style={{ width: '250px' }}
                >
                  <div
                   
                    className={`group relative h-32 flex items-center justify-center transition-all duration-300 ${
                      sponsor.website ? 'cursor-pointer' : ''
                    }`}
                  >
                    <img
                      src={sponsor.logo}
                      alt={sponsor.name}
                      className="max-h-20 max-w-full w-auto object-contain filter transition-all duration-300 group-hover:scale-110"
                    />
                    
                   
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sponsors;