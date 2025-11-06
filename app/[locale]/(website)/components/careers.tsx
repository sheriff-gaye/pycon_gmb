"use client"

import { useState } from 'react';
import { 
  Briefcase,
  MapPin,
  Calendar,
  Clock,
  ArrowRight,
  GraduationCap,
  Code,
  Server,
  Shield,
  Layers,
  Monitor,
  Users,
  Building,
  Mail,
  FileText,
  CheckCircle,
  Sparkles,
  Brain,
  Computer
} from 'lucide-react';

const CareersPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const careerOpportunities = [
    {
      id: 1,
      title: "PRIMEFORGE ACADEMY ADMISSION",
      organization: "Primeforge Academy",
      category: "training",
      type: "Free Training Program",
      location: "The Gambia",
      deadline: "January 2026",
      duration: "Full-time Program",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop",
      description: "Primeforge Academy is launching in January 2026 to combat youth unemployment in The Gambia by offering a free training program for 20 aspiring software engineers. Participants will receive in-depth training in full-stack development and collaborative software delivery, focusing on creating applications for US, EU, and UK organizations.",
      requirements: [
        "Third or fourth-year university students",
        "Anyone with a computer science-related diploma",
        "Strong passion for software development",
        "Commitment to full-time participation"
      ],
      benefits: [
        "Free comprehensive training",
        "Full-stack development skills",
        "Collaborative software delivery training",
        "Focus on international standards (US, EU, UK)",
        "Career opportunities post-graduation"
      ],
      applyLink: "https://primeforge.io/careers",
      skills: ["Full-Stack Development", "Collaborative Development", "International Standards"]
    },
    {
      id: 2,
      title: "INTERNSHIP OPPORTUNITIES",
      organization: "Université Rose Dieng France Sénégal",
      category: "internship",
      type: "Multiple Positions",
      location: "Senegal",
      deadline: "November 15, 2025",
      duration: "Internship Period",
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=400&fit=crop",
      description: "Université Rose Dieng France Sénégal is seeking talented candidates for five exciting internship positions. This is an excellent opportunity to gain practical experience in cutting-edge technologies and contribute to meaningful projects in an academic environment.",
      positions: [
        {
          title: "Full Stack Developer",
          icon: Code,
          description: "Develop end-to-end web applications"
        },
        {
          title: "Front-End Developer",
          icon: Monitor,
          description: "Create engaging user interfaces"
        },
        {
          title: "Software Architect",
          icon: Layers,
          description: "Design scalable system architectures"
        },
        {
          title: "DevOps Engineer",
          icon: Server,
          description: "Manage deployment and infrastructure"
        },
        {
          title: "Systems, Networks & Security Administrator",
          icon: Shield,
          description: "Ensure system security and reliability"
        }
      ],
      requirements: [
        "Licence or Master's degree (or currently pursuing)",
        "Strong technical skills in relevant field",
        "Proficiency in French (applications in French)",
        "Team collaboration skills"
      ],
      benefits: [
        "Hands-on experience in professional environment",
        "Mentorship from experienced professionals",
        "Network with industry experts",
        "Potential for future employment",
        "Certificate upon completion"
      ],
      applicationDetails: {
        email: "direction@urdfs.edu.sn",
        contactPerson: "Ms. Ndeye Khady Ndiaye",
        contactEmail: "khady.ndiaye@urdfs.edu.sn",
        requiredDocuments: [
          "CV (in French)",
          "Cover letter/Motivation letter (in French)",
          "Copies of diplomas (Licence or Master's)"
        ],
        emailSubjectFormat: "Nom du poste candidaté + Prénom Nom"
      },
      skills: ["Various Technical Skills", "French Language", "Team Collaboration"]
    }
  ];

  const categories = [
    { id: 'all', label: 'All Opportunities', count: careerOpportunities.length },
    { id: 'training', label: 'Training Programs', count: careerOpportunities.filter(p => p.category === 'training').length },
    { id: 'internship', label: 'Internships', count: careerOpportunities.filter(p => p.category === 'internship').length }
  ];

  const filteredOpportunities = selectedCategory === 'all' 
    ? careerOpportunities 
    : careerOpportunities.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">   
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Join Our <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Community</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover exciting career opportunities, training programs, and internships shared by our community partners.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-linear-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category.label} ({category.count})
              </button>
            ))}
          </div>

          {/* Opportunities Grid */}
          <div className="grid grid-cols-1 gap-8">
            {filteredOpportunities.map((opportunity) => (
              <div key={opportunity.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
                {/* Image Header */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={opportunity.image} 
                    alt={opportunity.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-gray-900">
                      {opportunity.type}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{opportunity.title}</h2>
                    <div className="flex items-center text-white/90">
                      <Building className="w-4 h-4 mr-2" />
                      <span className="text-sm">{opportunity.organization}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  {/* Meta Information */}
                  <div className="flex flex-wrap gap-4 mb-6 text-sm">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                      <span>{opportunity.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 mr-2 text-purple-600" />
                      <span>Deadline: {opportunity.deadline}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2 text-yellow-600" />
                      <span>{opportunity.duration}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 mb-6 leading-relaxed">{opportunity.description}</p>

                  {/* Positions (for internship opportunity) */}
                  {opportunity.positions && (
                    <div className="mb-6">
                      <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                        <Computer className="w-5 h-5 mr-2 text-yellow-500" />
                        Available Positions
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {opportunity.positions.map((position, index) => (
                          <div key={index} className="bg-linear-to-br from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-100">
                            <div className="flex items-start">
                              <div className="bg-linear-to-br from-blue-500 to-purple-600 rounded-lg p-2 mr-3">
                                <position.icon className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900">{position.title}</h4>
                                <p className="text-sm text-gray-600">{position.description}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Requirements & Benefits Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Requirements */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <GraduationCap className="w-5 h-5 mr-2 text-blue-600" />
                        Eligibility & Requirements
                      </h3>
                      <ul className="space-y-2">
                        {opportunity.requirements.map((req, index) => (
                          <li key={index} className="flex items-start text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Benefits */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Brain className="w-5 h-5 mr-2 text-purple-600" />
                        What You'll Gain
                      </h3>
                      <ul className="space-y-2">
                        {opportunity.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Application Details (for internship) */}
                  {opportunity.applicationDetails && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-6">
                      <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                        <FileText className="w-5 h-5 mr-2 text-yellow-600" />
                        How to Apply
                      </h3>
                      <div className="space-y-3 text-sm">
                        <div>
                          <span className="font-semibold text-gray-900">Application Email: </span>
                          <a href={`mailto:${opportunity.applicationDetails.email}`} className="text-blue-600 hover:underline">
                            {opportunity.applicationDetails.email}
                          </a>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-900">Contact Person: </span>
                          <span className="text-gray-700">{opportunity.applicationDetails.contactPerson}</span>
                          <span className="text-gray-500"> ({opportunity.applicationDetails.contactEmail})</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-900">Required Documents:</span>
                          <ul className="mt-2 space-y-1 ml-4">
                            {opportunity.applicationDetails.requiredDocuments.map((doc, index) => (
                              <li key={index} className="text-gray-600">• {doc}</li>
                            ))}
                          </ul>
                        </div>
                      
                      </div>
                    </div>
                  )}

                  {/* Skills Tags */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {opportunity.skills.map((skill, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    {opportunity.applyLink ? (
                      <a 
                        href={opportunity.applyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-linear-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                      >
                        Apply Now
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </a>
                    ) : (
                      <a 
                        href={`mailto:${opportunity.applicationDetails?.email}`}
                        className="flex-1 bg-linear-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Send Application
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </a>
                    )}
                    <button className="flex-1 bg-white text-gray-900 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 border-2 border-gray-300 flex items-center justify-center">
                      <Users className="w-4 h-4 mr-2" />
                      Share Opportunity
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center bg-linear-to-r from-yellow-400 to-yellow-500 rounded-2xl p-8 shadow-lg">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Want to Post an Opportunity?</h3>
            <p className="text-gray-800 mb-6 text-lg">
              If your organization has career opportunities to share with our community, we'd love to feature them here.
            </p>
            <button className="bg-gray-900 text-white px-8 py-4 rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 inline-flex items-center">
              <Mail className="w-5 h-5 mr-2" />
              Contact Us
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CareersPage;