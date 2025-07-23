"use client"
import { 
  Mic, 
  Users, 
  Clock, 
  Award, 
  Globe, 
  Star,
  Calendar,
  MapPin,
  ArrowRight,
  CheckCircle,
  Target,
  Gift
} from 'lucide-react';
import { getTranslation } from '@/lib/i18n';
import { HeroProps } from './interfaces/interface';

const CallForSpeakers = ({currentLocale}:HeroProps) => {
  const speakerBenefits = [
    {
      icon: Globe,
      title: getTranslation(currentLocale, 'call_for_speakers.speaker_benefits_global_exposure_title'),
      description: getTranslation(currentLocale, 'call_for_speakers.speaker_benefits_global_exposure_description')
    },
    {
      icon: Users,
      title: getTranslation(currentLocale, 'call_for_speakers.speaker_benefits_community_impact_title'),
      description: getTranslation(currentLocale, 'call_for_speakers.speaker_benefits_community_impact_description')
    },
    {
      icon: Award,
      title: getTranslation(currentLocale, 'call_for_speakers.speaker_benefits_recognition_title'),
      description: getTranslation(currentLocale, 'call_for_speakers.speaker_benefits_recognition_description')
    },
    {
      icon: Gift,
      title: getTranslation(currentLocale, 'call_for_speakers.speaker_benefits_package_title'),
      description: getTranslation(currentLocale, 'call_for_speakers.speaker_benefits_package_description')
    }
  ];

  const trackTopics = [
    {
      category: getTranslation(currentLocale, 'call_for_speakers.track_topic_core_python_category'),
      topics: [
        getTranslation(currentLocale, 'call_for_speakers.track_topic_core_python_topic_1'),
        getTranslation(currentLocale, 'call_for_speakers.track_topic_core_python_topic_2'),
        getTranslation(currentLocale, 'call_for_speakers.track_topic_core_python_topic_3'),
        getTranslation(currentLocale, 'call_for_speakers.track_topic_core_python_topic_4')
      ]
    },
    {
      category: getTranslation(currentLocale, 'call_for_speakers.track_topic_web_development_category'),
      topics: [
        getTranslation(currentLocale, 'call_for_speakers.track_topic_web_development_topic_1'),
        getTranslation(currentLocale, 'call_for_speakers.track_topic_web_development_topic_2'),
        getTranslation(currentLocale, 'call_for_speakers.track_topic_web_development_topic_3'),
        getTranslation(currentLocale, 'call_for_speakers.track_topic_web_development_topic_4')
      ]
    },
    {
      category: getTranslation(currentLocale, 'call_for_speakers.track_topic_data_science_category'),
      topics: [
        getTranslation(currentLocale, 'call_for_speakers.track_topic_data_science_topic_1'),
        getTranslation(currentLocale, 'call_for_speakers.track_topic_data_science_topic_2'),
        getTranslation(currentLocale, 'call_for_speakers.track_topic_data_science_topic_3'),
        getTranslation(currentLocale, 'call_for_speakers.track_topic_data_science_topic_4')
      ]
    },
    {
      category: getTranslation(currentLocale, 'call_for_speakers.track_topic_devops_cloud_category'),
      topics: [
        getTranslation(currentLocale, 'call_for_speakers.track_topic_devops_cloud_topic_1'),
        getTranslation(currentLocale, 'call_for_speakers.track_topic_devops_cloud_topic_2'),
        getTranslation(currentLocale, 'call_for_speakers.track_topic_devops_cloud_topic_3'),
        getTranslation(currentLocale, 'call_for_speakers.track_topic_devops_cloud_topic_4')
      ]
    },
    {
      category: getTranslation(currentLocale, 'call_for_speakers.track_topic_community_career_category'),
      topics: [
        getTranslation(currentLocale, 'call_for_speakers.track_topic_community_career_topic_1'),
        getTranslation(currentLocale, 'call_for_speakers.track_topic_community_career_topic_2'),
        getTranslation(currentLocale, 'call_for_speakers.track_topic_community_career_topic_3'),
        getTranslation(currentLocale, 'call_for_speakers.track_topic_community_career_topic_4')
      ]
    },
    {
      category: getTranslation(currentLocale, 'call_for_speakers.track_topic_emerging_tech_category'),
      topics: [
        getTranslation(currentLocale, 'call_for_speakers.track_topic_emerging_tech_topic_1'),
        getTranslation(currentLocale, 'call_for_speakers.track_topic_emerging_tech_topic_2'),
        getTranslation(currentLocale, 'call_for_speakers.track_topic_emerging_tech_topic_3'),
        getTranslation(currentLocale, 'call_for_speakers.track_topic_emerging_tech_topic_4')
      ]
    }
  ];

  const timeline = [
    { 
      date: getTranslation(currentLocale, 'call_for_speakers.timeline_1_date'), 
      event: getTranslation(currentLocale, 'call_for_speakers.timeline_1_event'), 
      status: "current" 
    },
    { 
      date: getTranslation(currentLocale, 'call_for_speakers.timeline_2_date'), 
      event: getTranslation(currentLocale, 'call_for_speakers.timeline_2_event'), 
      status: "upcoming" 
    },
    { 
      date: getTranslation(currentLocale, 'call_for_speakers.timeline_3_date'), 
      event: getTranslation(currentLocale, 'call_for_speakers.timeline_3_event'), 
      status: "upcoming" 
    },
    { 
      date: getTranslation(currentLocale, 'call_for_speakers.timeline_4_date'), 
      event: getTranslation(currentLocale, 'call_for_speakers.timeline_4_event'), 
      status: "upcoming" 
    }
  ];

  const requirements = [
    getTranslation(currentLocale, 'call_for_speakers.requirement_1'),
    getTranslation(currentLocale, 'call_for_speakers.requirement_2'),
    getTranslation(currentLocale, 'call_for_speakers.requirement_3'),
    getTranslation(currentLocale, 'call_for_speakers.requirement_4'),
    getTranslation(currentLocale, 'call_for_speakers.requirement_5')
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-200 border border-blue-300 mb-6">
            <Mic className="w-4 h-4 text-blue-600 mr-2" />
            <span className="text-sm font-semibold text-blue-800">{getTranslation(currentLocale, 'call_for_speakers.badge')}</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {getTranslation(currentLocale, 'call_for_speakers.title_part1')} <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{getTranslation(currentLocale, 'call_for_speakers.title_part2')}</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {getTranslation(currentLocale, 'call_for_speakers.subtitle')}
          </p>
        </div>

        {/* Speaker Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {speakerBenefits.map((benefit, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group text-center">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <benefit.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Talk Formats */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">{getTranslation(currentLocale, 'call_for_speakers.talk_formats_title')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
              <Clock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h4 className="text-xl font-bold text-gray-900 mb-2">{getTranslation(currentLocale, 'call_for_speakers.talk_format_lightning_title')}</h4>
              <p className="text-gray-600 mb-3">{getTranslation(currentLocale, 'call_for_speakers.talk_format_lightning_duration')}</p>
              <p className="text-sm text-gray-500">{getTranslation(currentLocale, 'call_for_speakers.talk_format_lightning_description')}</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
              <Mic className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h4 className="text-xl font-bold text-gray-900 mb-2">{getTranslation(currentLocale, 'call_for_speakers.talk_format_standard_title')}</h4>
              <p className="text-gray-600 mb-3">{getTranslation(currentLocale, 'call_for_speakers.talk_format_standard_duration')}</p>
              <p className="text-sm text-gray-500">{getTranslation(currentLocale, 'call_for_speakers.talk_format_standard_description')}</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl">
              <Users className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
              <h4 className="text-xl font-bold text-gray-900 mb-2">{getTranslation(currentLocale, 'call_for_speakers.talk_format_workshops_title')}</h4>
              <p className="text-gray-600 mb-3">{getTranslation(currentLocale, 'call_for_speakers.talk_format_workshops_duration')}</p>
              <p className="text-sm text-gray-500">{getTranslation(currentLocale, 'call_for_speakers.talk_format_workshops_description')}</p>
            </div>
          </div>
        </div>

        {/* Track Topics */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">{getTranslation(currentLocale, 'call_for_speakers.track_topics_title')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trackTopics.map((track, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <h4 className="text-lg font-bold text-blue-600 mb-4">{track.category}</h4>
                <ul className="space-y-2">
                  {track.topics.map((topic, topicIndex) => (
                    <li key={topicIndex} className="flex items-center text-gray-600">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                      <span className="text-sm">{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Requirements */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mb-16 text-white">
          <div className="text-center mb-8">
            <Target className="w-16 h-16 text-yellow-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">{getTranslation(currentLocale, 'call_for_speakers.requirements_title')}</h3>
            <p className="text-blue-100">{getTranslation(currentLocale, 'call_for_speakers.requirements_subtitle')}</p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <ul className="space-y-4">
              {requirements.map((requirement, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-yellow-300 mr-4 mt-0.5 flex-shrink-0" />
                  <span className="text-blue-100">{requirement}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">{getTranslation(currentLocale, 'call_for_speakers.timeline_title')}</h3>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-600"></div>
              <div className="space-y-8">
                {timeline.map((item, index) => (
                  <div key={index} className="relative flex items-center">
                    <div className={`w-4 h-4 rounded-full border-4 ${
                      item.status === 'current' 
                        ? 'bg-blue-500 border-blue-200' 
                        : 'bg-gray-300 border-gray-100'
                    } mr-8`}></div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-semibold text-gray-900">{item.event}</h4>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          item.status === 'current' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {item.date}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Location & Event Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-center mb-6">
              <MapPin className="w-8 h-8 text-blue-600 mr-4" />
              <h3 className="text-xl font-bold text-gray-900">{getTranslation(currentLocale, 'call_for_speakers.location_title')}</h3>
            </div>
            <p className="text-gray-600 mb-4">
              {getTranslation(currentLocale, 'call_for_speakers.location_description')}
            </p>
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-blue-800 font-medium">
                🏨 {getTranslation(currentLocale, 'call_for_speakers.location_bonus')}
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-center mb-6">
              <Calendar className="w-8 h-8 text-purple-600 mr-4" />
              <h3 className="text-xl font-bold text-gray-900">{getTranslation(currentLocale, 'call_for_speakers.dates_title')}</h3>
            </div>
            <p className="text-gray-600 mb-4">
              {getTranslation(currentLocale, 'call_for_speakers.dates_description')}
            </p>
            <div className="bg-purple-50 rounded-lg p-4">
              <p className="text-sm text-purple-800 font-medium">
                🎤 {getTranslation(currentLocale, 'call_for_speakers.dates_bonus')}
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-12 shadow-lg border border-yellow-200">
          <Star className="w-16 h-16 text-yellow-600 mx-auto mb-6" />
          <h3 className="text-3xl font-bold text-gray-900 mb-4">{getTranslation(currentLocale, 'call_for_speakers.cta_title')}</h3>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {getTranslation(currentLocale, 'call_for_speakers.cta_subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
              {getTranslation(currentLocale, 'call_for_speakers.cta_submit_button')}
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button className="group bg-transparent border-2 border-gray-800 text-gray-800 px-8 py-4 rounded-full font-semibold hover:bg-gray-800 hover:text-white transition-all duration-300 flex items-center justify-center">
              {getTranslation(currentLocale, 'call_for_speakers.cta_guidelines_button')}
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default CallForSpeakers;