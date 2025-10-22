"use client";
import { useState, useEffect } from "react";
import { getTranslation } from "@/lib/i18n";
import {
  Calendar,
  MapPin,
  Users,
  ArrowRight,
  Star,
  Ticket,
  Sparkles,
  Globe,
  TrendingUp
} from "lucide-react";
import { HeroProps } from "./interfaces/interface";

const Hero = ({currentLocale}: HeroProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentStat, setCurrentStat] = useState(0);

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % 3);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { value: "2", label: getTranslation(currentLocale, 'hero.stats.countries'), color: "text-yellow-400" },
    { value: "25+", label: getTranslation(currentLocale, 'hero.stats.speakers'), color: "text-blue-400" },
    { value: "500+", label: getTranslation(currentLocale, 'hero.stats.developers'), color: "text-green-400" }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800"></div>
        <div className="absolute inset-0 opacity-30">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `url("/images/heo.png")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat"
            }}
          ></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-blue-500/10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent"></div>
      </div>

      {/* Animated blobs */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-yellow-400/20 to-yellow-500/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-32 right-16 w-56 h-56 bg-gradient-to-r from-blue-400/20 to-blue-500/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-32 w-64 h-64 bg-gradient-to-r from-green-400/15 to-green-500/15 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-r from-purple-400/20 to-purple-500/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-3000"></div>
      </div>

      {/* Floating icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 animate-bounce delay-500">
          <div className="bg-yellow-400/20 backdrop-blur-sm rounded-full p-3 border border-yellow-400/30">
            <Ticket className="w-8 h-8 text-yellow-400" />
          </div>
        </div>
        <div className="absolute top-1/3 right-1/3 animate-bounce delay-1000">
          <div className="bg-blue-400/20 backdrop-blur-sm rounded-full p-3 border border-blue-400/30">
            <Sparkles className="w-6 h-6 text-blue-400" />
          </div>
        </div>
        <div className="absolute bottom-1/3 left-1/5 animate-bounce delay-1500">
          <div className="bg-green-400/20 backdrop-blur-sm rounded-full p-3 border border-green-400/30">
            <Globe className="w-7 h-7 text-green-400" />
          </div>
        </div>
        <div className="absolute bottom-1/4 right-1/4 animate-bounce delay-2000">
          <div className="bg-purple-400/20 backdrop-blur-sm rounded-full p-3 border border-purple-400/30">
            <Sparkles className="w-5 h-5 text-purple-400" />
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          {/* Event badge */}
          <div
            className={`inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-yellow-500/20 to-blue-500/20 backdrop-blur-md border border-yellow-400/40 mb-8 shadow-2xl transform transition-all duration-1000 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
           
            <span className="text-sm font-medium text-yellow-100 tracking-wide">
              Join Senegambia's Premier Python Conference
            </span>
            <div className="ml-3 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
            <span
              className={`block lg:inline bg-gradient-to-r from-yellow-400 via-yellow-300 to-orange-400 bg-clip-text text-transparent drop-shadow-2xl transform transition-all duration-1000 delay-300 ${
                isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
            >
              PyCon
            </span>
            <span
              className={`block lg:inline lg:ml-4 bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500 bg-clip-text text-transparent drop-shadow-2xl transform transition-all duration-1000 delay-500 ${
                isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
            >
              Senegambia
            </span>
            <span
              className={`block lg:inline lg:ml-4 text-white text-4xl md:text-6xl lg:text-7xl transform transition-all duration-1000 delay-700 ${
                isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
            >
              2025
            </span>
          </h1>

          {/* Subtitle */}
          <div
            className={`mb-12 transform transition-all duration-1000 delay-900 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-4xl mx-auto leading-relaxed">
              {getTranslation(currentLocale, 'hero.subtitle.building')}{" "}
              <span className="font-semibold text-yellow-400">
                {getTranslation(currentLocale, 'hero.subtitle.gambia')}
              </span>{" "}
              {getTranslation(currentLocale, 'hero.subtitle.and')}{" "}
              <span className="font-semibold text-blue-400">
                {getTranslation(currentLocale, 'hero.subtitle.senegal')}
              </span>
            </p>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
              {getTranslation(currentLocale, 'hero.subtitle.empowering')}
            </p>
          </div>

          {/* Event details */}
          <div
            className={`flex flex-col lg:flex-row items-center justify-center gap-6 mb-16 transform transition-all duration-1000 delay-1100 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <div className="group flex items-center bg-white/10 backdrop-blur-md rounded-full px-8 py-4 shadow-xl border border-white/20 hover:bg-white/15 hover:scale-105 transition-all duration-300 cursor-pointer">
              <Calendar className="w-6 h-6 text-yellow-400 mr-3 group-hover:rotate-12 transition-transform" />
              <div>
                <span className="text-white font-medium text-lg">
                  November 28-29, 2025
                </span>
                <div className="text-xs text-gray-400">
                  {getTranslation(currentLocale, 'hero.event.mark')}
                </div>
              </div>
            </div>
            <div className="group flex items-center bg-white/10 backdrop-blur-md rounded-full px-8 py-4 shadow-xl border border-white/20 hover:bg-white/15 hover:scale-105 transition-all duration-300 cursor-pointer">
              <MapPin className="w-6 h-6 text-blue-400 mr-3 group-hover:bounce transition-transform" />
              <div>
                <span className="text-white font-medium text-lg">
                  {getTranslation(currentLocale, 'hero.event.location')}
                </span>
                <div className="text-xs text-gray-400">
                  {getTranslation(currentLocale, 'hero.event.vision')}
                </div>
              </div>
            </div>
            <div className="group flex items-center bg-white/10 backdrop-blur-md rounded-full px-8 py-4 shadow-xl border border-white/20 hover:bg-white/15 hover:scale-105 transition-all duration-300 cursor-pointer">
              <Users className="w-6 h-6 text-green-400 mr-3 group-hover:scale-110 transition-transform" />
              <div>
                <span className="text-white font-medium text-lg">
                  {getTranslation(currentLocale, 'hero.event.attendees')}
                </span>
                <div className="text-xs text-gray-400">
                  {getTranslation(currentLocale, 'hero.event.community')}
                </div>
              </div>
            </div>
          </div>

          {/* CTA buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-6 justify-center mb-20 transform transition-all duration-1000 delay-1300 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <button 
              onClick={() => window.open("#pricing", "_self")}
              className="group relative overflow-hidden bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-600 text-white px-14 py-7 rounded-full text-xl font-bold hover:shadow-2xl transition-all duration-300 transform hover:scale-110 shadow-xl"
            >
              <span className="relative z-10 flex items-center">
                <Ticket className="w-7 h-7 mr-3 group-hover:rotate-12 transition-transform" />
                Get Your Tickets
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-600 rounded-full blur opacity-30 group-hover:opacity-60 transition-opacity"></div>
            </button>
            <button
              onClick={() => window.open("#schedule", "_self")}
              className="group relative overflow-hidden bg-white/10 backdrop-blur-md text-white px-14 py-7 rounded-full text-xl font-bold border-2 border-purple-400/50 hover:shadow-2xl transition-all duration-300 hover:bg-white/20 hover:border-purple-300 hover:scale-105"
            >
              <span className="flex items-center">
                <Star className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" />
                View Schedule
                <TrendingUp className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>

          {/* Stats */}
          <div
            className={`transform transition-all duration-1000 delay-1500 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`text-center group cursor-pointer transition-all duration-500 transform hover:scale-110 ${
                    currentStat === index ? "scale-110 opacity-100" : "opacity-75"
                  }`}
                >
                  <div className="relative">
                    <div className={`text-5xl md:text-6xl font-bold ${stat.color} mb-3 transition-all duration-300`}>
                      {stat.value}
                    </div>
                    <div className="text-gray-300 text-sm uppercase tracking-widest font-medium">
                      {stat.label}
                    </div>
                    {currentStat === index && (
                      <div className="absolute -inset-4 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-lg animate-pulse"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero