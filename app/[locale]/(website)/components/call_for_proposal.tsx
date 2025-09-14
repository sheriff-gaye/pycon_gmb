"use client"
import { 
  FileText, 
  Lightbulb, 
  Users, 
  Award, 
  Clock, 
  CheckCircle,
  ArrowRight,
  Target,
  Star,
  Zap,
  Globe,
  Code,
  Brain,
  TrendingUp,
  BookOpen,
  MessageSquare
} from 'lucide-react';
import { getTranslation } from '@/lib/i18n';
import { HeroProps } from './interfaces/interface';

const CallForProposals = ({currentLocale}:HeroProps) => {
  const proposalTypes = [
    {
      icon: Code,
      title: getTranslation(currentLocale, 'call_for_proposals.technical_talks_title'),
      duration: getTranslation(currentLocale, 'call_for_proposals.technical_talks_duration'),
      description: getTranslation(currentLocale, 'call_for_proposals.technical_talks_description'),
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Users,
      title: getTranslation(currentLocale, 'call_for_proposals.community_talks_title'),
      duration: getTranslation(currentLocale, 'call_for_proposals.community_talks_duration'), 
      description: getTranslation(currentLocale, 'call_for_proposals.community_talks_description'),
      color: "from-green-500 to-green-600"
    },
    {
      icon: Brain,
      title: getTranslation(currentLocale, 'call_for_proposals.case_studies_title'),
      duration: getTranslation(currentLocale, 'call_for_proposals.case_studies_duration'),
      description: getTranslation(currentLocale, 'call_for_proposals.case_studies_description'),
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: TrendingUp,
      title: getTranslation(currentLocale, 'call_for_proposals.industry_insights_title'),
      duration: getTranslation(currentLocale, 'call_for_proposals.industry_insights_duration'),
      description: getTranslation(currentLocale, 'call_for_proposals.industry_insights_description'),
      color: "from-yellow-500 to-yellow-600"
    },
    {
      icon: BookOpen,
      title: getTranslation(currentLocale, 'call_for_proposals.tutorial_sessions_title'),
      duration: getTranslation(currentLocale, 'call_for_proposals.tutorial_sessions_duration'),
      description: getTranslation(currentLocale, 'call_for_proposals.tutorial_sessions_description'),
      color: "from-red-500 to-red-600"
    },
    {
      icon: Zap,
      title: getTranslation(currentLocale, 'call_for_proposals.lightning_talks_title'),
      duration: getTranslation(currentLocale, 'call_for_proposals.lightning_talks_duration'),
      description: getTranslation(currentLocale, 'call_for_proposals.lightning_talks_description'),
      color: "from-indigo-500 to-indigo-600"
    }
  ];

  const submissionCriteria = [
    {
      category: getTranslation(currentLocale, 'call_for_proposals.criteria_relevance'),
      weight: "25%",
      description: getTranslation(currentLocale, 'call_for_proposals.criteria_relevance_description')
    },
    {
      category: getTranslation(currentLocale, 'call_for_proposals.criteria_originality'),
      weight: "25%",
      description: getTranslation(currentLocale, 'call_for_proposals.criteria_originality_description')
    },
    {
      category: getTranslation(currentLocale, 'call_for_proposals.criteria_quality'),
      weight: "25%",
      description: getTranslation(currentLocale, 'call_for_proposals.criteria_quality_description')
    },
    {
      category: getTranslation(currentLocale, 'call_for_proposals.criteria_impact'),
      weight: "25%",
      description: getTranslation(currentLocale, 'call_for_proposals.criteria_impact_description')
    }
  ];

  const reviewProcess = [
    {
      step: "1",
      title: getTranslation(currentLocale, 'call_for_proposals.review_process_initial_title'),
      description: getTranslation(currentLocale, 'call_for_proposals.review_process_initial_description'),
      timeline: getTranslation(currentLocale, 'call_for_proposals.review_process_initial_timeline')
    },
    {
      step: "2", 
      title: getTranslation(currentLocale, 'call_for_proposals.review_process_expert_title'),
      description: getTranslation(currentLocale, 'call_for_proposals.review_process_expert_description'),
      timeline: getTranslation(currentLocale, 'call_for_proposals.review_process_expert_timeline')
    },
    {
      step: "3",
      title: getTranslation(currentLocale, 'call_for_proposals.review_process_community_title'), 
      description: getTranslation(currentLocale, 'call_for_proposals.review_process_community_description'),
      timeline: getTranslation(currentLocale, 'call_for_proposals.review_process_community_timeline')
    },
    {
      step: "4",
      title: getTranslation(currentLocale, 'call_for_proposals.review_process_final_title'),
      description: getTranslation(currentLocale, 'call_for_proposals.review_process_final_description'),
      timeline: getTranslation(currentLocale, 'call_for_proposals.review_process_final_timeline')
    }
  ];

  const proposalTips = [
    {
      icon: Target,
      title: getTranslation(currentLocale, 'call_for_proposals.tip_be_specific_title'),
      tip: getTranslation(currentLocale, 'call_for_proposals.tip_be_specific_description')
    },
    {
      icon: Users,
      title: getTranslation(currentLocale, 'call_for_proposals.tip_know_audience_title'), 
      tip: getTranslation(currentLocale, 'call_for_proposals.tip_know_audience_description')
    },
    {
      icon: Star,
      title: getTranslation(currentLocale, 'call_for_proposals.tip_show_expertise_title'),
      tip: getTranslation(currentLocale, 'call_for_proposals.tip_show_expertise_description')
    },
    {
      icon: Code,
      title: getTranslation(currentLocale, 'call_for_proposals.tip_include_examples_title'),
      tip: getTranslation(currentLocale, 'call_for_proposals.tip_include_examples_description')
    },
    {
      icon: Clock,
      title: getTranslation(currentLocale, 'call_for_proposals.tip_mind_time_title'),
      tip: getTranslation(currentLocale, 'call_for_proposals.tip_mind_time_description')
    },
    {
      icon: Lightbulb,
      title: getTranslation(currentLocale, 'call_for_proposals.tip_make_engaging_title'),
      tip: getTranslation(currentLocale, 'call_for_proposals.tip_make_engaging_description')
    }
  ];

  const requiredFields = [
    getTranslation(currentLocale, 'call_for_proposals.required_field_1'),
    getTranslation(currentLocale, 'call_for_proposals.required_field_2'),
    getTranslation(currentLocale, 'call_for_proposals.required_field_3'),
    getTranslation(currentLocale, 'call_for_proposals.required_field_4'),
    getTranslation(currentLocale, 'call_for_proposals.required_field_5'),
    getTranslation(currentLocale, 'call_for_proposals.required_field_6'),
    getTranslation(currentLocale, 'call_for_proposals.required_field_7'),
    getTranslation(currentLocale, 'call_for_proposals.required_field_8')
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-slate-100 to-slate-200 border border-slate-300 mb-6">
            <FileText className="w-4 h-4 text-slate-600 mr-2" />
            <span className="text-sm font-semibold text-slate-800">{getTranslation(currentLocale, 'call_for_proposals.badge')}</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            {getTranslation(currentLocale, 'call_for_proposals.title_part1')} <span className="bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">{getTranslation(currentLocale, 'call_for_proposals.title_part2')}</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            {getTranslation(currentLocale, 'call_for_proposals.subtitle')}
          </p>
        </div>

        {/* Proposal Types */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">{getTranslation(currentLocale, 'call_for_proposals.proposal_categories_title')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {proposalTypes.map((type, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className={`bg-gradient-to-r ${type.color} rounded-xl w-14 h-14 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <type.icon className="w-7 h-7 text-white" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">{type.title}</h4>
                <div className="text-slate-500 text-sm font-medium mb-3">{type.duration}</div>
                <p className="text-slate-600 leading-relaxed">{type.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Submission Guidelines */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-16">
          <div className="text-center mb-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-slate-900 mb-2">{getTranslation(currentLocale, 'call_for_proposals.submission_requirements_title')}</h3>
            <p className="text-slate-600">{getTranslation(currentLocale, 'call_for_proposals.submission_requirements_subtitle')}</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {requiredFields.map((field, index) => (
                <div key={index} className="flex items-start p-4 bg-slate-50 rounded-lg">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-slate-700 font-medium">{field}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Evaluation Criteria */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-8 mb-16 text-white">
          <div className="text-center mb-8">
            <Award className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">{getTranslation(currentLocale, 'call_for_proposals.evaluation_criteria_title')}</h3>
            <p className="text-slate-300">{getTranslation(currentLocale, 'call_for_proposals.evaluation_criteria_subtitle')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {submissionCriteria.map((criteria, index) => (
              <div key={index} className="text-center bg-slate-700/50 rounded-xl p-6 backdrop-blur-sm">
                <div className="text-3xl font-bold text-yellow-400 mb-2">{criteria.weight}</div>
                <h4 className="text-lg font-semibold mb-3">{criteria.category}</h4>
                <p className="text-slate-300 text-sm leading-relaxed">{criteria.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Review Process */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">{getTranslation(currentLocale, 'call_for_proposals.review_process_title')}</h3>
          <div className="max-w-5xl mx-auto">
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-slate-500 to-slate-700 hidden md:block"></div>
              <div className="space-y-8">
                {reviewProcess.map((phase, index) => (
                  <div key={index} className="relative flex items-start">
                    <div className="bg-gradient-to-r from-slate-600 to-slate-800 text-white rounded-full w-12 h-12 flex items-center justify-center mr-6 font-bold text-lg flex-shrink-0 shadow-lg">
                      {phase.step}
                    </div>
                    <div className="flex-1 bg-white rounded-xl p-6 shadow-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-xl font-bold text-slate-900">{phase.title}</h4>
                        <span className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                          {phase.timeline}
                        </span>
                      </div>
                      <p className="text-slate-600">{phase.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Proposal Tips */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">{getTranslation(currentLocale, 'call_for_proposals.proposal_tips_title')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {proposalTips.map((tip, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-500 rounded-full w-10 h-10 flex items-center justify-center mr-3">
                    <tip.icon className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">{tip.title}</h4>
                </div>
                <p className="text-slate-700 leading-relaxed">{tip.tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Important Dates */}
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-8 shadow-lg border border-yellow-200 mb-16">
          <div className="text-center mb-8">
            <Clock className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-slate-900 mb-2">{getTranslation(currentLocale, 'call_for_proposals.important_deadlines_title')}</h3>
            <p className="text-slate-600">{getTranslation(currentLocale, 'call_for_proposals.important_deadlines_subtitle')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="text-center bg-white rounded-xl p-6 shadow-md">
              <div className="text-2xl font-bold text-yellow-600 mb-2">{getTranslation(currentLocale, 'call_for_proposals.deadline_conference_date')}</div>
              <div className="text-slate-900 font-semibold mb-1">{getTranslation(currentLocale, 'call_for_proposals.deadline_conference_title')}</div>
              <div className="text-slate-500 text-sm">{getTranslation(currentLocale, 'call_for_proposals.deadline_conference_description')}</div>
            </div>
          </div>
        </div>

        {/* Community Focus */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-center mb-6">
              <Globe className="w-8 h-8 text-blue-600 mr-4" />
              <h3 className="text-xl font-bold text-slate-900">{getTranslation(currentLocale, 'call_for_proposals.regional_impact_title')}</h3>
            </div>
            <p className="text-slate-600 leading-relaxed mb-4">
              {getTranslation(currentLocale, 'call_for_proposals.regional_impact_description')}
            </p>
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-blue-800 font-medium">
                💡 {getTranslation(currentLocale, 'call_for_proposals.regional_impact_bonus')}
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-center mb-6">
              <MessageSquare className="w-8 h-8 text-green-600 mr-4" />
              <h3 className="text-xl font-bold text-slate-900">{getTranslation(currentLocale, 'call_for_proposals.first_time_speakers_title')}</h3>
            </div>
            <p className="text-slate-600 leading-relaxed mb-4">
              {getTranslation(currentLocale, 'call_for_proposals.first_time_speakers_description')}
            </p>
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-sm text-green-800 font-medium">
                🌟 {getTranslation(currentLocale, 'call_for_proposals.first_time_speakers_bonus')}
              </p>
            </div>
          </div>
        </div>

        {/* Special Categories */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 shadow-lg border border-purple-200 mb-16">
          <div className="text-center mb-8">
            <Star className="w-16 h-16 text-purple-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-slate-900 mb-2">{getTranslation(currentLocale, 'call_for_proposals.special_interest_title')}</h3>
            <p className="text-slate-600">{getTranslation(currentLocale, 'call_for_proposals.special_interest_subtitle')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center bg-white rounded-xl p-6 shadow-md">
              <div className="text-3xl mb-3">🤖</div>
              <h4 className="font-bold text-slate-900 mb-2">{getTranslation(currentLocale, 'call_for_proposals.special_interest_ai_title')}</h4>
              <p className="text-sm text-slate-600">{getTranslation(currentLocale, 'call_for_proposals.special_interest_ai_description')}</p>
            </div>
            <div className="text-center bg-white rounded-xl p-6 shadow-md">
              <div className="text-3xl mb-3">🌍</div>
              <h4 className="font-bold text-slate-900 mb-2">{getTranslation(currentLocale, 'call_for_proposals.special_interest_climate_title')}</h4>
              <p className="text-sm text-slate-600">{getTranslation(currentLocale, 'call_for_proposals.special_interest_climate_description')}</p>
            </div>
            <div className="text-center bg-white rounded-xl p-6 shadow-md">
              <div className="text-3xl mb-3">💰</div>
              <h4 className="font-bold text-slate-900 mb-2">{getTranslation(currentLocale, 'call_for_proposals.special_interest_fintech_title')}</h4>
              <p className="text-sm text-slate-600">{getTranslation(currentLocale, 'call_for_proposals.special_interest_fintech_description')}</p>
            </div>
            <div className="text-center bg-white rounded-xl p-6 shadow-md">
              <div className="text-3xl mb-3">🏥</div>
              <h4 className="font-bold text-slate-900 mb-2">{getTranslation(currentLocale, 'call_for_proposals.special_interest_healthtech_title')}</h4>
              <p className="text-sm text-slate-600">{getTranslation(currentLocale, 'call_for_proposals.special_interest_healthtech_description')}</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-16">
          <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">{getTranslation(currentLocale, 'call_for_proposals.faq_title')}</h3>
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="border-l-4 border-blue-500 pl-6">
              <h4 className="font-bold text-slate-900 mb-2">{getTranslation(currentLocale, 'call_for_proposals.faq_multiple_proposals_question')}</h4>
              <p className="text-slate-600">{getTranslation(currentLocale, 'call_for_proposals.faq_multiple_proposals_answer')}</p>
            </div>
            <div className="border-l-4 border-green-500 pl-6">
              <h4 className="font-bold text-slate-900 mb-2">{getTranslation(currentLocale, 'call_for_proposals.faq_travel_support_question')}</h4>
              <p className="text-slate-600">{getTranslation(currentLocale, 'call_for_proposals.faq_travel_support_answer')}</p>
            </div>
            <div className="border-l-4 border-purple-500 pl-6">
              <h4 className="font-bold text-slate-900 mb-2">{getTranslation(currentLocale, 'call_for_proposals.faq_language_question')}</h4>
              <p className="text-slate-600">{getTranslation(currentLocale, 'call_for_proposals.faq_language_answer')}</p>
            </div>
            <div className="border-l-4 border-yellow-500 pl-6">
              <h4 className="font-bold text-slate-900 mb-2">{getTranslation(currentLocale, 'call_for_proposals.faq_remote_question')}</h4>
              <p className="text-slate-600">{getTranslation(currentLocale, 'call_for_proposals.faq_remote_answer')}</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-12 shadow-lg text-white">
          <Lightbulb className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
          <h3 className="text-3xl font-bold mb-4">{getTranslation(currentLocale, 'call_for_proposals.cta_title')}</h3>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            {getTranslation(currentLocale, 'call_for_proposals.cta_subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button onClick={() =>
                window.open(
                  "https://sessionize.com/pycon-senegambia/",
                  "_blank",
                  "noopener,noreferrer"
                )} className="group bg-gradient-to-r from-yellow-500 to-yellow-600 text-slate-900 px-8 py-4 rounded-full font-bold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
              {getTranslation(currentLocale, 'call_for_proposals.cta_submit_button')}
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button className="group bg-transparent border-2 border-slate-400 text-slate-300 px-8 py-4 rounded-full font-semibold hover:bg-slate-700 hover:border-slate-300 transition-all duration-300 flex items-center justify-center">
              {getTranslation(currentLocale, 'call_for_proposals.cta_guidelines_button')}
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default CallForProposals;