"use client"
import { useState } from 'react';
import { 
  Mail, 
  Phone, 
  Send,
  User,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  LucideIcon
} from 'lucide-react';
import { getTranslation } from '@/lib/i18n';
import { HeroProps } from './interfaces/interface';

interface FormData {
  name: string;
  email: string;
  message: string;
  type: string;
}

interface ContactDetail {
  label: string;
  value: string;
}

interface ContactInfo {
  icon: LucideIcon;
  title: string;
  details: ContactDetail[];
  color: string;
}

interface InquiryType {
  value: string;
  label: string;
}

type SubmitStatus = 'success' | 'error' | null;

const Contact = ({currentLocale}:HeroProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
    type: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage('');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          message: '',
          type: 'general'
        });
        
        // Reset status after 5 seconds
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setErrorMessage('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo: ContactInfo[] = [
    {
      icon: Mail,
      title: "Email Us",
      details: [
        { label: "General Inquiries", value: "info@pyconsenegambia.org" },
      ],
      color: "blue"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: [
        { label: "Gambia Office", value: "+220 3404520" },
        { label: "Senegal Office", value: "+221 773174391" },
      ],
      color: "green"
    },
  ];

  const inquiryTypes: InquiryType[] = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'speaker', label: 'Speaker Application' },
    { value: 'sponsor', label: 'Sponsorship' },
    { value: 'volunteer', label: 'Volunteer' },
    { value: 'media', label: 'Media & Press' },
    { value: 'partnership', label: 'Partnership' }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {getTranslation(currentLocale, 'contact.title_part1')} <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{getTranslation(currentLocale, 'contact.title_part2')}</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          {getTranslation(currentLocale, 'contact.subtitle')}
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

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
                  <AlertCircle className="w-5 h-5 text-red-600 mr-3" />
                  <span className="text-red-700">{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                    {getTranslation(currentLocale, 'contact.form_name_label')}
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
                        placeholder={getTranslation(currentLocale, 'contact.form_name_placeholder')}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                    {getTranslation(currentLocale, 'contact.form_email_label')}
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
                        placeholder={getTranslation(currentLocale, 'contact.form_email_placeholder')}
                      />
                    </div>
                  </div>
                </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                    {getTranslation(currentLocale, 'contact.form_inquiry_label')}
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                  {getTranslation(currentLocale, 'contact.form_message_label')}
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
                      placeholder=  {getTranslation(currentLocale, 'contact.form_message_placeholder')}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                 
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
                        {getTranslation(currentLocale, 'contact.form_submit_button')}
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