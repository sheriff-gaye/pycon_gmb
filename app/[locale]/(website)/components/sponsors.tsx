"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { getTranslation } from "@/lib/i18n";

interface Sponsor {
  id: string;
  name: string;
  logo: string;
  website?: string;
}

interface SponsorsProps {
  currentLocale: string;
}

const Sponsors = ({ currentLocale }: SponsorsProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const sponsors: Sponsor[] = [
    {
      id: "1",
      name: "Soni Transfe",
      logo: "/images/sponsors/download.png",
      website: "https://sonitransfer.com"
    },
    {
      id: "2",
      name: "Black Python Devs",
      logo: "/images/sponsors/143823894.png",
      website: "https://blackpythondevs.com/index.html"
    },
   
   
  ];

  const handleSponsorClick = (sponsor: Sponsor) => {
    if (sponsor.website) {
      window.open(sponsor.website, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section className="bg-slate-900 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
        <div
          className={`text-center mb-12 transform transition-all duration-1000 ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-yellow-400 to-blue-400 bg-clip-text text-transparent">
              {getTranslation(currentLocale, 'sponsors.title')}
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {getTranslation(currentLocale, 'sponsors.subtitle')}
          </p>
        </div>

       
        <div
          className={`grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 transform transition-all duration-1000 delay-300 ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {sponsors.map((sponsor, index) => (
            <div
              key={sponsor.id}
            //   className="group bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 transform hover:scale-105 cursor-pointer"
              onClick={() => handleSponsorClick(sponsor)}
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              <Image
                src={sponsor.logo}
                alt={sponsor.name}
                width={200}
                height={200}
                // fill
                className="h-12 md:h-16 w-full object-contain filter brightness-90 group-hover:brightness-100 transition-all duration-300"
               
              />
            
              <div className="fallback hidden items-center justify-center h-12 md:h-16 text-center">
                <span className="text-gray-400 font-medium text-sm">
                  {sponsor.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sponsors;