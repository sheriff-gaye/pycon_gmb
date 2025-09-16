"use client"

import { getTranslation } from '@/lib/i18n';
import { ArrowRight, Check, Users, User, Building2, Star, Zap, Gift, Globe, Award } from 'lucide-react';
import { HeroProps } from './interfaces/interface';

const TicketPricing = ({currentLocale}:HeroProps) => {
  
  const tickets = [
    {
      type:  getTranslation(currentLocale, 'pricing.students'),
      price: "300",
      originalPrice: "500",
      icon: User,
      bgGradient: "from-slate-50 to-slate-100",
      borderColor: "border-slate-200",
      hoverBorder: "hover:border-yellow-300",
      iconBg: "from-slate-700 to-slate-900",
      iconColor: "text-white",
      badgeColor: "bg-slate-800",
      badgeText: "text-white",
      paymentUrl: "https://test.checkout.modempay.com/pay/17ffa19ebc4e8ee3a687bc89bd86b0ef442d75ea30ba89778accac48b75ddb0f",
      description:  getTranslation(currentLocale, 'pricing.student.description'),
      features: [
        getTranslation(currentLocale, 'pricing.student.features.one'),
        getTranslation(currentLocale, 'pricing.student.features.two'),
        getTranslation(currentLocale, 'pricing.student.features.three'),
        getTranslation(currentLocale, 'pricing.student.features.four'),
        getTranslation(currentLocale, 'pricing.student.features.five'),
        getTranslation(currentLocale, 'pricing.student.features.six'),
      ],
      popular: false
    },
    {
      type:  getTranslation(currentLocale, 'pricing.individual_name'),
      price: "500",
      originalPrice: "750",
      icon: Users,
      bgGradient: "from-yellow-50 to-yellow-100",
      borderColor: "border-yellow-200",
      hoverBorder: "hover:border-yellow-400",
      iconBg: "from-yellow-500 to-yellow-600",
      iconColor: "text-white",
      badgeColor: "bg-yellow-400",
      badgeText: "text-slate-800",
      paymentUrl: "https://test.checkout.modempay.com/pay/fd14c4f1574f9d679f3ec0d688bb43541afc38dbb7edf98afe6e48ab5b8373e8",
      description: "Ideal for individual developers and Python enthusiasts",
      features: [
        getTranslation(currentLocale, 'pricing.individual.features.one'),
        getTranslation(currentLocale, 'pricing.individual.features.two'),
        getTranslation(currentLocale, 'pricing.individual.features.three'),
        getTranslation(currentLocale, 'pricing.individual.features.four'),
        getTranslation(currentLocale, 'pricing.individual.features.five'),
        getTranslation(currentLocale, 'pricing.individual.features.six'),
      ],
      popular: true
    },
    {
      type:  getTranslation(currentLocale, 'pricing.corporate_name'),
      price: "1,000",
      originalPrice: "1,500",
      icon: Building2,
      bgGradient: "from-slate-50 to-slate-100",
      borderColor: "border-slate-200",
      hoverBorder: "hover:border-yellow-300",
      iconBg: "from-slate-700 to-slate-900",
      iconColor: "text-white",
      badgeColor: "bg-slate-800",
      badgeText: "text-white",
      paymentUrl: "https://test.checkout.modempay.com/pay/65abf775f04cb979930ab872a126aff34fa2e20f755d3c5ba1255fa8bb1c4d99",
      description: "Perfect for companies investing in their development teams",
      features: [
        getTranslation(currentLocale, 'pricing.corporate.features.one'),
        getTranslation(currentLocale, 'pricing.corporate.features.two'),
        getTranslation(currentLocale, 'pricing.corporate.features.three'),
        getTranslation(currentLocale, 'pricing.corporate.features.four'),
        getTranslation(currentLocale, 'pricing.corporate.features.five'),
        getTranslation(currentLocale, 'pricing.corporate.features.six'),
      ],
      popular: false
    }
  ];

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
        <div className="h-full w-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FCD34D' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3Ccircle cx='10' cy='10' r='1'/%3E%3Ccircle cx='50' cy='10' r='1'/%3E%3Ccircle cx='10' cy='50' r='1'/%3E%3Ccircle cx='50' cy='50' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-yellow-100 to-yellow-200 border border-yellow-300 mb-6">
            <Gift className="w-4 h-4 text-yellow-600 mr-2" />
            <span className="text-sm font-semibold text-yellow-800"> {getTranslation(currentLocale, 'pricing.early_bird_badge')}</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="text-slate-800">{getTranslation(currentLocale, 'pricing.title_part1')}</span>
            <br />
            <span className="bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 bg-clip-text text-transparent">
            {getTranslation(currentLocale, 'pricing.title_part2')}
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
          {getTranslation(currentLocale, 'pricing.subtitle')}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {tickets.map((ticket, index) => {
            const IconComponent = ticket.icon;
            return (
              <div key={index} className={`group relative text-center bg-gradient-to-br ${ticket.bgGradient} rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 border-2 ${ticket.borderColor} ${ticket.hoverBorder} ${ticket.popular ? 'scale-105 shadow-xl' : ''}`}>
                {/* Popular Badge */}
                {ticket.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 px-6 py-2 rounded-full font-bold text-sm shadow-lg flex items-center">
                      <Star className="w-4 h-4 mr-1" />
                      MOST POPULAR
                    </div>
                  </div>
                )}

                {/* Icon */}
                <div className="relative mb-6">
                  <div className={`bg-gradient-to-br ${ticket.iconBg} rounded-2xl w-20 h-20 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <IconComponent className={`w-10 h-10 ${ticket.iconColor}`} />
                  </div>
                 
                </div>

                {/* Ticket Type */}
                <h3 className="text-3xl font-bold text-slate-800 mb-2">{ticket.type}</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">{ticket.description}</p>

                {/* Pricing */}
                <div className="mb-8">
                  <div className="flex items-center justify-center mb-2">
                    <span className="line-through text-slate-400 text-2xl mr-3">D{ticket.originalPrice}</span>
                    <span className="text-5xl font-bold text-slate-800">D{ticket.price}</span>
                  </div>
                  <div className="text-slate-500 font-medium">Dalasis per person</div>
                </div>

                {/* Features */}
                <div className="text-left space-y-3 mb-8">
                  {ticket.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-slate-600">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <a 
                  href={ticket.paymentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group w-full ${ticket.popular ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white hover:from-yellow-400 hover:to-yellow-500' : 'bg-transparent border-2 border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white'} px-8 py-4 rounded-2xl text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl inline-block text-center`}
                >
                  <div className="flex items-center justify-center">
                    Select {ticket.type}
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </a>
              </div>
            );
          })}
        </div>

        {/* Additional Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 border border-slate-200">
            <div className="bg-gradient-to-br from-slate-700 to-slate-900 rounded-xl w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-bold text-slate-800 mb-2">  {getTranslation(currentLocale, 'pricing.instant_access_title')}</h4>
            <p className="text-sm text-slate-600"> {getTranslation(currentLocale, 'pricing.instant_access_description')}</p>
          </div>

          <div className="text-center bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-6 border border-yellow-200">
            <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-bold text-slate-800 mb-2"> {getTranslation(currentLocale, 'pricing.group_discounts_title')}</h4>
            <p className="text-sm text-slate-600"> {getTranslation(currentLocale, 'pricing.group_discounts_description')}</p>
          </div>

          <div className="text-center bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 border border-slate-200">
            <div className="bg-gradient-to-br from-slate-700 to-slate-900 rounded-xl w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <Award className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-bold text-slate-800 mb-2">{getTranslation(currentLocale, 'pricing.money_back_title')}</h4>
            <p className="text-sm text-slate-600">{getTranslation(currentLocale, 'pricing.money_back_description')}</p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="inline-flex items-center px-8 py-4 rounded-2xl bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-200 shadow-lg mb-8">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
              <span className="font-bold text-green-700 text-lg">{getTranslation(currentLocale, 'pricing.early_bird_expires')}</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-slate-600 text-lg">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span>{getTranslation(currentLocale, 'pricing.secure_payment')}</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span>{getTranslation(currentLocale, 'pricing.digital_receipts')}</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
              <span>{getTranslation(currentLocale, 'pricing.mobile_tickets')}</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default TicketPricing;