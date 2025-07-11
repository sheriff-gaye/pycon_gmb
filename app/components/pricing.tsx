import { ArrowRight, Check, Users, User, Building2, Star, Zap, Gift, Globe, Award } from 'lucide-react';

const TicketPricing = () => {
  const tickets = [
    {
      type: "Student",
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
     
      description: "Perfect for students and academics looking to expand their Python knowledge",
      features: [
        "Full conference access",
        "Workshop participation",
        "Networking sessions",
        "Conference materials",
        "Student ID required",
        "Lunch & refreshments"
      ],
      popular: false
    },
    {
      type: "Individual",
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
      
      description: "Ideal for individual developers and Python enthusiasts",
      features: [
        "Full conference access",
        "All workshops included",
        "Networking events",
        "Premium conference kit",
        "Certificate of attendance",
        "Lunch & refreshments",
        "Priority seating"
      ],
      popular: true
    },
    {
      type: "Corporate",
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
    
      description: "Perfect for companies investing in their development teams",
      features: [
        "Full conference access",
        "VIP workshop access",
        "Exclusive networking lounge",
        "Premium conference package",
        "Company logo recognition",
        "Lunch & refreshments",
        "Priority support",
        "Team building sessions"
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
            <span className="text-sm font-semibold text-yellow-800">Early Bird Pricing</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="text-slate-800">Choose Your</span>
            <br />
            <span className="bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 bg-clip-text text-transparent">
              Perfect Ticket
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Secure your spot at PyCon Senegambia with our flexible pricing options designed for every attendee
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
                <button className={`group w-full ${ticket.popular ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white hover:from-yellow-400 hover:to-yellow-500' : 'bg-transparent border-2 border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white'} px-8 py-4 rounded-2xl text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl`}>
                  <div className="flex items-center justify-center">
                    Select {ticket.type}
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
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
            <h4 className="font-bold text-slate-800 mb-2">Instant Access</h4>
            <p className="text-sm text-slate-600">Get your ticket confirmation and event details immediately after purchase</p>
          </div>

          <div className="text-center bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-6 border border-yellow-200">
            <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-bold text-slate-800 mb-2">Group Discounts</h4>
            <p className="text-sm text-slate-600">Special rates available for teams of 5 or more. Contact us for details</p>
          </div>

          <div className="text-center bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 border border-slate-200">
            <div className="bg-gradient-to-br from-slate-700 to-slate-900 rounded-xl w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <Award className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-bold text-slate-800 mb-2">Money Back</h4>
            <p className="text-sm text-slate-600">Full refund available up to 30 days before the event starts</p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="inline-flex items-center px-8 py-4 rounded-2xl bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-200 shadow-lg mb-8">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
              <span className="font-bold text-green-700 text-lg">Early bird pricing ends September 30, 2025</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-slate-600 text-lg">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span>Digital Receipts</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
              <span>Mobile Tickets</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default TicketPricing;
