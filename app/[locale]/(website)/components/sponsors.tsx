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

  const handleSponsorClick = (sponsor: Sponsor) => {
    if (sponsor.website) {
      window.open(sponsor.website, '_blank', 'noopener,noreferrer');
    }
  };

  if (loading) {
    return (
      <section className="bg-slate-900 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Skeleton className="h-8 md:h-10 w-64 mx-auto mb-4 bg-slate-800" />
            <Skeleton className="h-4 w-96 max-w-2xl mx-auto bg-slate-800" />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="flex justify-center">
                <Skeleton className="h-12 md:h-16 w-full bg-slate-800" />
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