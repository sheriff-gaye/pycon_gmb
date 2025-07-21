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
  
  const CodeOfConduct = () => {
    const coreValues = [
      {
        icon: Heart,
        title: "Respect & Inclusion",
        description: "Treating everyone with dignity regardless of background, identity, or experience level"
      },
      {
        icon: Users,
        title: "Community First",
        description: "Fostering collaboration and support among all Python enthusiasts in West Africa"
      },
      {
        icon: HandHeart,
        title: "Safe Environment",
        description: "Creating a harassment-free space where everyone can learn and grow together"
      },
      {
        icon: Globe,
        title: "Cultural Sensitivity",
        description: "Embracing the diverse cultures and perspectives of the Senegambia region"
      }
    ];
  
    const inappropriateBehaviors = [
      {
        title: "Harassment",
        description: "Unwanted comments or actions related to personal characteristics such as gender, race, sexual orientation, disability, body size, or religion"
      },
      {
        title: "Intimidation & Stalking",
        description: "Any deliberate actions that make others feel threatened, harassed, or unsafe"
      },
      {
        title: "Unwanted Recording",
        description: "Taking photos, videos or recording someone after they have asked you not to do so"
      },
      {
        title: "Unwelcome Contact",
        description: "Any form of non-consensual physical interaction or inappropriate advances"
      },
      {
        title: "Privacy Violations",
        description: "Sharing someone's personal information without explicit permission"
      },
      {
        title: "Disruptive Behavior",
        description: "Sustained interruptions or inappropriate outbursts during talks and sessions"
      }
    ];
  
    const encouragedBehaviors = [
      "Be respectful, inclusive, and considerate in all interactions",
      "Support fellow attendees in their learning and participation",
      "Listen actively and engage thoughtfully with others' ideas",
      "Contribute to a collaborative, safe, and welcoming environment",
      "Celebrate the diversity of our West African Python community",
      "Help create lasting connections across the Senegambia region"
    ];
  
   
  
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-green-100 to-blue-200 border border-green-300 mb-6">
              <Shield className="w-4 h-4 text-green-600 mr-2" />
              <span className="text-sm font-semibold text-green-800">Community Guidelines</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Code of <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Conduct</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              PyCon Senegambia is dedicated to providing a harassment-free conference experience for everyone. 
              We aim to create a welcoming environment where the Python community can thrive across West Africa.
            </p>
          </div>
  
          {/* Core Values */}
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
  
          {/* Short Version */}
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 mb-16 text-white">
            <div className="text-center mb-8">
              <CheckCircle className="w-16 h-16 text-yellow-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">In Short</h3>
              <p className="text-green-100">Our commitment to the community</p>
            </div>
            
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/10 rounded-xl p-6">
                <h4 className="font-semibold mb-3 text-yellow-300">Our Promise</h4>
                <p className="text-green-100 text-sm">
                  PyCon Senegambia is dedicated to providing a harassment-free conference experience for 
                  everyone, regardless of gender, sexual orientation, disability, physical appearance, body size, race, or religion.
                </p>
              </div>
              <div className="bg-white/10 rounded-xl p-6">
                <h4 className="font-semibold mb-3 text-yellow-300">Zero Tolerance</h4>
                <p className="text-green-100 text-sm">
                  We do not tolerate harassment of conference participants in any form. Violators may be 
                  sanctioned or expelled from the conference without a refund.
                </p>
              </div>
            </div>
          </div>
  
          {/* Encouraged Behaviors */}
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-16">
            <div className="text-center mb-8">
              <HandHeart className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900">Encouraged Behaviors</h3>
              <p className="text-gray-600">Help us build an amazing community experience</p>
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
  
          {/* Inappropriate Behaviors */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <AlertTriangle className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900">Inappropriate Behaviors</h3>
              <p className="text-gray-600">The following behaviors will not be tolerated</p>
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
  
          {/* Reporting Section */}
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-16">
            <div className="text-center mb-8">
              <MessageSquare className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900">How to Report Violations</h3>
              <p className="text-gray-600">We handle all reports confidentially and act promptly</p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="bg-blue-50 rounded-xl p-6 mb-8">
                <div className="flex items-center mb-4">
                  <Mail className="w-6 h-6 text-blue-600 mr-3" />
                  <h4 className="text-lg font-semibold text-gray-900">Primary Contact</h4>
                </div>
                <p className="text-gray-700 mb-2">
                  Send detailed reports to: <strong>coc@pyconsenegambia.org</strong>
                </p>
                <p className="text-sm text-gray-600">
                  We aim to respond within 24 hours during conference period, and within one week otherwise.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <Eye className="w-8 h-8 text-gray-600 mb-4" />
                  <h4 className="font-semibold text-gray-900 mb-2">What to Include</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Description of the incident</li>
                    <li>• Time and location</li>
                    <li>• People involved</li>
                    <li>• Any witnesses</li>
                    <li>• Your contact information</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6">
                  <UserCheck className="w-8 h-8 text-gray-600 mb-4" />
                  <h4 className="font-semibold text-gray-900 mb-2">During the Event</h4>
                  <p className="text-sm text-gray-600">
                    Approach any staff member (identifiable by their organizer badges) or Code of Conduct 
                    committee members directly. Dont hesitate to ask for help.
                  </p>
                </div>
              </div>
            </div>
          </div>
  
          {/* Enforcement & Consequences */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <Scale className="w-8 h-8 text-orange-600 mr-4" />
                <h3 className="text-xl font-bold text-gray-900">Enforcement Process</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Acknowledgment</h4>
                    <p className="text-sm text-gray-600">We confirm receipt of your report promptly</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Investigation</h4>
                    <p className="text-sm text-gray-600">Committee reviews and gathers information</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Action & Follow-up</h4>
                    <p className="text-sm text-gray-600">Appropriate measures taken with ongoing communication</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <AlertTriangle className="w-8 h-8 text-red-600 mr-4" />
                <h3 className="text-xl font-bold text-gray-900">Possible Consequences</h3>
              </div>
              <div className="space-y-4">
                <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-400">
                  <h4 className="font-semibold text-gray-900">Warning</h4>
                  <p className="text-sm text-gray-600">Official verbal or written warning</p>
                </div>
                <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-400">
                  <h4 className="font-semibold text-gray-900">Expulsion</h4>
                  <p className="text-sm text-gray-600">Removal from event without refund</p>
                </div>
                <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-400">
                  <h4 className="font-semibold text-gray-900">Legal Action</h4>
                  <p className="text-sm text-gray-600">Referral to authorities for illegal behavior</p>
                </div>
              </div>
            </div>
          </div>
  
          {/* Scope */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 text-white mb-16">
            <div className="text-center mb-8">
              <Globe className="w-16 h-16 text-blue-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Scope of Application</h3>
              <p className="text-gray-300">This Code of Conduct applies to all PyCon Senegambia spaces and activities</p>
            </div>
            
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 rounded-xl p-6 text-center">
                <h4 className="font-semibold mb-3 text-blue-400">In-Person Spaces</h4>
                <p className="text-gray-300 text-sm">Conference talks, workshops, networking areas, and social events</p>
              </div>
              <div className="bg-white/10 rounded-xl p-6 text-center">
                <h4 className="font-semibold mb-3 text-blue-400">Online Spaces</h4>
                <p className="text-gray-300 text-sm">Social media channels, event hashtags, and virtual spaces</p>
              </div>
              <div className="bg-white/10 rounded-xl p-6 text-center">
                <h4 className="font-semibold mb-3 text-blue-400">Off-Site Activities</h4>
                <p className="text-gray-300 text-sm">Social gatherings, dinners, and unofficial meetups</p>
              </div>
            </div>
          </div>
  
          {/* Closing Message */}
          <div className="text-center bg-gradient-to-br from-green-50 to-blue-100 rounded-2xl p-12 shadow-lg border border-green-200">
            <Heart className="w-16 h-16 text-green-600 mx-auto mb-6" />
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Building Community Together</h3>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              By attending PyCon Senegambia, you agree to uphold these standards and help create an 
              inclusive, respectful environment for our entire West African Python community.
            </p>
            
            <div className="bg-white/80 rounded-xl p-6 inline-block">
              <p className="text-sm text-gray-700 mb-2">
                <strong>Questions or feedback about our Code of Conduct?</strong>
              </p>
              <p className="text-sm text-gray-600">
                Contact us at <a href="mailto:info@pyconsenegambia.org" className="text-blue-600 hover:underline font-medium">info@pyconsenegambia.org</a>
              </p>
            </div>
            
            <div className="mt-8 text-xs text-gray-500">
              <p>
                This Code of Conduct is licensed under the Creative Commons Attribution 3.0 Unported License.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default CodeOfConduct;