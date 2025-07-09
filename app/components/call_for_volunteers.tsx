"use client"

import { useState } from 'react';
import { 
  Users, 
  Heart, 
  Star, 
  Clock, 
  MapPin, 
  Calendar, 
  Gift,
  Megaphone,
  Camera,
  Code,
  Monitor,
  ClipboardList,
  Globe,
  ArrowRight,
  CheckCircle,
  HandHeart,
  Award,
  Zap,
  DollarSign,
  Video,
  Headphones
} from 'lucide-react';

const CallForVolunteers = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const volunteerPositions = [
    {
      id: 1,
      title: "Logistics and Venue Support",
      category: "logistics",
      icon: ClipboardList,
      commitment: "6-8 hours",
      location: "Throughout Venue",
      description: "Help coordinate venue logistics, manage supplies, and ensure smooth operations throughout the conference.",
      responsibilities: [
        "Assist with venue setup and breakdown",
        "Coordinate equipment and supply distribution",
        "Manage venue logistics and space allocation",
        "Support event flow and attendee guidance"
      ],
      skills: ["Organization", "Problem-solving", "Physical coordination", "Attention to detail"],
      benefits: ["Free conference pass", "Volunteer t-shirt", "Event management experience"]
    },
    {
      id: 2,
      title: "Speakers, Runners, and Workshop Support",
      category: "coordination",
      icon: Megaphone,
      commitment: "Full conference",
      location: "Speaker Areas & Workshop Rooms",
      description: "Provide dedicated support to speakers and workshop facilitators, ensuring they have everything needed for successful sessions.",
      responsibilities: [
        "Escort speakers to their sessions",
        "Assist with presentation setup and materials",
        "Coordinate workshop logistics and attendee flow",
        "Manage speaker schedules and requirements"
      ],
      skills: ["Communication", "Organization", "People management", "Flexibility"],
      benefits: ["Speaker dinner invitation", "Premium swag", "Direct networking with speakers"]
    },
    {
      id: 3,
      title: "Crowd Control and Guest Support",
      category: "logistics",
      icon: Users,
      commitment: "Full conference",
      location: "Throughout venue",
      description: "Manage attendee flow, assist with crowd control during popular sessions, and provide general guest support.",
      responsibilities: [
        "Guide attendees to appropriate sessions and areas",
        "Manage crowd flow during breaks and meals",
        "Provide general information and assistance",
        "Handle queue management for popular sessions"
      ],
      skills: ["People skills", "Crowd management", "Problem-solving", "Patience"],
      benefits: ["All meals included", "Networking opportunities", "Leadership experience"]
    },
    {
      id: 4,
      title: "Social Media and Content Creation",
      category: "marketing",
      icon: Camera,
      commitment: "Flexible shifts",
      location: "Throughout venue",
      description: "Create engaging content, manage social media presence, and capture the conference experience for online audiences.",
      responsibilities: [
        "Create real-time social media content",
        "Photograph sessions and networking events",
        "Interview attendees and speakers",
        "Manage live social media updates and engagement"
      ],
      skills: ["Social media", "Content creation", "Photography", "Creative writing"],
      benefits: ["Professional portfolio pieces", "Creator networking", "Social media training"]
    },
    {
      id: 5,
      title: "Technical Support (Audio/Visual, Live Stream, etc)",
      category: "technical",
      icon: Monitor,
      commitment: "8-10 hours",
      location: "All Conference Rooms",
      description: "Ensure smooth technical operations including audio/visual equipment, live streaming, and technical troubleshooting.",
      responsibilities: [
        "Set up and monitor audio-visual equipment",
        "Manage live streaming and recording systems",
        "Troubleshoot technical issues during sessions",
        "Coordinate with speakers on technical requirements"
      ],
      skills: ["Technical knowledge", "Equipment handling", "Problem-solving", "Live streaming"],
      benefits: ["Technical workshop access", "AV equipment training", "Tech industry networking"]
    },
    {
      id: 6,
      title: "Grants",
      category: "coordination",
      icon: DollarSign,
      commitment: "4-6 hours",
      location: "Registration Area",
      description: "Assist with grant program coordination, application processing, and support for grant recipients.",
      responsibilities: [
        "Process grant applications and documentation",
        "Coordinate with grant recipients",
        "Assist with financial aid distribution",
        "Support grant program logistics"
      ],
      skills: ["Administrative skills", "Attention to detail", "Communication", "Confidentiality"],
      benefits: ["Administrative experience", "Grant program knowledge", "Professional references"]
    },
    {
      id: 7,
      title: "Website Development",
      category: "technical",
      icon: Code,
      commitment: "Remote/Flexible",
      location: "Remote & On-site",
      description: "Support website updates, technical improvements, and digital infrastructure during the conference.",
      responsibilities: [
        "Implement website updates and fixes",
        "Maintain conference digital platforms",
        "Support online registration systems",
        "Assist with technical documentation"
      ],
      skills: ["Web development", "HTML/CSS/JavaScript", "Problem-solving", "Version control"],
      benefits: ["Open source contributions", "Technical mentorship", "Developer networking"]
    },
    {
      id: 8,
      title: "Photography and Videography",
      category: "marketing",
      icon: Video,
      commitment: "Flexible shifts",
      location: "Throughout venue",
      description: "Capture high-quality photos and videos of the conference for promotional and archival purposes.",
      responsibilities: [
        "Photograph key moments and sessions",
        "Record video content for promotional use",
        "Edit and process visual content",
        "Coordinate with speakers for photo permissions"
      ],
      skills: ["Photography", "Video editing", "Creative eye", "Equipment handling"],
      benefits: ["Professional portfolio work", "Equipment access", "Media industry contacts"]
    },
    {
      id: 9,
      title: "Registration and Help Desk",
      category: "logistics",
      icon: Headphones,
      commitment: "6-8 hours",
      location: "Conference Entrance & Help Desk",
      description: "Manage attendee registration, provide information, and serve as the first point of contact for conference support.",
      responsibilities: [
        "Check-in attendees and distribute materials",
        "Provide conference information and assistance",
        "Handle registration issues and questions",
        "Coordinate with other volunteer teams"
      ],
      skills: ["Customer service", "Communication", "Problem-solving", "Multi-tasking"],
      benefits: ["Customer service experience", "Conference networking", "Communication skills development"]
    }
  ];

  const categories = [
    { id: 'all', label: 'All Positions', count: volunteerPositions.length },
    { id: 'technical', label: 'Technical', count: volunteerPositions.filter(p => p.category === 'technical').length },
    { id: 'logistics', label: 'Logistics', count: volunteerPositions.filter(p => p.category === 'logistics').length },
    { id: 'coordination', label: 'Coordination', count: volunteerPositions.filter(p => p.category === 'coordination').length },
    { id: 'marketing', label: 'Marketing', count: volunteerPositions.filter(p => p.category === 'marketing').length }
  ];

  const filteredPositions = selectedCategory === 'all' 
    ? volunteerPositions 
    : volunteerPositions.filter(p => p.category === selectedCategory);

  const volunteerBenefits = [
    {
      icon: Gift,
      title: "Conference Access",
      description: "Full access to all sessions, workshops, and networking events"
    },
    {
      icon: Star,
      title: "Exclusive Swag",
      description: "Special volunteer t-shirt, badge, and limited edition merchandise"
    },
    {
      icon: Users,
      title: "Networking Priority",
      description: "Access to volunteer-only events and direct contact with speakers"
    },
    {
      icon: Award,
      title: "Recognition",
      description: "Certificate of participation and LinkedIn recommendations"
    },
    {
      icon: Heart,
      title: "Community Impact",
      description: "Be part of building the Python community in West Africa"
    },
    {
      icon: Zap,
      title: "Skill Development",
      description: "Gain experience in event management and technical skills"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-yellow-100 to-yellow-200 border border-yellow-300 mb-6">
            <HandHeart className="w-4 h-4 text-yellow-600 mr-2" />
            <span className="text-sm font-semibold text-yellow-800">Join Our Mission</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Call for <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Volunteers</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
            Help us create history! Join our volunteer team and be part of the inaugural PyCon Senegambia. 
            Make lasting connections while contributing to the growth of the Python community in West Africa.
          </p>
          
          <div className="flex flex-wrap justify-center gap-8 text-lg">
            <div className="flex items-center text-gray-700">
              <Calendar className="w-5 h-5 mr-2 text-blue-600" />
              <span>Multiple volunteer opportunities available</span>
            </div>
            <div className="flex items-center text-gray-700">
              <Clock className="w-5 h-5 mr-2 text-purple-600" />
              <span>Flexible time commitments</span>
            </div>
            <div className="flex items-center text-gray-700">
              <Globe className="w-5 h-5 mr-2 text-yellow-600" />
              <span>Open to all skill levels</span>
            </div>
          </div>
        </div>

        {/* Why Volunteer */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 mb-16 text-white">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-4">Why Volunteer with Us?</h3>
            <p className="text-blue-100 text-lg">Discover the amazing benefits of joining our volunteer team</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {volunteerBenefits.map((benefit, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300">
                <benefit.icon className="w-8 h-8 text-yellow-300 mb-4" />
                <h4 className="text-lg font-semibold mb-2">{benefit.title}</h4>
                <p className="text-blue-100 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {category.label} ({category.count})
            </button>
          ))}
        </div>

        {/* Volunteer Positions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {filteredPositions.map((position) => (
            <div key={position.id} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center">
                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-3 mr-4">
                    <position.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{position.title}</h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="w-4 h-4 mr-1" />
                      {position.location}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">{position.commitment}</div>
                </div>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">{position.description}</p>

              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Key Responsibilities:</h4>
                  <ul className="space-y-1">
                    {position.responsibilities.slice(0, 3).map((resp, index) => (
                      <li key={index} className="flex items-start text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        {resp}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Skills Needed:</h4>
                  <div className="flex flex-wrap gap-2">
                    {position.skills.map((skill, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <h4 className="font-semibold text-gray-900 mb-2">Benefits:</h4>
                <div className="flex flex-wrap gap-2 mb-4">
                  {position.benefits.map((benefit, index) => (
                    <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                      {benefit}
                    </span>
                  ))}
                </div>
                
                <a 
                  href="https://docs.google.com/forms/d/e/1FAIpQLSeIOD8hC_MxuAyHPcpry7lQwemPypDQVZn2sJ-90yqYo8LtEA/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                >
                  Apply for This Position
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Application Process */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">How to Apply</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Choose Position</h4>
              <p className="text-gray-600 text-sm">Select the volunteer role that matches your interests and skills</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Fill Application</h4>
              <p className="text-gray-600 text-sm">Complete our simple online application form with your details</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Quick Interview</h4>
              <p className="text-gray-600 text-sm">Brief chat with our volunteer coordinator to discuss your role</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">4</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Get Started</h4>
              <p className="text-gray-600 text-sm">Receive your volunteer pack and join our pre-event orientation</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl p-8 shadow-lg">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Ready to Make a Difference?</h3>
          <p className="text-gray-800 mb-6 text-lg">
            Join our amazing team of volunteers and help create an unforgettable experience for the Python community in West Africa.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://docs.google.com/forms/d/e/1FAIpQLSeIOD8hC_MxuAyHPcpry7lQwemPypDQVZn2sJ-90yqYo8LtEA/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-900 text-white px-8 py-4 rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
            >
              <HandHeart className="w-5 h-5 mr-2" />
              Apply Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
            
            <button className="bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 border-2 border-gray-900">
              Questions? Contact Us
            </button>
          </div>
         
        </div>
      </div>
    </section>
  );
};

export default CallForVolunteers;