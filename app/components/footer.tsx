import {
  Mail,
  Phone,
  MapPin,
  Twitter,
  Linkedin,
  Instagram,
  ArrowRight,
  Heart,
  Globe
} from "lucide-react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Stay Updated with PyCon Senegambia
            </h3>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Get the latest news, speaker announcements, and early bird offers
              delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none  bg-white"
              />
              <button className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-yellow-300 transition-colors flex items-center justify-center">
                Subscribe
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand section */}
            <div className="lg:col-span-1">
              <div className="flex items-center mb-6">
                <Image
                  src="/images/logo2.png"
                  alt="logo"
                  height={50}
                  width={200}
                />
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Building the Python community across Gambia and Senegal through
                collaboration, education, and innovation.
              </p>

              {/* Social links */}
              <div className="flex space-x-4">
                <a
                  href="https://x.com/PyconSenegambia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              
                <a
                  href="https://www.linkedin.com/in/pycon-senegambia-218781373/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="https://www.instagram.com/pyconsenegambia/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* https://sessionize.com/pycon-senegambia/ */}

            {/* Quick links */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#about"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#speakers"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Speakers
                  </a>
                </li>
                <li>
                  <a
                    href="#schedule"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Schedule
                  </a>
                </li>
                <li>
                  <a
                    href="#sponsors"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Sponsors
                  </a>
                </li>
                <li>
                  <a
                    href="#cfp"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Call for Papers
                  </a>
                </li>
                <li>
                  <a
                    href="#cfs"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Call for Sponsors
                  </a>
                </li>
              </ul>
            </div>

            {/* Community */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Community</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Code of Conduct
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Diversity & Inclusion
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Volunteer
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Python User Groups
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Mentorship Program
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Job Board
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact info */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Mail className="w-5 h-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-gray-400">
                      info@pyconsenegambia.org
                    </div>
                    <div className="text-gray-400">
                      speakers@pyconsenegambia.org
                    </div>
                  </div>
                </li>
                <li className="flex items-start">
                  <Phone className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-gray-400">+220 XXX XXXX</div>
                    <div className="text-gray-400">+221 XX XXX XXXX</div>
                  </div>
                </li>
                <li className="flex items-start">
                  <MapPin className="w-5 h-5 text-red-400 mr-3 mt-0.5 flex-shrink-0" />
                  <div className="text-gray-400">
                    Senegambia Region
                    <br />
                    Gambia & Senegal
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center text-gray-400 text-sm">
              <span>© 2025 PyCon Senegambia. Made with</span>
              <Heart className="w-4 h-4 text-red-500 mx-1 fill-current" />
              <span>for the Python community</span>
            </div>

            <div className="flex items-center space-x-6 text-sm">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Cookie Policy
              </a>
            </div>

            <div className="flex items-center text-gray-400 text-sm">
              <Globe className="w-4 h-4 mr-2" />
              <span>🇬🇲 Gambia • 🇸🇳 Senegal</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;