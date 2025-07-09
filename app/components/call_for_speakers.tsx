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

const CallForSpeakers = () => {
  const speakerBenefits = [
    {
      icon: Globe,
      title: "Global Exposure",
      description: "Share your expertise with 500+ developers from across West Africa"
    },
    {
      icon: Users,
      title: "Community Impact",
      description: "Inspire the next generation of Python developers in the region"
    },
    {
      icon: Award,
      title: "Recognition",
      description: "Build your reputation as a thought leader in the Python community"
    },
    {
      icon: Gift,
      title: "Speaker Package",
      description: "Travel stipend, accommodation, and exclusive speaker dinner"
    }
  ];

  const trackTopics = [
    {
      category: "Core Python",
      topics: ["Python 3.12+ Features", "Performance Optimization", "Async Programming", "Best Practices"]
    },
    {
      category: "Web Development",
      topics: ["Django & FastAPI", "Flask Applications", "API Design", "Microservices"]
    },
    {
      category: "Data Science",
      topics: ["Machine Learning", "Data Analysis", "Pandas & NumPy", "Visualization"]
    },
    {
      category: "DevOps & Cloud",
      topics: ["Docker & Kubernetes", "CI/CD Pipelines", "Cloud Deployment", "Infrastructure as Code"]
    },
    {
      category: "Community & Career",
      topics: ["Open Source Contribution", "Tech Leadership", "Career Growth", "Diversity in Tech"]
    },
    {
      category: "Emerging Tech",
      topics: ["AI & LLMs", "Blockchain", "IoT with Python", "Cybersecurity"]
    }
  ];

  const timeline = [
    { date: "Aug 01, 2025", event: "Call for Speakers Opens", status: "current" },
    { date: "September 30, 2025", event: "Submission Deadline", status: "upcoming" },
    { date: "October 10, 2025", event: "Speaker Notifications", status: "upcoming" },
    { date: "November 27, 2025", event: "PyCon Senegambia", status: "upcoming" }
  ];

  const requirements = [
    "Original content not presented elsewhere",
    "Engaging and practical for Python developers",
    "Clear learning objectives and takeaways",
    "Interactive elements or live coding preferred",
    "Suitable for intermediate to advanced level"
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-200 border border-blue-300 mb-6">
            <Mic className="w-4 h-4 text-blue-600 mr-2" />
            <span className="text-sm font-semibold text-blue-800">Now Accepting Applications</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Call for <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Speakers</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Share your Python expertise at the inaugural PyCon Senegambia. We are looking for passionate speakers 
            to inspire, educate, and connect with developers across West Africa.
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
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Talk Formats We are Looking For</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
              <Clock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h4 className="text-xl font-bold text-gray-900 mb-2">Lightning Talks</h4>
              <p className="text-gray-600 mb-3">5-10 minutes</p>
              <p className="text-sm text-gray-500">Quick, impactful presentations on focused topics</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
              <Mic className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h4 className="text-xl font-bold text-gray-900 mb-2">Standard Talks</h4>
              <p className="text-gray-600 mb-3">25-30 minutes</p>
              <p className="text-sm text-gray-500">In-depth presentations with Q&A session</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl">
              <Users className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
              <h4 className="text-xl font-bold text-gray-900 mb-2">Workshops</h4>
              <p className="text-gray-600 mb-3">90-120 minutes</p>
              <p className="text-sm text-gray-500">Hands-on, interactive learning experiences</p>
            </div>
          </div>
        </div>

        {/* Track Topics */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Track Topics</h3>
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
            <h3 className="text-2xl font-bold mb-2">Speaker Requirements</h3>
            <p className="text-blue-100">What we are looking for in proposals</p>
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
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Important Dates</h3>
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
              <h3 className="text-xl font-bold text-gray-900">Event Location</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Banjul, The Gambia - The perfect bridge between Gambia and Senegal, bringing together 
              developers from across the Senegambia region.
            </p>
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-blue-800 font-medium">
                🏨 Accommodation and travel support available for selected speakers
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-center mb-6">
              <Calendar className="w-8 h-8 text-purple-600 mr-4" />
              <h3 className="text-xl font-bold text-gray-900">Conference Dates</h3>
            </div>
            <p className="text-gray-600 mb-4">
              November 26-27, 2025 - Three days of inspiring talks, workshops, networking, 
              and community building in beautiful Banjul.
            </p>
            <div className="bg-purple-50 rounded-lg p-4">
              <p className="text-sm text-purple-800 font-medium">
                🎤 Speaker dinner and exclusive networking events included
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-12 shadow-lg border border-yellow-200">
          <Star className="w-16 h-16 text-yellow-600 mx-auto mb-6" />
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Ready to Inspire?</h3>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Submit your speaker proposal and help make PyCon Senegambia an unforgettable experience 
            for the Python community in West Africa.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
              Submit Your Proposal
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button className="group bg-transparent border-2 border-gray-800 text-gray-800 px-8 py-4 rounded-full font-semibold hover:bg-gray-800 hover:text-white transition-all duration-300 flex items-center justify-center">
              Speaker Guidelines
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
         
        </div>
      </div>
    </section>
  );
};

export default CallForSpeakers;