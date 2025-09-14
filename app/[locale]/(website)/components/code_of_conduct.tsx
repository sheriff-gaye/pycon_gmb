import { 
  Shield, 
  Heart, 
  Users, 
  AlertTriangle, 
  Mail,
  Eye,
  HandHeart,
  CheckCircle,
  MessageSquare,
  UserCheck,
  Globe,
  Scale
} from 'lucide-react';
import { HeroProps } from './interfaces/interface';
import { getTranslation } from '@/lib/i18n';

const CodeOfConduct = ({ currentLocale }: HeroProps) => {
  const coreValues = [
      {
          icon: Heart,
          title: getTranslation(currentLocale, 'coc.core_value_1_title'),
          description: getTranslation(currentLocale, 'coc.core_value_1_description')
      },
      {
          icon: Users,
          title: getTranslation(currentLocale, 'coc.core_value_2_title'),
          description: getTranslation(currentLocale, 'coc.core_value_2_description')
      },
      {
          icon: HandHeart,
          title: getTranslation(currentLocale, 'coc.core_value_3_title'),
          description: getTranslation(currentLocale, 'coc.core_value_3_description')
      },
      {
          icon: Globe,
          title: getTranslation(currentLocale, 'coc.core_value_4_title'),
          description: getTranslation(currentLocale, 'coc.core_value_4_description')
      }
  ];

  const inappropriateBehaviors = [
      {
          title: getTranslation(currentLocale, 'coc.inappropriate_behavior_1_title'),
          description: getTranslation(currentLocale, 'coc.inappropriate_behavior_1_description')
      },
      {
          title: getTranslation(currentLocale, 'coc.inappropriate_behavior_2_title'),
          description: getTranslation(currentLocale, 'coc.inappropriate_behavior_2_description')
      },
      {
          title: getTranslation(currentLocale, 'coc.inappropriate_behavior_3_title'),
          description: getTranslation(currentLocale, 'coc.inappropriate_behavior_3_description')
      },
      {
          title: getTranslation(currentLocale, 'coc.inappropriate_behavior_4_title'),
          description: getTranslation(currentLocale, 'coc.inappropriate_behavior_4_description')
      },
      {
          title: getTranslation(currentLocale, 'coc.inappropriate_behavior_5_title'),
          description: getTranslation(currentLocale, 'coc.inappropriate_behavior_5_description')
      },
      {
          title: getTranslation(currentLocale, 'coc.inappropriate_behavior_6_title'),
          description: getTranslation(currentLocale, 'coc.inappropriate_behavior_6_description')
      }
  ];

  const encouragedBehaviors = [
      getTranslation(currentLocale, 'coc.encouraged_behavior_1'),
      getTranslation(currentLocale, 'coc.encouraged_behavior_2'),
      getTranslation(currentLocale, 'coc.encouraged_behavior_3'),
      getTranslation(currentLocale, 'coc.encouraged_behavior_4'),
      getTranslation(currentLocale, 'coc.encouraged_behavior_5'),
      getTranslation(currentLocale, 'coc.encouraged_behavior_6')
  ];

  return (
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-green-100 to-blue-200 border border-green-300 mb-6">
                      <Shield className="w-4 h-4 text-green-600 mr-2" />
                      <span className="text-sm font-semibold text-green-800">{getTranslation(currentLocale, 'coc.community_guidelines')}</span>
                  </div>
                  
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                      {getTranslation(currentLocale, 'coc.title_part_1')} <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">{getTranslation(currentLocale, 'coc.title_part_2')}</span>
                  </h2>
                  <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                      {getTranslation(currentLocale, 'coc.header_description')}
                  </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                  {coreValues.map((value, index) => (
                      <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group text-center">
                          <div className="bg-gradient-to-br from-green-500 to-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                              <value.icon className="w-8 h-8 text-white" />
                          </div>
                          <h3 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h3>
                          <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                      </div>
                  ))}
              </div>

              <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 mb-16 text-white">
                  <div className="text-center mb-8">
                      <CheckCircle className="w-16 h-16 text-yellow-300 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold mb-2">{getTranslation(currentLocale, 'coc.short_version_title')}</h3>
                      <p className="text-green-100">{getTranslation(currentLocale, 'coc.short_version_subtitle')}</p>
                  </div>
                  
                  <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white/10 rounded-xl p-6">
                          <h4 className="font-semibold mb-3 text-yellow-300">{getTranslation(currentLocale, 'coc.our_promise_title')}</h4>
                          <p className="text-green-100 text-sm">
                              {getTranslation(currentLocale, 'coc.our_promise_description')}
                          </p>
                      </div>
                      <div className="bg-white/10 rounded-xl p-6">
                          <h4 className="font-semibold mb-3 text-yellow-300">{getTranslation(currentLocale, 'coc.zero_tolerance_title')}</h4>
                          <p className="text-green-100 text-sm">
                              {getTranslation(currentLocale, 'coc.zero_tolerance_description')}
                          </p>
                      </div>
                  </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg mb-16">
                  <div className="text-center mb-8">
                      <HandHeart className="w-12 h-12 text-green-600 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-gray-900">{getTranslation(currentLocale, 'coc.encouraged_behaviors_title')}</h3>
                      <p className="text-gray-600">{getTranslation(currentLocale, 'coc.encouraged_behaviors_subtitle')}</p>
                  </div>
                  
                  <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
                      {encouragedBehaviors.map((behavior, index) => (
                          <div key={index} className="flex items-start p-4 bg-green-50 rounded-lg">
                              <CheckCircle className="w-6 h-6 text-green-600 mr-4 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700">{behavior}</span>
                          </div>
                      ))}
                  </div>
              </div>

              <div className="mb-16">
                  <div className="text-center mb-8">
                      <AlertTriangle className="w-12 h-12 text-red-600 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-gray-900">{getTranslation(currentLocale, 'coc.inappropriate_behaviors_title')}</h3>
                      <p className="text-gray-600">{getTranslation(currentLocale, 'coc.inappropriate_behaviors_subtitle')}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {inappropriateBehaviors.map((behavior, index) => (
                          <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-red-500">
                              <h4 className="text-lg font-bold text-red-600 mb-3">{behavior.title}</h4>
                              <p className="text-gray-600 text-sm leading-relaxed">{behavior.description}</p>
                          </div>
                      ))}
                  </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg mb-16">
                  <div className="text-center mb-8">
                      <MessageSquare className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-gray-900">{getTranslation(currentLocale, 'coc.report_violations_title')}</h3>
                      <p className="text-gray-600">{getTranslation(currentLocale, 'coc.report_violations_subtitle')}</p>
                  </div>
                  
                  <div className="max-w-4xl mx-auto">
                      <div className="bg-blue-50 rounded-xl p-6 mb-8">
                          <div className="flex items-center mb-4">
                              <Mail className="w-6 h-6 text-blue-600 mr-3" />
                              <h4 className="text-lg font-semibold text-gray-900">{getTranslation(currentLocale, 'coc.primary_contact_title')}</h4>
                          </div>
                          <p className="text-gray-700 mb-2">
                              {getTranslation(currentLocale, 'coc.primary_contact_description')} <strong>info@pyconsenegambia.org</strong>
                          </p>
                          <p className="text-sm text-gray-600">
                              {getTranslation(currentLocale, 'coc.primary_contact_response_time')}
                          </p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-gray-50 rounded-xl p-6">
                              <Eye className="w-8 h-8 text-gray-600 mb-4" />
                              <h4 className="font-semibold text-gray-900 mb-2">{getTranslation(currentLocale, 'coc.what_to_include_title')}</h4>
                              <ul className="text-sm text-gray-600 space-y-1">
                                  <li>{getTranslation(currentLocale, 'coc.what_to_include_1')}</li>
                                  <li>{getTranslation(currentLocale, 'coc.what_to_include_2')}</li>
                                  <li>{getTranslation(currentLocale, 'coc.what_to_include_3')}</li>
                                  <li>{getTranslation(currentLocale, 'coc.what_to_include_4')}</li>
                                  <li>{getTranslation(currentLocale, 'coc.what_to_include_5')}</li>
                              </ul>
                          </div>
                          
                          <div className="bg-gray-50 rounded-xl p-6">
                              <UserCheck className="w-8 h-8 text-gray-600 mb-4" />
                              <h4 className="font-semibold text-gray-900 mb-2">{getTranslation(currentLocale, 'coc.during_event_title')}</h4>
                              <p className="text-sm text-gray-600">
                                  {getTranslation(currentLocale, 'coc.during_event_description')}
                              </p>
                          </div>
                      </div>
                  </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                  <div className="bg-white rounded-2xl p-8 shadow-lg">
                      <div className="flex items-center mb-6">
                          <Scale className="w-8 h-8 text-orange-600 mr-4" />
                          <h3 className="text-xl font-bold text-gray-900">{getTranslation(currentLocale, 'coc.enforcement_process_title')}</h3>
                      </div>
                      <div className="space-y-4">
                          <div className="flex items-start">
                              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              <div>
                                  <h4 className="font-semibold text-gray-900">{getTranslation(currentLocale, 'coc.enforcement_acknowledgment_title')}</h4>
                                  <p className="text-sm text-gray-600">{getTranslation(currentLocale, 'coc.enforcement_acknowledgment_description')}</p>
                              </div>
                          </div>
                          <div className="flex items-start">
                              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              <div>
                                  <h4 className="font-semibold text-gray-900">{getTranslation(currentLocale, 'coc.enforcement_investigation_title')}</h4>
                                  <p className="text-sm text-gray-600">{getTranslation(currentLocale, 'coc.enforcement_investigation_description')}</p>
                              </div>
                          </div>
                          <div className="flex items-start">
                              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              <div>
                                  <h4 className="font-semibold text-gray-900">{getTranslation(currentLocale, 'coc.enforcement_action_title')}</h4>
                                  <p className="text-sm text-gray-600">{getTranslation(currentLocale, 'coc.enforcement_action_description')}</p>
                              </div>
                          </div>
                      </div>
                  </div>
                  
                  <div className="bg-white rounded-2xl p-8 shadow-lg">
                      <div className="flex items-center mb-6">
                          <AlertTriangle className="w-8 h-8 text-red-600 mr-4" />
                          <h3 className="text-xl font-bold text-gray-900">{getTranslation(currentLocale, 'coc.possible_consequences_title')}</h3>
                      </div>
                      <div className="space-y-4">
                          <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-400">
                              <h4 className="font-semibold text-gray-900">{getTranslation(currentLocale, 'coc.consequence_warning_title')}</h4>
                              <p className="text-sm text-gray-600">{getTranslation(currentLocale, 'coc.consequence_warning_description')}</p>
                          </div>
                          <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-400">
                              <h4 className="font-semibold text-gray-900">{getTranslation(currentLocale, 'coc.consequence_expulsion_title')}</h4>
                              <p className="text-sm text-gray-600">{getTranslation(currentLocale, 'coc.consequence_expulsion_description')}</p>
                          </div>
                          <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-400">
                              <h4 className="font-semibold text-gray-900">{getTranslation(currentLocale, 'coc.consequence_legal_action_title')}</h4>
                              <p className="text-sm text-gray-600">{getTranslation(currentLocale, 'coc.consequence_legal_action_description')}</p>
                          </div>
                      </div>
                  </div>
              </div>

              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 text-white mb-16">
                  <div className="text-center mb-8">
                      <Globe className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold mb-2">{getTranslation(currentLocale, 'coc.scope_application_title')}</h3>
                      <p className="text-gray-300">{getTranslation(currentLocale, 'coc.scope_application_subtitle')}</p>
                  </div>
                  
                  <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-white/10 rounded-xl p-6 text-center">
                          <h4 className="font-semibold mb-3 text-blue-400">{getTranslation(currentLocale, 'coc.scope_in_person_title')}</h4>
                          <p className="text-gray-300 text-sm">{getTranslation(currentLocale, 'coc.scope_in_person_description')}</p>
                      </div>
                      <div className="bg-white/10 rounded-xl p-6 text-center">
                          <h4 className="font-semibold mb-3 text-blue-400">{getTranslation(currentLocale, 'coc.scope_online_title')}</h4>
                          <p className="text-gray-300 text-sm">{getTranslation(currentLocale, 'coc.scope_online_description')}</p>
                      </div>
                      <div className="bg-white/10 rounded-xl p-6 text-center">
                          <h4 className="font-semibold mb-3 text-blue-400">{getTranslation(currentLocale, 'coc.scope_off_site_title')}</h4>
                          <p className="text-gray-300 text-sm">{getTranslation(currentLocale, 'coc.scope_off_site_description')}</p>
                      </div>
                  </div>
              </div>

              <div className="text-center bg-gradient-to-br from-green-50 to-blue-100 rounded-2xl p-12 shadow-lg border border-green-200">
                  <Heart className="w-16 h-16 text-green-600 mx-auto mb-6" />
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">{getTranslation(currentLocale, 'coc.closing_message_title')}</h3>
                  <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                      {getTranslation(currentLocale, 'coc.closing_message_description')}
                  </p>
                  
                  <div className="bg-white/80 rounded-xl p-6 inline-block">
                      <p className="text-sm text-gray-700 mb-2">
                          <strong>{getTranslation(currentLocale, 'coc.closing_questions')}</strong>
                      </p>
                      <p className="text-sm text-gray-600">
                          {getTranslation(currentLocale, 'coc.closing_contact')} <a href="mailto:info@pyconsenegambia.org" className="text-blue-600 hover:underline font-medium">info@pyconsenegambia.org</a>
                      </p>
                  </div>
                  
                  <div className="mt-8 text-xs text-gray-500">
                      <p>
                          {getTranslation(currentLocale, 'coc.closing_license')}
                      </p>
                  </div>
              </div>
          </div>
      </section>
  );
};

export default CodeOfConduct;