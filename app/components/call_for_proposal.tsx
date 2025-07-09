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

const CallForProposals = () => {
  const proposalTypes = [
    {
      icon: Code,
      title: "Technical Talks",
      duration: "25-30 minutes",
      description: "Deep dives into Python libraries, frameworks, best practices, and advanced techniques",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Users,
      title: "Community Talks",
      duration: "20-25 minutes", 
      description: "Building communities, diversity in tech, mentorship, and career development",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Brain,
      title: "Case Studies",
      duration: "25-30 minutes",
      description: "Real-world Python implementations, lessons learned, and problem-solving approaches",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: TrendingUp,
      title: "Industry Insights",
      duration: "20-25 minutes",
      description: "Python in business, startups, scaling applications, and market trends",
      color: "from-yellow-500 to-yellow-600"
    },
    {
      icon: BookOpen,
      title: "Tutorial Sessions",
      duration: "90-120 minutes",
      description: "Hands-on workshops teaching specific skills or technologies step-by-step",
      color: "from-red-500 to-red-600"
    },
    {
      icon: Zap,
      title: "Lightning Talks",
      duration: "5-10 minutes",
      description: "Quick, impactful presentations on innovative ideas or interesting discoveries",
      color: "from-indigo-500 to-indigo-600"
    }
  ];

  const submissionCriteria = [
    {
      category: "Relevance",
      weight: "25%",
      description: "How well does your proposal align with PyCon Senegambia's mission and audience?"
    },
    {
      category: "Originality",
      weight: "25%",
      description: "Is your content fresh, innovative, or presenting a unique perspective?"
    },
    {
      category: "Quality",
      weight: "25%",
      description: "Is your proposal well-structured with clear learning objectives and outcomes?"
    },
    {
      category: "Impact",
      weight: "25%",
      description: "Will your talk inspire, educate, or provide practical value to attendees?"
    }
  ];

  const reviewProcess = [
    {
      step: "1",
      title: "Initial Review",
      description: "Program committee reviews all submissions for completeness and relevance",
      timeline: "1 week after deadline"
    },
    {
      step: "2", 
      title: "Expert Evaluation",
      description: "Subject matter experts evaluate proposals based on technical merit and quality",
      timeline: "2 weeks after deadline"
    },
    {
      step: "3",
      title: "Community Input", 
      description: "Selected proposals are reviewed by community members for feedback",
      timeline: "3 weeks after deadline"
    },
    {
      step: "4",
      title: "Final Selection",
      description: "Program committee makes final decisions and notifies all applicants",
      timeline: "4 weeks after deadline"
    }
  ];

  const proposalTips = [
    {
      icon: Target,
      title: "Be Specific",
      tip: "Clearly define what attendees will learn and take away from your session"
    },
    {
      icon: Users,
      title: "Know Your Audience", 
      tip: "Tailor your content for Python developers with intermediate to advanced skills"
    },
    {
      icon: Star,
      title: "Show Your Expertise",
      tip: "Highlight your experience and qualifications related to the topic"
    },
    {
      icon: Code,
      title: "Include Examples",
      tip: "Provide code samples, demos, or real-world examples in your proposal"
    },
    {
      icon: Clock,
      title: "Mind the Time",
      tip: "Ensure your content fits the allocated time slot with room for Q&A"
    },
    {
      icon: Lightbulb,
      title: "Make it Engaging",
      tip: "Plan interactive elements, live coding, or audience participation"
    }
  ];

  const requiredFields = [
    "Talk title (max 100 characters)",
    "Abstract (max 400 words)",
    "Detailed description (max 1000 words)",
    "Speaker bio and photo",
    "Learning objectives (3-5 bullet points)",
    "Target audience level",
    "Previous speaking experience",
    "Additional resources or materials needed"
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-slate-100 to-slate-200 border border-slate-300 mb-6">
            <FileText className="w-4 h-4 text-slate-600 mr-2" />
            <span className="text-sm font-semibold text-slate-800">Submissions Open</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Call for <span className="bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">Proposals</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Submit your proposal to present at PyCon Senegambia 2025. We welcome diverse perspectives, 
            innovative ideas, and practical insights that will enrich our Python community.
          </p>
        </div>

        {/* Proposal Types */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">Proposal Categories</h3>
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
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Submission Requirements</h3>
            <p className="text-slate-600">Everything you need to include in your proposal</p>
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
            <h3 className="text-2xl font-bold mb-2">How We Evaluate Proposals</h3>
            <p className="text-slate-300">Our review criteria for selecting the best submissions</p>
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
          <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">Review Process</h3>
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
          <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">Tips for a Winning Proposal</h3>
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
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Important Deadlines</h3>
            <p className="text-slate-600">Mark your calendar for these key dates</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="text-center bg-white rounded-xl p-6 shadow-md">
              <div className="text-2xl font-bold text-yellow-600 mb-2">1 Aug- Sep 30</div>
              <div className="text-slate-900 font-semibold mb-1">Conference</div>
              <div className="text-slate-500 text-sm">PyCon Senegambia 2025</div>
            </div>
          </div>
        </div>

        {/* Community Focus */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-center mb-6">
              <Globe className="w-8 h-8 text-blue-600 mr-4" />
              <h3 className="text-xl font-bold text-slate-900">Regional Impact</h3>
            </div>
            <p className="text-slate-600 leading-relaxed mb-4">
              We are particularly interested in proposals that address the unique challenges and opportunities 
              of Python development in West Africa, including local case studies, community building, 
              and solutions for regional tech challenges.
            </p>
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-blue-800 font-medium">
                💡 Bonus consideration for talks that bridge Gambian and Senegalese tech communities
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-center mb-6">
              <MessageSquare className="w-8 h-8 text-green-600 mr-4" />
              <h3 className="text-xl font-bold text-slate-900">First-Time Speakers</h3>
            </div>
            <p className="text-slate-600 leading-relaxed mb-4">
              Never spoken at a conference before? We encourage first-time speakers and provide mentorship 
              support to help you prepare. Our speaker mentors will guide you through the preparation 
              process and help you deliver an impactful presentation.
            </p>
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-sm text-green-800 font-medium">
                🌟 Dedicated first-time speaker track with additional support
              </p>
            </div>
          </div>
        </div>

        {/* Special Categories */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 shadow-lg border border-purple-200 mb-16">
          <div className="text-center mb-8">
            <Star className="w-16 h-16 text-purple-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Special Interest Areas</h3>
            <p className="text-slate-600">We are especially looking for proposals in these emerging areas</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center bg-white rounded-xl p-6 shadow-md">
              <div className="text-3xl mb-3">🤖</div>
              <h4 className="font-bold text-slate-900 mb-2">AI & Machine Learning</h4>
              <p className="text-sm text-slate-600">LLMs, computer vision, NLP applications</p>
            </div>
            <div className="text-center bg-white rounded-xl p-6 shadow-md">
              <div className="text-3xl mb-3">🌍</div>
              <h4 className="font-bold text-slate-900 mb-2">Climate Tech</h4>
              <p className="text-sm text-slate-600">Environmental monitoring, sustainability</p>
            </div>
            <div className="text-center bg-white rounded-xl p-6 shadow-md">
              <div className="text-3xl mb-3">💰</div>
              <h4 className="font-bold text-slate-900 mb-2">FinTech Solutions</h4>
              <p className="text-sm text-slate-600">Mobile payments, blockchain, financial inclusion</p>
            </div>
            <div className="text-center bg-white rounded-xl p-6 shadow-md">
              <div className="text-3xl mb-3">🏥</div>
              <h4 className="font-bold text-slate-900 mb-2">HealthTech</h4>
              <p className="text-sm text-slate-600">Digital health, telemedicine, health data</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-16">
          <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h3>
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="border-l-4 border-blue-500 pl-6">
              <h4 className="font-bold text-slate-900 mb-2">Can I submit multiple proposals?</h4>
              <p className="text-slate-600">Yes, you can submit up to 3 proposals, but please ensure each one is high-quality and unique.</p>
            </div>
            <div className="border-l-4 border-green-500 pl-6">
              <h4 className="font-bold text-slate-900 mb-2">Do you provide travel support?</h4>
              <p className="text-slate-600">Yes, selected speakers from outside Banjul will receive travel stipend and accommodation support.</p>
            </div>
            <div className="border-l-4 border-purple-500 pl-6">
              <h4 className="font-bold text-slate-900 mb-2">What language should I present in?</h4>
              <p className="text-slate-600">All presentations should be in English, but we welcome speakers who want to include local language elements.</p>
            </div>
            <div className="border-l-4 border-yellow-500 pl-6">
              <h4 className="font-bold text-slate-900 mb-2">Can I present remotely?</h4>
              <p className="text-slate-600">We prefer in-person presentations, but exceptional remote presentations will be considered on a case-by-case basis.</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-12 shadow-lg text-white">
          <Lightbulb className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
          <h3 className="text-3xl font-bold mb-4">Ready to Share Your Ideas?</h3>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Submit your proposal today and be part of the inaugural PyCon Senegambia. 
            Help us build a stronger Python community across West Africa.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button className="group bg-gradient-to-r from-yellow-500 to-yellow-600 text-slate-900 px-8 py-4 rounded-full font-bold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
              Submit Your Proposal
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button className="group bg-transparent border-2 border-slate-400 text-slate-300 px-8 py-4 rounded-full font-semibold hover:bg-slate-700 hover:border-slate-300 transition-all duration-300 flex items-center justify-center">
              Download Guidelines
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
         
        </div>
      </div>
    </section>
  );
};

export default CallForProposals;