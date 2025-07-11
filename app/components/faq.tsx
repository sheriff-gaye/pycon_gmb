"use client"
import  { useState } from 'react';
import { Plus, Minus, HelpCircle, MapPin, Clock, Users, Ticket, Code, Wifi, Coffee, Award } from 'lucide-react';

const FAQ = () => {
  const [openFAQ, setOpenFAQ] = useState(0);

  const faqs = [
    {
      icon: <MapPin className="w-5 h-5" />,
      question: "Where exactly will PyCon Senegambia 2025 be held?",
      answer: "The conference will be held in the Senegambia region, bridging both Gambia and Senegal. The exact venue will be announced soon, but it will be easily accessible from both countries with transportation arrangements provided."
    },
    {
      icon: <Clock className="w-5 h-5" />,
      question: "What time does the conference start and end?",
      answer: "PyCon Senegambia 2025 runs from 8:00 AM to 6:00 PM on November 27, 2025. The day includes registration, keynotes, technical sessions, workshops, networking lunch, and closing ceremony. A detailed schedule will be shared closer to the event date."
    },
    {
      icon: <Users className="w-5 h-5" />,
      question: "Who should attend PyCon Senegambia?",
      answer: "This conference is perfect for Python developers, data scientists, AI/ML engineers, students, educators, tech entrepreneurs, and anyone interested in Python programming. Whether you're a beginner or expert, there's something valuable for everyone."
    },
    {
      icon: <Ticket className="w-5 h-5" />,
      question: "What's included in my conference ticket?",
      answer: "Your ticket includes access to all talks and workshops, conference materials, networking lunch, coffee breaks, welcome kit with swag, certificate of participation, and access to the exclusive PyCon Senegambia community network."
    },
    {
      icon: <Code className="w-5 h-5" />,
      question: "What topics and tracks will be covered?",
      answer: "We'll cover Web Development with Django/Flask, Data Science & AI/ML, Python fundamentals, Cloud & DevOps, Mobile development, Cybersecurity, IoT, and Open Source contributions. Special focus on applications relevant to African tech challenges."
    },
    {
      icon: <Wifi className="w-5 h-5" />,
      question: "Will there be Wi-Fi and power outlets available?",
      answer: "Yes! We'll provide high-speed Wi-Fi throughout the venue and ensure plenty of power outlets and charging stations. We recommend bringing your laptop, chargers, and any devices you'll need for workshops."
    },
    {
      icon: <Coffee className="w-5 h-5" />,
      question: "Are meals and refreshments provided?",
      answer: "Absolutely! Your ticket includes a welcome breakfast, networking lunch featuring local cuisine, and coffee breaks throughout the day. We'll accommodate dietary restrictions - just let us know during registration."
    },
    {
      icon: <Award className="w-5 h-5" />,
      question: "Can I present or speak at the conference?",
      answer: "Yes! Our Call for Speakers is open. We welcome proposals for talks, workshops, and lightning talks. This is a great opportunity to share your knowledge with the growing Python community in West Africa. Submission guidelines are available on our website."
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
            <span className="text-sm font-semibold text-yellow-800">Got Questions?</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="text-slate-800">Frequently Asked</span>
            <br />
            <span className="bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Everything you need to know about PyCon Senegambia 2025
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
                Still have questions?
              </h3>
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                Our team is here to help! Reach out to us and we will get back to you as soon as possible.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="group bg-gradient-to-r from-yellow-500 to-yellow-600 text-slate-900 px-8 py-4 rounded-2xl text-lg font-bold hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  Contact Support
                  <HelpCircle className="inline-block w-5 h-5 ml-2 group-hover:rotate-12 transition-transform" />
                </button>
                <button className="bg-transparent border-2 border-yellow-400 text-yellow-400 px-8 py-4 rounded-2xl text-lg font-bold hover:bg-yellow-400 hover:text-slate-900 transition-all duration-300">
                  Join Our Community
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
                  <span>Response within 24 hours</span>
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
