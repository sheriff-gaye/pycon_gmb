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
import { getTranslation } from '@/lib/i18n';
import { HeroProps } from './interfaces/interface';

const CallForVolunteers = ({currentLocale}:HeroProps) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const volunteerPositions = [
    {
      id: 1,
      title: getTranslation(currentLocale, 'call_for_volunteers.position_1_title'),
      category: "logistics",
      icon: ClipboardList,
      commitment: getTranslation(currentLocale, 'call_for_volunteers.position_1_commitment'),
      location: getTranslation(currentLocale, 'call_for_volunteers.position_1_location'),
      description: getTranslation(currentLocale, 'call_for_volunteers.position_1_description'),
      responsibilities: [
        getTranslation(currentLocale, 'call_for_volunteers.position_1_responsibility_1'),
        getTranslation(currentLocale, 'call_for_volunteers.position_1_responsibility_2'),
        getTranslation(currentLocale, 'call_for_volunteers.position_1_responsibility_3'),
        getTranslation(currentLocale, 'call_for_volunteers.position_1_responsibility_4')
      ],
      skills: [
        getTranslation(currentLocale, 'call_for_volunteers.position_1_skill_1'),
        getTranslation(currentLocale, 'call_for_volunteers.position_1_skill_2'),
        getTranslation(currentLocale, 'call_for_volunteers.position_1_skill_3'),
        getTranslation(currentLocale, 'call_for_volunteers.position_1_skill_4')
      ],
      benefits: [
        getTranslation(currentLocale, 'call_for_volunteers.position_1_benefit_1'),
        getTranslation(currentLocale, 'call_for_volunteers.position_1_benefit_2'),
        getTranslation(currentLocale, 'call_for_volunteers.position_1_benefit_3')
      ]
    },
    {
      id: 2,
      title: getTranslation(currentLocale, 'call_for_volunteers.position_2_title'),
      category: "coordination",
      icon: Megaphone,
      commitment: getTranslation(currentLocale, 'call_for_volunteers.position_2_commitment'),
      location: getTranslation(currentLocale, 'call_for_volunteers.position_2_location'),
      description: getTranslation(currentLocale, 'call_for_volunteers.position_2_description'),
      responsibilities: [
        getTranslation(currentLocale, 'call_for_volunteers.position_2_responsibility_1'),
        getTranslation(currentLocale, 'call_for_volunteers.position_2_responsibility_2'),
        getTranslation(currentLocale, 'call_for_volunteers.position_2_responsibility_3'),
        getTranslation(currentLocale, 'call_for_volunteers.position_2_responsibility_4')
      ],
      skills: [
        getTranslation(currentLocale, 'call_for_volunteers.position_2_skill_1'),
        getTranslation(currentLocale, 'call_for_volunteers.position_2_skill_2'),
        getTranslation(currentLocale, 'call_for_volunteers.position_2_skill_3'),
        getTranslation(currentLocale, 'call_for_volunteers.position_2_skill_4')
      ],
      benefits: [
        getTranslation(currentLocale, 'call_for_volunteers.position_2_benefit_1'),
        getTranslation(currentLocale, 'call_for_volunteers.position_2_benefit_2'),
        getTranslation(currentLocale, 'call_for_volunteers.position_2_benefit_3')
      ]
    },
    {
      id: 3,
      title: getTranslation(currentLocale, 'call_for_volunteers.position_3_title'),
      category: "logistics",
      icon: Users,
      commitment: getTranslation(currentLocale, 'call_for_volunteers.position_3_commitment'),
      location: getTranslation(currentLocale, 'call_for_volunteers.position_3_location'),
      description: getTranslation(currentLocale, 'call_for_volunteers.position_3_description'),
      responsibilities: [
        getTranslation(currentLocale, 'call_for_volunteers.position_3_responsibility_1'),
        getTranslation(currentLocale, 'call_for_volunteers.position_3_responsibility_2'),
        getTranslation(currentLocale, 'call_for_volunteers.position_3_responsibility_3'),
        getTranslation(currentLocale, 'call_for_volunteers.position_3_responsibility_4')
      ],
      skills: [
        getTranslation(currentLocale, 'call_for_volunteers.position_3_skill_1'),
        getTranslation(currentLocale, 'call_for_volunteers.position_3_skill_2'),
        getTranslation(currentLocale, 'call_for_volunteers.position_3_skill_3'),
        getTranslation(currentLocale, 'call_for_volunteers.position_3_skill_4')
      ],
      benefits: [
        getTranslation(currentLocale, 'call_for_volunteers.position_3_benefit_1'),
        getTranslation(currentLocale, 'call_for_volunteers.position_3_benefit_2'),
        getTranslation(currentLocale, 'call_for_volunteers.position_3_benefit_3')
      ]
    },
    {
      id: 4,
      title: getTranslation(currentLocale, 'call_for_volunteers.position_4_title'),
      category: "marketing",
      icon: Camera,
      commitment: getTranslation(currentLocale, 'call_for_volunteers.position_4_commitment'),
      location: getTranslation(currentLocale, 'call_for_volunteers.position_4_location'),
      description: getTranslation(currentLocale, 'call_for_volunteers.position_4_description'),
      responsibilities: [
        getTranslation(currentLocale, 'call_for_volunteers.position_4_responsibility_1'),
        getTranslation(currentLocale, 'call_for_volunteers.position_4_responsibility_2'),
        getTranslation(currentLocale, 'call_for_volunteers.position_4_responsibility_3'),
        getTranslation(currentLocale, 'call_for_volunteers.position_4_responsibility_4')
      ],
      skills: [
        getTranslation(currentLocale, 'call_for_volunteers.position_4_skill_1'),
        getTranslation(currentLocale, 'call_for_volunteers.position_4_skill_2'),
        getTranslation(currentLocale, 'call_for_volunteers.position_4_skill_3'),
        getTranslation(currentLocale, 'call_for_volunteers.position_4_skill_4')
      ],
      benefits: [
        getTranslation(currentLocale, 'call_for_volunteers.position_4_benefit_1'),
        getTranslation(currentLocale, 'call_for_volunteers.position_4_benefit_2'),
        getTranslation(currentLocale, 'call_for_volunteers.position_4_benefit_3')
      ]
    },
    {
      id: 5,
      title: getTranslation(currentLocale, 'call_for_volunteers.position_5_title'),
      category: "technical",
      icon: Monitor,
      commitment: getTranslation(currentLocale, 'call_for_volunteers.position_5_commitment'),
      location: getTranslation(currentLocale, 'call_for_volunteers.position_5_location'),
      description: getTranslation(currentLocale, 'call_for_volunteers.position_5_description'),
      responsibilities: [
        getTranslation(currentLocale, 'call_for_volunteers.position_5_responsibility_1'),
        getTranslation(currentLocale, 'call_for_volunteers.position_5_responsibility_2'),
        getTranslation(currentLocale, 'call_for_volunteers.position_5_responsibility_3'),
        getTranslation(currentLocale, 'call_for_volunteers.position_5_responsibility_4')
      ],
      skills: [
        getTranslation(currentLocale, 'call_for_volunteers.position_5_skill_1'),
        getTranslation(currentLocale, 'call_for_volunteers.position_5_skill_2'),
        getTranslation(currentLocale, 'call_for_volunteers.position_5_skill_3'),
        getTranslation(currentLocale, 'call_for_volunteers.position_5_skill_4')
      ],
      benefits: [
        getTranslation(currentLocale, 'call_for_volunteers.position_5_benefit_1'),
        getTranslation(currentLocale, 'call_for_volunteers.position_5_benefit_2'),
        getTranslation(currentLocale, 'call_for_volunteers.position_5_benefit_3')
      ]
    },
    {
      id: 6,
      title: getTranslation(currentLocale, 'call_for_volunteers.position_6_title'),
      category: "coordination",
      icon: DollarSign,
      commitment: getTranslation(currentLocale, 'call_for_volunteers.position_6_commitment'),
      location: getTranslation(currentLocale, 'call_for_volunteers.position_6_location'),
      description: getTranslation(currentLocale, 'call_for_volunteers.position_6_description'),
      responsibilities: [
        getTranslation(currentLocale, 'call_for_volunteers.position_6_responsibility_1'),
        getTranslation(currentLocale, 'call_for_volunteers.position_6_responsibility_2'),
        getTranslation(currentLocale, 'call_for_volunteers.position_6_responsibility_3'),
        getTranslation(currentLocale, 'call_for_volunteers.position_6_responsibility_4')
      ],
      skills: [
        getTranslation(currentLocale, 'call_for_volunteers.position_6_skill_1'),
        getTranslation(currentLocale, 'call_for_volunteers.position_6_skill_2'),
        getTranslation(currentLocale, 'call_for_volunteers.position_6_skill_3'),
        getTranslation(currentLocale, 'call_for_volunteers.position_6_skill_4')
      ],
      benefits: [
        getTranslation(currentLocale, 'call_for_volunteers.position_6_benefit_1'),
        getTranslation(currentLocale, 'call_for_volunteers.position_6_benefit_2'),
        getTranslation(currentLocale, 'call_for_volunteers.position_6_benefit_3')
      ]
    },
    {
      id: 7,
      title: getTranslation(currentLocale, 'call_for_volunteers.position_7_title'),
      category: "technical",
      icon: Code,
      commitment: getTranslation(currentLocale, 'call_for_volunteers.position_7_commitment'),
      location: getTranslation(currentLocale, 'call_for_volunteers.position_7_location'),
      description: getTranslation(currentLocale, 'call_for_volunteers.position_7_description'),
      responsibilities: [
        getTranslation(currentLocale, 'call_for_volunteers.position_7_responsibility_1'),
        getTranslation(currentLocale, 'call_for_volunteers.position_7_responsibility_2'),
        getTranslation(currentLocale, 'call_for_volunteers.position_7_responsibility_3'),
        getTranslation(currentLocale, 'call_for_volunteers.position_7_responsibility_4')
      ],
      skills: [
        getTranslation(currentLocale, 'call_for_volunteers.position_7_skill_1'),
        getTranslation(currentLocale, 'call_for_volunteers.position_7_skill_2'),
        getTranslation(currentLocale, 'call_for_volunteers.position_7_skill_3'),
        getTranslation(currentLocale, 'call_for_volunteers.position_7_skill_4')
      ],
      benefits: [
        getTranslation(currentLocale, 'call_for_volunteers.position_7_benefit_1'),
        getTranslation(currentLocale, 'call_for_volunteers.position_7_benefit_2'),
        getTranslation(currentLocale, 'call_for_volunteers.position_7_benefit_3')
      ]
    },
    {
      id: 8,
      title: getTranslation(currentLocale, 'call_for_volunteers.position_8_title'),
      category: "marketing",
      icon: Video,
      commitment: getTranslation(currentLocale, 'call_for_volunteers.position_8_commitment'),
      location: getTranslation(currentLocale, 'call_for_volunteers.position_8_location'),
      description: getTranslation(currentLocale, 'call_for_volunteers.position_8_description'),
      responsibilities: [
        getTranslation(currentLocale, 'call_for_volunteers.position_8_responsibility_1'),
        getTranslation(currentLocale, 'call_for_volunteers.position_8_responsibility_2'),
        getTranslation(currentLocale, 'call_for_volunteers.position_8_responsibility_3'),
        getTranslation(currentLocale, 'call_for_volunteers.position_8_responsibility_4')
      ],
      skills: [
        getTranslation(currentLocale, 'call_for_volunteers.position_8_skill_1'),
        getTranslation(currentLocale, 'call_for_volunteers.position_8_skill_2'),
        getTranslation(currentLocale, 'call_for_volunteers.position_8_skill_3'),
        getTranslation(currentLocale, 'call_for_volunteers.position_8_skill_4')
      ],
      benefits: [
        getTranslation(currentLocale, 'call_for_volunteers.position_8_benefit_1'),
        getTranslation(currentLocale, 'call_for_volunteers.position_8_benefit_2'),
        getTranslation(currentLocale, 'call_for_volunteers.position_8_benefit_3')
      ]
    },
    {
      id: 9,
      title: getTranslation(currentLocale, 'call_for_volunteers.position_9_title'),
      category: "logistics",
      icon: Headphones,
      commitment: getTranslation(currentLocale, 'call_for_volunteers.position_9_commitment'),
      location: getTranslation(currentLocale, 'call_for_volunteers.position_9_location'),
      description: getTranslation(currentLocale, 'call_for_volunteers.position_9_description'),
      responsibilities: [
        getTranslation(currentLocale, 'call_for_volunteers.position_9_responsibility_1'),
        getTranslation(currentLocale, 'call_for_volunteers.position_9_responsibility_2'),
        getTranslation(currentLocale, 'call_for_volunteers.position_9_responsibility_3'),
        getTranslation(currentLocale, 'call_for_volunteers.position_9_responsibility_4')
      ],
      skills: [
        getTranslation(currentLocale, 'call_for_volunteers.position_9_skill_1'),
        getTranslation(currentLocale, 'call_for_volunteers.position_9_skill_2'),
        getTranslation(currentLocale, 'call_for_volunteers.position_9_skill_3'),
        getTranslation(currentLocale, 'call_for_volunteers.position_9_skill_4')
      ],
      benefits: [
        getTranslation(currentLocale, 'call_for_volunteers.position_9_benefit_1'),
        getTranslation(currentLocale, 'call_for_volunteers.position_9_benefit_2'),
        getTranslation(currentLocale, 'call_for_volunteers.position_9_benefit_3')
      ]
    }
  ];

  const categories = [
    { id: 'all', label: getTranslation(currentLocale, 'call_for_volunteers.category_all_label'), count: volunteerPositions.length },
    { id: 'technical', label: getTranslation(currentLocale, 'call_for_volunteers.category_technical_label'), count: volunteerPositions.filter(p => p.category === 'technical').length },
    { id: 'logistics', label: getTranslation(currentLocale, 'call_for_volunteers.category_logistics_label'), count: volunteerPositions.filter(p => p.category === 'logistics').length },
    { id: 'coordination', label: getTranslation(currentLocale, 'call_for_volunteers.category_coordination_label'), count: volunteerPositions.filter(p => p.category === 'coordination').length },
    { id: 'marketing', label: getTranslation(currentLocale, 'call_for_volunteers.category_marketing_label'), count: volunteerPositions.filter(p => p.category === 'marketing').length }
  ];

  const filteredPositions = selectedCategory === 'all' 
    ? volunteerPositions 
    : volunteerPositions.filter(p => p.category === selectedCategory);

  const volunteerBenefits = [
    {
      icon: Gift,
      title: getTranslation(currentLocale, 'call_for_volunteers.volunteer_benefits_conference_access_title'),
      description: getTranslation(currentLocale, 'call_for_volunteers.volunteer_benefits_conference_access_description')
    },
    {
      icon: Star,
      title: getTranslation(currentLocale, 'call_for_volunteers.volunteer_benefits_exclusive_swag_title'),
      description: getTranslation(currentLocale, 'call_for_volunteers.volunteer_benefits_exclusive_swag_description')
    },
    {
      icon: Users,
      title: getTranslation(currentLocale, 'call_for_volunteers.volunteer_benefits_networking_title'),
      description: getTranslation(currentLocale, 'call_for_volunteers.volunteer_benefits_networking_description')
    },
    {
      icon: Award,
      title: getTranslation(currentLocale, 'call_for_volunteers.volunteer_benefits_recognition_title'),
      description: getTranslation(currentLocale, 'call_for_volunteers.volunteer_benefits_recognition_description')
    },
    {
      icon: Heart,
      title: getTranslation(currentLocale, 'call_for_volunteers.volunteer_benefits_community_impact_title'),
      description: getTranslation(currentLocale, 'call_for_volunteers.volunteer_benefits_community_impact_description')
    },
    {
      icon: Zap,
      title: getTranslation(currentLocale, 'call_for_volunteers.volunteer_benefits_skill_development_title'),
      description: getTranslation(currentLocale, 'call_for_volunteers.volunteer_benefits_skill_development_description')
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-yellow-100 to-yellow-200 border border-yellow-300 mb-6">
            <HandHeart className="w-4 h-4 text-yellow-600 mr-2" />
            <span className="text-sm font-semibold text-yellow-800">{getTranslation(currentLocale, 'call_for_volunteers.badge')}</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {getTranslation(currentLocale, 'call_for_volunteers.title_part1')} <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{getTranslation(currentLocale, 'call_for_volunteers.title_part2')}</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
            {getTranslation(currentLocale, 'call_for_volunteers.subtitle')}
          </p>
          
          <div className="flex flex-wrap justify-center gap-8 text-lg">
            <div className="flex items-center text-gray-700">
              <Calendar className="w-5 h-5 mr-2 text-blue-600" />
              <span>{getTranslation(currentLocale, 'call_for_volunteers.opportunities')}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <Clock className="w-5 h-5 mr-2 text-purple-600" />
              <span>{getTranslation(currentLocale, 'call_for_volunteers.commitment')}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <Globe className="w-5 h-5 mr-2 text-yellow-600" />
              <span>{getTranslation(currentLocale, 'call_for_volunteers.skill_levels')}</span>
            </div>
          </div>
        </div>

        {/* Why Volunteer */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 mb-16 text-white">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-4">{getTranslation(currentLocale, 'call_for_volunteers.why_volunteer_title')}</h3>
            <p className="text-blue-100 text-lg">{getTranslation(currentLocale, 'call_for_volunteers.why_volunteer_subtitle')}</p>
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
                  <h4 className="font-semibold text-gray-900 mb-2">{getTranslation(currentLocale, 'call_for_volunteers.key_responsibilities')}</h4>
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
                  <h4 className="font-semibold text-gray-900 mb-2">{getTranslation(currentLocale, 'call_for_volunteers.skills_needed')}</h4>
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
                <h4 className="font-semibold text-gray-900 mb-2">{getTranslation(currentLocale, 'call_for_volunteers.benefits')}</h4>
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
                  {getTranslation(currentLocale, 'call_for_volunteers.apply_button')}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Application Process */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">{getTranslation(currentLocale, 'call_for_volunteers.application_process_title')}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">{getTranslation(currentLocale, 'call_for_volunteers.application_step_1_title')}</h4>
              <p className="text-gray-600 text-sm">{getTranslation(currentLocale, 'call_for_volunteers.application_step_1_description')}</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">{getTranslation(currentLocale, 'call_for_volunteers.application_step_2_title')}</h4>
              <p className="text-gray-600 text-sm">{getTranslation(currentLocale, 'call_for_volunteers.application_step_2_description')}</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">{getTranslation(currentLocale, 'call_for_volunteers.application_step_3_title')}</h4>
              <p className="text-gray-600 text-sm">{getTranslation(currentLocale, 'call_for_volunteers.application_step_3_description')}</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">4</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">{getTranslation(currentLocale, 'call_for_volunteers.application_step_4_title')}</h4>
              <p className="text-gray-600 text-sm">{getTranslation(currentLocale, 'call_for_volunteers.application_step_4_description')}</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl p-8 shadow-lg">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">{getTranslation(currentLocale, 'call_for_volunteers.cta_title')}</h3>
          <p className="text-gray-800 mb-6 text-lg">
            {getTranslation(currentLocale, 'call_for_volunteers.cta_subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://docs.google.com/forms/d/e/1FAIpQLSeIOD8hC_MxuAyHPcpry7lQwemPypDQVZn2sJ-90yqYo8LtEA/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-900 text-white px-8 py-4 rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
            >
              <HandHeart className="w-5 h-5 mr-2" />
              {getTranslation(currentLocale, 'call_for_volunteers.cta_apply_button')}
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
            
            <button className="bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 border-2 border-gray-900">
              {getTranslation(currentLocale, 'call_for_volunteers.cta_contact_button')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallForVolunteers;