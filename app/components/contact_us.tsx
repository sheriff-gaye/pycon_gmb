
"use client"
import { useState } from 'react';
import { 
  Mail, 
  Phone, 
  Send,
  User,
  MessageSquare,
  Building,
  CheckCircle,
} from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    message: '',
    type: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e:any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
    //   setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        organization: '',
        message: '',
        type: 'general'
      });
      
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: [
        { label: "General Inquiries", value: "info@pyconsenegambia.org" },
        { label: "Speakers", value: "speakers@pyconsenegambia.org" },
        { label: "Sponsors", value: "sponsors@pyconsenegambia.org" },
        { label: "Media", value: "media@pyconsenegambia.org" }
      ],
      color: "blue"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: [
        { label: "Gambia Office", value: "+220 XXX XXXX" },
        { label: "Senegal Office", value: "+221 XX XXX XXXX" },
        { label: "WhatsApp", value: "+220 XXX XXXX" }
      ],
      color: "green"
    },
   
  
  ];

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'speaker', label: 'Speaker Application' },
    { value: 'sponsor', label: 'Sponsorship' },
    { value: 'volunteer', label: 'Volunteer' },
    { value: 'media', label: 'Media & Press' },
    { value: 'partnership', label: 'Partnership' }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Get in <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Touch</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions about PyCon Senegambia? Want to speak, sponsor, or volunteer? 
            We would love to hear from you!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
        
          <div className="lg:col-span-1 space-y-8">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className={`bg-gradient-to-br from-${info.color}-500 to-${info.color}-600 rounded-full p-3 mr-4`}>
                    <info.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{info.title}</h3>
                </div>
                <div className="space-y-2">
                  {info.details.map((detail, idx) => (
                    <div key={idx} className="flex flex-col">
                      <span className="text-sm text-gray-500">{detail.label}</span>
                      <span className="text-gray-700 font-medium">{detail.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}           
           
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h3>
              
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-green-700">Thank you! Your message has been sent successfully.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="Your full name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Organization (Optional)
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="organization"
                        value={formData.organization}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="Your company/organization"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Inquiry Type
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    >
                      {inquiryTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

              

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                      placeholder="Please provide details about your inquiry..."
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    * Required fields. We will respond within 24 hours.
                  </p>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

      
      </div>
    </section>
  );
};

export default Contact;