"use client"
import  { useState } from 'react';
import { Plus, Minus, HelpCircle, MapPin, Clock, Users, Ticket, Code, Wifi, Coffee, Award } from 'lucide-react';
import { getTranslation } from '@/lib/i18n';
import { HeroProps } from './interfaces/interface';

const FAQ = ({currentLocale}:HeroProps) => {
  const [openFAQ, setOpenFAQ] = useState(0);

 
 

 
  const faqs = [
    {
      icon: <MapPin className="w-5 h-5" />,
      question:  getTranslation(currentLocale, 'faq.question_one'),
      answer:  getTranslation(currentLocale, 'faq.answer_one')
    },
    {
      icon: <Clock className="w-5 h-5" />,
      question:  getTranslation(currentLocale, 'faq.question_two'),
      answer:  getTranslation(currentLocale, 'faq.answer_two')
    },
    {
      icon: <Users className="w-5 h-5" />,
      question:  getTranslation(currentLocale, 'faq.question_three'),
      answer:  getTranslation(currentLocale, 'faq.answer_three')
    },
    {
      icon: <Ticket className="w-5 h-5" />,
      question:  getTranslation(currentLocale, 'faq.question_four'),
      answer:  getTranslation(currentLocale, 'faq.answer_four')
    },
    {
      icon: <Code className="w-5 h-5" />,
      question:  getTranslation(currentLocale, 'faq.question_five'),
      answer:  getTranslation(currentLocale, 'faq.answer_five')
    },
    {
      icon: <Wifi className="w-5 h-5" />,
      question:  getTranslation(currentLocale, 'faq.question_six'),
      answer:  getTranslation(currentLocale, 'faq.answer_six')
    },
    {
      icon: <Coffee className="w-5 h-5" />,
      question:  getTranslation(currentLocale, 'faq.question_seven'),
      answer:  getTranslation(currentLocale, 'faq.answer_seven')
    },
    {
      icon: <Award className="w-5 h-5" />,
      question:  getTranslation(currentLocale, 'faq.question_eight'),
      answer:  getTranslation(currentLocale, 'faq.answer_eight')
    }
  ];

  const toggleFAQ = (index:number) => {
    setOpenFAQ(openFAQ === index ? -1 : index);
  };
   

  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-64 h-64 bg-yellow-400/8 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-slate-800/5 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-yellow-500/6 rounded-full filter blur-2xl"></div>
      </div>

      {/* Question mark pattern */}
      <div className="absolute inset-0 opacity-3">
        <div className="h-full w-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23FCD34D' fill-opacity='0.3'%3E%3Ctext x='20' y='40' font-family='serif' font-size='24' font-weight='bold'%3E%3F%3C/text%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-yellow-100 to-yellow-200 border border-yellow-300 mb-6">
            <HelpCircle className="w-4 h-4 text-yellow-600 mr-2" />
            <span className="text-sm font-semibold text-yellow-800">  {getTranslation(currentLocale, 'faq.badge')}</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="text-slate-800"> {getTranslation(currentLocale, 'faq.title_part1')}</span>
            <br />
            <span className="bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 bg-clip-text text-transparent">
            {getTranslation(currentLocale, 'faq.title_part2')}
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
          {getTranslation(currentLocale, 'faq.subtitle')}
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`group relative bg-gradient-to-br rounded-2xl p-6 transition-all duration-300 cursor-pointer border-2 ${
                openFAQ === index
                  ? 'from-yellow-50 to-yellow-100 border-yellow-300 shadow-xl'
                  : 'from-slate-50 to-slate-100 border-slate-200 hover:border-yellow-300 hover:shadow-lg'
              }`}
              onClick={() => toggleFAQ(index)}
            >
              {/* Question */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className={`rounded-xl p-3 transition-all duration-300 ${
                    openFAQ === index
                      ? 'bg-yellow-500 text-white'
                      : 'bg-slate-800 text-white group-hover:bg-yellow-500'
                  }`}>
                    {faq.icon}
                  </div>
                  <h3 className={`text-lg font-bold leading-tight transition-colors duration-300 ${
                    openFAQ === index ? 'text-slate-800' : 'text-slate-700 group-hover:text-slate-800'
                  }`}>
                    {faq.question}
                  </h3>
                </div>
                
                <div className={`rounded-full p-2 transition-all duration-300 ${
                  openFAQ === index
                    ? 'bg-yellow-500 text-white'
                    : 'bg-slate-200 text-slate-600 group-hover:bg-yellow-500 group-hover:text-white'
                }`}>
                  {openFAQ === index ? (
                    <Minus className="w-5 h-5" />
                  ) : (
                    <Plus className="w-5 h-5" />
                  )}
                </div>
              </div>

              {/* Answer */}
              <div className={`overflow-hidden transition-all duration-500 ${
                openFAQ === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="pt-4 border-t border-slate-200">
                  <p className="text-slate-600 leading-relaxed text-base">
                    {faq.answer}
                  </p>
                </div>
              </div>

              {/* Hover effect indicator */}
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-t-2xl transition-all duration-300 ${
                openFAQ === index ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}></div>
            </div>
          ))}
        </div>

        {/* Still have questions section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-12 shadow-2xl">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {getTranslation(currentLocale, 'faq.still_have_questions_title')}
              </h3>
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              {getTranslation(currentLocale, 'faq.still_have_questions_subtitle')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="group bg-gradient-to-r from-yellow-500 to-yellow-600 text-slate-900 px-8 py-4 rounded-2xl text-lg font-bold hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                {getTranslation(currentLocale, 'faq.button_contact_support')}
                  <HelpCircle className="inline-block w-5 h-5 ml-2 group-hover:rotate-12 transition-transform" />
                </button>
                <button className="bg-transparent border-2 border-yellow-400 text-yellow-400 px-8 py-4 rounded-2xl text-lg font-bold hover:bg-yellow-400 hover:text-slate-900 transition-all duration-300">
                {getTranslation(currentLocale, 'faq.button_join_community')}
                </button>
              </div>

              {/* Contact info */}
              <div className="mt-8 flex flex-wrap justify-center gap-8 text-slate-400">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
                  <span>pyconsenegambia@gmail.com</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
                  <span> {getTranslation(currentLocale, 'faq.button_join_community')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

     
      </div>
    </section>
  );
};

export default FAQ;
