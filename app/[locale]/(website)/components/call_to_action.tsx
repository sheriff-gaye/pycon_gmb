"use client";

import { ArrowRight, Ticket, Users, Gift, Zap, Globe, Star, Clock } from "lucide-react";
import { getTranslation } from "@/lib/i18n";
import { HeroProps } from "./interfaces/interface";

const CTA = ({currentLocale}:HeroProps) => {
 

  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-400/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-slate-800/5 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-500/5 rounded-full filter blur-3xl"></div>
      </div>

      {/* Geometric pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FCD34D' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3Ccircle cx='10' cy='10' r='1'/%3E%3Ccircle cx='50' cy='10' r='1'/%3E%3Ccircle cx='10' cy='50' r='1'/%3E%3Ccircle cx='50' cy='50' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-linear-to-r from-yellow-100 to-yellow-200 border border-yellow-300 mb-6">
            <Star className="w-4 h-4 text-yellow-600 mr-2" />
            <span className="text-sm font-semibold text-yellow-800">
              {getTranslation(currentLocale, "cta.badge")}
            </span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="text-slate-800">{getTranslation(currentLocale, "cta.title_part1")}</span>
            <br />
            <span className="bg-linear-to-r from-yellow-500 via-yellow-600 to-yellow-700 bg-clip-text text-transparent">
              {getTranslation(currentLocale, "cta.title_part2")}
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            {getTranslation(currentLocale, "cta.subtitle")}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="group text-center bg-linear-to-br from-slate-50 to-slate-100 rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 border border-slate-200 hover:border-yellow-300">
            <div className="relative mb-6">
              <div className="bg-linear-to-br from-slate-700 to-slate-900 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Users className="w-10 h-10 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-3">
              {getTranslation(currentLocale, "cta.feature1_title")}
            </h3>
            <p className="text-slate-600 leading-relaxed">
              {getTranslation(currentLocale, "cta.feature1_description")}
            </p>
          </div>

          <div className="group text-center bg-linear-to-br from-yellow-50 to-yellow-100 rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 border border-yellow-200 hover:border-yellow-400">
            <div className="relative mb-6">
              <div className="bg-linear-to-br from-yellow-500 to-yellow-600 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Zap className="w-10 h-10 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-3">
              {getTranslation(currentLocale, "cta.feature2_title")}
            </h3>
            <p className="text-slate-600 leading-relaxed">
              {getTranslation(currentLocale, "cta.feature2_description")}
            </p>
          </div>

          <div className="group text-center bg-linear-to-br from-slate-50 to-slate-100 rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 border border-slate-200 hover:border-yellow-300">
            <div className="relative mb-6">
              <div className="bg-linear-to-br from-slate-700 to-slate-900 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Globe className="w-10 h-10 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-3">
              {getTranslation(currentLocale, "cta.feature3_title")}
            </h3>
            <p className="text-slate-600 leading-relaxed">
              {getTranslation(currentLocale, "cta.feature3_description")}
            </p>
          </div>
        </div>

        {/* Early Bird Pricing Card */}
        <div className="relative max-w-5xl mx-auto mb-16">
          <div className="absolute inset-0 bg-linear-to-r from-yellow-400 to-yellow-500 rounded-3xl transform rotate-1"></div>
          <div className="relative bg-white border-2 border-yellow-400 rounded-3xl p-10 shadow-2xl">
            <div className="text-center mb-8">
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-linear-to-r from-yellow-400 to-yellow-500 text-slate-900 font-bold text-lg mb-6 shadow-lg">
                <Gift className="w-5 h-5 mr-2" />
                {getTranslation(currentLocale, "cta.early_bird_badge")}
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                {getTranslation(currentLocale, "cta.early_bird_title")}
              </h3>
              <p className="text-xl text-slate-600">
                {getTranslation(currentLocale, "cta.early_bird_subtitle")}
              </p>
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-slate-800 mb-2 flex items-center justify-center">
                  <span className="line-through text-slate-400 text-4xl mr-4">GMD500</span>
                  <span className="text-yellow-600">GMD300</span>
                </div>
                <div className="text-slate-500 text-lg font-medium">
                  {getTranslation(currentLocale, "cta.early_bird_save")}
                </div>
                <div className="text-sm text-slate-400 mt-1">
                  {getTranslation(currentLocale, "cta.early_bird_regular")}
                </div>
              </div>

              <div className="flex items-center bg-slate-100 rounded-2xl px-8 py-6 border border-slate-200">
                <Clock className="w-8 h-8 text-yellow-600 mr-4" />
                <div>
                  <div className="text-slate-800 font-bold text-lg">
                    {getTranslation(currentLocale, "cta.early_bird_expires")}
                  </div>
                  <div className="text-yellow-600 font-semibold text-2xl">
                    {getTranslation(currentLocale, "cta.early_bird_date")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="text-center mb-12">
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
            <button className="group relative bg-linear-to-r from-yellow-500 to-yellow-600 text-white px-12 py-5 rounded-2xl text-xl font-bold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:from-yellow-400 hover:to-yellow-500 shadow-lg">
              <div className="flex items-center justify-center">
                <Ticket className="w-6 h-6 mr-3" />
                {getTranslation(currentLocale, "cta.button_get_ticket")}
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
              </div>
              <div className="absolute inset-0 bg-linear-to-r from-yellow-400 to-yellow-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            <button className="group bg-transparent border-3 border-slate-800 text-slate-800 px-12 py-5 rounded-2xl text-xl font-bold hover:bg-slate-800 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl">
              <div className="flex items-center justify-center">
                {getTranslation(currentLocale, "cta.button_learn_more")}
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-slate-600 text-lg">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span>{getTranslation(currentLocale, "cta.payment_secure")}</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span>{getTranslation(currentLocale, "cta.payment_guarantee")}</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
              <span>{getTranslation(currentLocale, "cta.payment_confirmation")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;