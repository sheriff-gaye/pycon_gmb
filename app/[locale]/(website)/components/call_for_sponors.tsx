"use client"
import {
  Heart,
  Users,
  Globe,
  Award,
  ArrowRight,
  CheckCircle,
  Target,
  Gift,
  Trophy,
  Crown,
  Medal,
  Sparkles,
  Building2,
  Handshake,
  CreditCard,
  Smartphone,
  Copy,
  Mail,
  Phone
} from "lucide-react";
import { useState } from "react";
import { getTranslation } from "@/lib/i18n";
import { HeroProps } from "./interfaces/interface";

const Sponsorship = ({ currentLocale }: HeroProps) => {
  const [copiedField, setCopiedField] = useState("");

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(field);
      setTimeout(() => setCopiedField(""), 2000);
    });
  };

  const sponsorshipTiers = [
    {
      tier: getTranslation(currentLocale, "sponsorship.tier_bronze"),
      price: "D10,000",
      icon: Medal,
      color: "from-amber-600 to-orange-600",
      bgColor: "from-amber-50 to-orange-50",
      borderColor: "border-amber-200",
      benefits: [
        getTranslation(currentLocale, "sponsorship.bronze_benefit_1"),
        getTranslation(currentLocale, "sponsorship.bronze_benefit_2"),
        getTranslation(currentLocale, "sponsorship.bronze_benefit_3"),
        getTranslation(currentLocale, "sponsorship.bronze_benefit_4"),
        getTranslation(currentLocale, "sponsorship.bronze_benefit_5")
      ]
    },
    {
      tier: getTranslation(currentLocale, "sponsorship.tier_silver"),
      price: "D15,000",
      icon: Award,
      color: "from-gray-500 to-slate-600",
      bgColor: "from-gray-50 to-slate-50",
      borderColor: "border-gray-200",
     
      benefits: [
        getTranslation(currentLocale, "sponsorship.silver_benefit_1"),
        getTranslation(currentLocale, "sponsorship.silver_benefit_2"),
        getTranslation(currentLocale, "sponsorship.silver_benefit_3"),
        getTranslation(currentLocale, "sponsorship.silver_benefit_4"),
        getTranslation(currentLocale, "sponsorship.silver_benefit_5"),
        getTranslation(currentLocale, "sponsorship.silver_benefit_6"),
        getTranslation(currentLocale, "sponsorship.silver_benefit_7")
      ]
    },
    {
      tier: getTranslation(currentLocale, "sponsorship.tier_gold"),
      price: "D25,000",
       popular: true,
      icon: Trophy,
      color: "from-yellow-500 to-amber-500",
      bgColor: "from-yellow-50 to-amber-50",
      borderColor: "border-yellow-200",
      benefits: [
        getTranslation(currentLocale, "sponsorship.gold_benefit_1"),
        getTranslation(currentLocale, "sponsorship.gold_benefit_2"),
        getTranslation(currentLocale, "sponsorship.gold_benefit_3"),
        getTranslation(currentLocale, "sponsorship.gold_benefit_4"),
        getTranslation(currentLocale, "sponsorship.gold_benefit_5"),
        getTranslation(currentLocale, "sponsorship.gold_benefit_6"),
        getTranslation(currentLocale, "sponsorship.gold_benefit_7"),
        getTranslation(currentLocale, "sponsorship.gold_benefit_8")
      ]
    },
    {
      tier: getTranslation(currentLocale, "sponsorship.tier_platinum"),
      price: "D35,000+",
      icon: Crown,
      color: "from-purple-600 to-indigo-600",
      bgColor: "from-purple-50 to-indigo-50",
      borderColor: "border-purple-200",
      premium: true,
      benefits: [
        getTranslation(currentLocale, "sponsorship.platinum_benefit_1"),
        getTranslation(currentLocale, "sponsorship.platinum_benefit_2"),
        getTranslation(currentLocale, "sponsorship.platinum_benefit_3"),
        getTranslation(currentLocale, "sponsorship.platinum_benefit_4"),
        getTranslation(currentLocale, "sponsorship.platinum_benefit_5"),
        getTranslation(currentLocale, "sponsorship.platinum_benefit_6"),
        getTranslation(currentLocale, "sponsorship.platinum_benefit_7"),
        getTranslation(currentLocale, "sponsorship.platinum_benefit_8"),
        getTranslation(currentLocale, "sponsorship.platinum_benefit_9")
      ]
    }
  ];

  const sponsorshipBenefits = [
    {
      icon: Users,
      title: getTranslation(
        currentLocale,
        "sponsorship.benefit_community_title"
      ),
      description: getTranslation(
        currentLocale,
        "sponsorship.benefit_community_description"
      )
    },
    {
      icon: Building2,
      title: getTranslation(currentLocale, "sponsorship.benefit_brand_title"),
      description: getTranslation(
        currentLocale,
        "sponsorship.benefit_brand_description"
      )
    },
    {
      icon: Handshake,
      title: getTranslation(currentLocale, "sponsorship.benefit_talent_title"),
      description: getTranslation(
        currentLocale,
        "sponsorship.benefit_talent_description"
      )
    },
    {
      icon: Globe,
      title: getTranslation(currentLocale, "sponsorship.benefit_market_title"),
      description: getTranslation(
        currentLocale,
        "sponsorship.benefit_market_description"
      )
    }
  ];

  const paymentMethods = [
    {
      method: getTranslation(
        currentLocale,
        "sponsorship.payment_bank_transfer"
      ),
      icon: CreditCard,
      details: {
        [getTranslation(currentLocale, "sponsorship.bank_name")]:
          "Ecobank Account",
        [getTranslation(currentLocale, "sponsorship.account_name")]:
          "Cube - The Gambia",
        [getTranslation(currentLocale, "sponsorship.account_number")]:
          "6248006819",
       
      }
    },
    {
      method: getTranslation(currentLocale, "sponsorship.payment_mobile_money"),
      icon: Smartphone,
      details: {
        [getTranslation(currentLocale, "sponsorship.provider")]:
          "Wave",
        [getTranslation(currentLocale, "sponsorship.number")]: "+220 7148444",
        [getTranslation(currentLocale, "sponsorship.name")]:
          "PyCon Senegambia Org"
      }
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br  from-gray-50 to-blue-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-pink-400/20 to-yellow-400/20 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-100 via-pink-100 to-purple-200 border border-purple-300 mb-6 shadow-lg">
            <Heart className="w-5 h-5 text-purple-600 mr-2 animate-pulse" />
            <span className="text-sm font-semibold text-purple-800">
              {getTranslation(currentLocale, "sponsorship.partner_with_us")}
            </span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            {getTranslation(currentLocale, "sponsorship.header_title")}
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
              {getTranslation(currentLocale, "sponsorship.header_sponsor")}
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {getTranslation(currentLocale, "sponsorship.header_description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {sponsorshipBenefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group text-center border border-white/20"
            >
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <benefit.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              {getTranslation(currentLocale, "sponsorship.tiers_title")}
            </h3>
            <p className="text-lg text-gray-600">
              {getTranslation(currentLocale, "sponsorship.tiers_description")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {sponsorshipTiers.map((tier, index) => (
              <div
                key={index}
                className={`relative bg-gradient-to-br ${
                  tier.bgColor
                } rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 ${
                  tier.borderColor
                } group ${
                  tier.popular ? "ring-4 ring-purple-200 scale-105" : ""
                } ${tier.premium ? "ring-4 ring-yellow-200 scale-105" : ""}`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                      {getTranslation(
                        currentLocale,
                        "sponsorship.popular_label"
                      )}
                    </span>
                  </div>
                )}

                {tier.premium && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center">
                      <Sparkles className="w-4 h-4 mr-1" />
                      {getTranslation(
                        currentLocale,
                        "sponsorship.premium_label"
                      )}
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${tier.color} shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <tier.icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">
                    {tier.tier}
                  </h4>
                  <p className="text-lg font-semibold text-gray-600">
                    {tier.price}
                  </p>
                </div>

                <ul className="space-y-3 mb-8">
                  {tier.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-start text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full bg-gradient-to-r ${tier.color} text-white py-3 px-6 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 group`}
                >
                  {getTranslation(currentLocale, "sponsorship.choose_tier")}
                  <ArrowRight className="w-4 h-4 inline-block ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-10 shadow-xl border border-white/20 mb-16">
          <div className="text-center mb-10">
            <Target className="w-16 h-16 text-purple-600 mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              {getTranslation(currentLocale, "sponsorship.payment_title")}
            </h3>
            <p className="text-lg text-gray-600">
              {getTranslation(currentLocale, "sponsorship.payment_description")}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {paymentMethods.map((method, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200 shadow-lg"
              >
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                    <method.icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900">
                    {method.method}
                  </h4>
                </div>

                <div className="space-y-4">
                  {Object.entries(method.details).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg group hover:bg-gray-100 transition-colors"
                    >
                      <span className="text-sm font-medium text-gray-700">
                        {key}:
                      </span>
                      <div className="flex items-center">
                        <span className="text-sm font-semibold text-gray-900 mr-2">
                          {value}
                        </span>
                        <button
                          onClick={() =>
                            copyToClipboard(value, `${method.method}-${key}`)
                          }
                          className="p-1 text-gray-400 hover:text-purple-600 transition-colors"
                          title={getTranslation(
                            currentLocale,
                            "sponsorship.copy_to_clipboard"
                          )}
                        >
                          {copiedField === `${method.method}-${key}` ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-8 text-white shadow-xl">
            <div className="flex items-center mb-6">
              <Gift className="w-10 h-10 text-yellow-300 mr-4" />
              <h3 className="text-2xl font-bold">
                {getTranslation(
                  currentLocale,
                  "sponsorship.custom_package_title"
                )}
              </h3>
            </div>
            <p className="text-purple-100 mb-6 leading-relaxed">
              {getTranslation(
                currentLocale,
                "sponsorship.custom_package_description"
              )}
            </p>
            <button className="bg-white text-purple-600 px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 group">
              {getTranslation(
                currentLocale,
                "sponsorship.discuss_custom_package"
              )}
              <ArrowRight className="w-4 h-4 inline-block ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
            <div className="flex items-center mb-6">
              <Mail className="w-10 h-10 text-purple-600 mr-4" />
              <h3 className="text-2xl font-bold text-gray-900">
                {getTranslation(currentLocale, "sponsorship.contact_title")}
              </h3>
            </div>
            <p className="text-gray-600 mb-6">
              {getTranslation(currentLocale, "sponsorship.contact_description")}
            </p>
            <div className="space-y-4">
              <div className="flex items-center text-gray-700">
                <Mail className="w-5 h-5 text-purple-600 mr-3" />
                <span className="font-medium">
                  sponsors@pyconsenegambia.org
                </span>
              </div>
              <div className="flex items-center text-gray-700">
                <Phone className="w-5 h-5 text-purple-600 mr-3" />
                <span className="font-medium">+220 3913726</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 rounded-3xl p-12 shadow-xl border border-yellow-200">
          <div className="flex items-center justify-center mb-6">
            <Heart className="w-16 h-16 text-pink-500 mr-4 animate-pulse" />
            <Sparkles className="w-16 h-16 text-yellow-500" />
          </div>
          <h3 className="text-4xl font-bold text-gray-900 mb-4">
            {getTranslation(currentLocale, "sponsorship.cta_title")}
          </h3>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {getTranslation(currentLocale, "sponsorship.cta_description")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://gofund.me/bb798053" className="group bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
              {getTranslation(currentLocale, "sponsorship.cta_become_sponsor")}
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>

           
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sponsorship;
