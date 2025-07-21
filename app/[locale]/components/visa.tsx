"use client"

import { useState } from 'react';
import { Plane, FileText, Clock, CheckCircle, AlertCircle, Globe, ExternalLink, Phone, Mail } from 'lucide-react';
import { HeroProps } from './interfaces/interface';
import { getTranslation } from '@/lib/i18n';

interface EmbassyContact {
  email: string;
  phone: string;
  website: string;
}

interface VisaRequirement {
  title: string;
  flag: string;
  visaFree: string[];
  visaOnArrival: string[];
  embassy: EmbassyContact;
}

interface SupportDocument {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: string;
}

interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

type CountryTab = 'gambia' | 'senegal';

const VisaSection = ({ currentLocale }: HeroProps) => {
  const [activeTab, setActiveTab] = useState<CountryTab>('gambia');

  const visaRequirements: Record<CountryTab, VisaRequirement> = {
    gambia: {
      title: "Visa Requirements for Gambia",
      flag: "🇬🇲",
      visaFree: [
        "ECOWAS member countries", "UK", "Ireland", "Germany", "Netherlands", 
        "Belgium", "Luxembourg", "France", "Italy", "Spain", "Sweden", "Norway"
      ],
      visaOnArrival: [
        "USA", "Canada", "Australia", "New Zealand", "Japan", "South Korea",
        "China", "India", "Brazil", "South Africa", "Egypt", "Morocco"
      ],
      embassy: {
        email: "consular@gambianembassy.org",
        phone: "+220 422-6050",
        website: "www.gambia.gm/visa"
      }
    },
    senegal: {
      title: "Visa Requirements for Senegal",
      flag: "🇸🇳",
      visaFree: [
        "ECOWAS member countries", "EU countries", "USA", "Canada", "Japan",
        "South Korea", "Brazil", "Chile", "Morocco", "Tunisia", "South Africa"
      ],
      visaOnArrival: [
        "Australia", "New Zealand", "China", "India", "Russia", "Turkey",
        "Egypt", "Kenya", "Nigeria", "Ghana", "United Arab Emirates"
      ],
      embassy: {
        email: "visa@senegalembassy.org",
        phone: "+221 33-823-1030",
        website: "www.senegal.gouv.sn/visa"
      }
    }
  };

  const supportDocuments: SupportDocument[] = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Conference Invitation Letter",
      description: "Official invitation from PyCon Senegambia organizers",
      action: "Request Letter"
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Registration Confirmation",
      description: "Proof of conference registration and payment",
      action: "Download PDF"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Accommodation Details",
      description: "Hotel bookings and accommodation arrangements",
      action: "Get Template"
    },
    {
      icon: <Plane className="w-6 h-6" />,
      title: "Travel Itinerary",
      description: "Flight bookings and travel schedule",
      action: "View Guide"
    }
  ];

  const processSteps: ProcessStep[] = [
    {
      step: "1",
      title: "Register for Conference",
      description: "Complete your PyCon Senegambia registration first"
    },
    {
      step: "2",
      title: "Request Invitation Letter",
      description: "Submit visa support form with required details"
    },
    {
      step: "3",
      title: "Gather Documents",
      description: "Collect passport, photos, and supporting documents"
    },
    {
      step: "4",
      title: "Apply for Visa",
      description: "Submit application at embassy or online portal"
    },
    {
      step: "5",
      title: "Plan Your Trip",
      description: "Book flights and accommodation after visa approval"
    }
  ];

  return (
    <section className="relative py-24 bg-white overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-400/8 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-slate-800/5 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-500/5 rounded-full filter blur-3xl"></div>
      </div>

      <div className="absolute inset-0 opacity-3">
        <div className="h-full w-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23FCD34D' fill-opacity='0.2'%3E%3Crect x='20' y='30' width='60' height='40' rx='4' stroke='%23FCD34D' stroke-width='1' fill='none'/%3E%3Ccircle cx='35' cy='45' r='6' fill='%23FCD34D'/%3E%3Cline x1='50' y1='40' x2='75' y2='40' stroke='%23FCD34D' stroke-width='1'/%3E%3Cline x1='50' y1='50' x2='75' y2='50' stroke='%23FCD34D' stroke-width='1'/%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-yellow-100 to-yellow-200 border border-yellow-300 mb-6">
            <Plane className="w-4 h-4 text-yellow-600 mr-2" />
            <span className="text-sm font-semibold text-yellow-800"> {getTranslation(currentLocale, 'visa.travel_information')}</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="text-slate-800">{getTranslation(currentLocale, 'visa.visa_and')}</span>
            <br />
            <span className="bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 bg-clip-text text-transparent">
            {getTranslation(currentLocale, 'visa.travel_support')}
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
          {getTranslation(currentLocale, 'visa.visa_text')}
          </p>
        </div>       
        <div className="flex justify-center mb-12">
          <div className="bg-slate-100 rounded-2xl p-2 inline-flex">
            <button
              onClick={() => setActiveTab('gambia')}
              className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                activeTab === 'gambia'
                  ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-lg'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
                {getTranslation(currentLocale, 'visa.visa_gambia')}
             
            </button>
            <button
              onClick={() => setActiveTab('senegal')}
              className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                activeTab === 'senegal'
                  ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-lg'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              {getTranslation(currentLocale, 'visa.visa_senegal')}
            
            </button>
          </div>
        </div>

      
        <div className="mb-20">
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl p-8 border border-slate-200 shadow-lg">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-slate-800 mb-4 flex items-center justify-center">
                <span className="text-4xl mr-3">{visaRequirements[activeTab].flag}</span>
                {visaRequirements[activeTab].title}
              </h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Visa Free Countries */}
              <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
                <div className="flex items-center mb-4">
                  <div className="bg-green-500 rounded-xl p-3 mr-4">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-2xl font-bold text-green-800">Visa-Free Entry</h4>
                </div>
                <p className="text-green-700 mb-4 font-medium">Citizens of these countries can enter without a visa:</p>
                <div className="flex flex-wrap gap-2">
                  {visaRequirements[activeTab].visaFree.map((country, index) => (
                    <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      {country}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-yellow-50 rounded-2xl p-6 border border-yellow-200">
                <div className="flex items-center mb-4">
                  <div className="bg-yellow-500 rounded-xl p-3 mr-4">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-2xl font-bold text-yellow-800">Visa on Arrival</h4>
                </div>
                <p className="text-yellow-700 mb-4 font-medium">Citizens of these countries can get visa on arrival:</p>
                <div className="flex flex-wrap gap-2">
                  {visaRequirements[activeTab].visaOnArrival.map((country, index) => (
                    <span key={index} className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                      {country}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Embassy Contact */}
            <div className="mt-8 bg-slate-800 rounded-2xl p-6 text-white">
              <h4 className="text-xl font-bold mb-4 flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                Embassy Contact Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-yellow-400" />
                  <span className="text-sm">{visaRequirements[activeTab].embassy.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-yellow-400" />
                  <span className="text-sm">{visaRequirements[activeTab].embassy.phone}</span>
                </div>
                <div className="flex items-center">
                  <ExternalLink className="w-4 h-4 mr-2 text-yellow-400" />
                  <span className="text-sm">{visaRequirements[activeTab].embassy.website}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Support Documents */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-slate-800 mb-4">
              Visa Support Documents
            </h3>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We provide all necessary documentation to support your visa application
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportDocuments.map((doc, index) => (
              <div key={index} className="group bg-gradient-to-br from-white to-yellow-50 rounded-2xl p-6 border border-yellow-200 hover:shadow-xl transition-all duration-300 hover:border-yellow-400">
                <div className="bg-slate-800 rounded-xl p-4 mb-4 group-hover:bg-yellow-500 transition-colors duration-300">
                  <div className="text-yellow-400 group-hover:text-white transition-colors duration-300">
                    {doc.icon}
                  </div>
                </div>
                <h4 className="text-lg font-bold text-slate-800 mb-2">{doc.title}</h4>
                <p className="text-slate-600 text-sm mb-4 leading-relaxed">{doc.description}</p>
                <button className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:shadow-lg transition-all duration-300 w-full group-hover:scale-105">
                  {doc.action}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Process Steps */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-slate-800 mb-4">
              Visa Application Process
            </h3>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Follow these simple steps to get your visa for PyCon Senegambia
            </p>
          </div>

          <div className="relative">
            {/* Connection line */}
            <div className="hidden lg:block absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {processSteps.map((step, index) => (
                <div key={index} className="relative text-center group">
                  <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg relative z-10">
                    <span className="text-yellow-400 font-bold text-xl">{step.step}</span>
                  </div>
                  <h4 className="text-lg font-bold text-slate-800 mb-2">{step.title}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Important Notice */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-3xl p-8 text-center shadow-2xl">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <AlertCircle className="w-8 h-8 text-yellow-400 mr-3" />
              <h3 className="text-3xl font-bold text-white">Important Notice</h3>
            </div>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Visa processing times vary by country and embassy. We recommend applying for your visa 
              at least 4-6 weeks before the conference date. Our team will provide full support 
              throughout your application process.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group bg-gradient-to-r from-yellow-500 to-yellow-600 text-slate-900 px-8 py-4 rounded-2xl text-lg font-bold hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                Request Visa Support
                <FileText className="inline-block w-5 h-5 ml-2 group-hover:rotate-12 transition-transform" />
              </button>
              <button className="bg-transparent border-2 border-yellow-400 text-yellow-400 px-8 py-4 rounded-2xl text-lg font-bold hover:bg-yellow-400 hover:text-slate-900 transition-all duration-300">
                Contact Visa Team
              </button>
            </div>

            <div className="mt-8 text-slate-400">
              <span className="text-yellow-400">✈️</span> Safe travels and see you at PyCon Senegambia! <span className="text-yellow-400">🇬🇲🇸🇳</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisaSection;