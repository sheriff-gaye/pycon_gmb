"use client"

import { 
  Users, 
  Target, 
  Heart, 
  Globe, 
  Code, 
  Award,
  MapPin,
  Linkedin,
  Twitter,
  Github,
  Mail,
  UsersIcon
} from 'lucide-react';
import Image from 'next/image';

const About = () => {
  const teamMembers = [
    {
      name: "Fatou Diallo",
      role: "Conference Chair",
      location: "Dakar, Senegal",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
      bio: "Senior Python Developer with 8+ years experience. Passionate about building tech communities in West Africa.",
      twitter: "@fatoudiallo",
      linkedin: "fatou-diallo",
      github: "fatoudiallo"
    },
    {
      name: "Mamadou Sall",
      role: "Technical Lead",
      location: "Banjul, Gambia",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      bio: "Full-stack developer and Python enthusiast. Leading the tech committee for speaker selection and workshops.",
      twitter: "@mamadousall",
      linkedin: "mamadou-sall",
      github: "mamadousall"
    },
    {
      name: "Aminata Ba",
      role: "Community Manager",
      location: "Thiès, Senegal",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face",
      bio: "Community builder and event organizer. Connecting Python developers across the Senegambia region.",
      twitter: "@aminataba",
      linkedin: "aminata-ba",
      email: "aminata@pyconsenegambia.org"
    },
    {
      name: "Omar Ceesay",
      role: "Logistics Coordinator",
      location: "Serekunda, Gambia",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      bio: "Operations specialist ensuring smooth conference execution. Expert in event planning and vendor management.",
      twitter: "@omarceesay",
      linkedin: "omar-ceesay",
      github: "omarceesay"
    },
    {
      name: "Aïcha Ndoye",
      role: "Sponsorship Director",
      location: "Saint-Louis, Senegal",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face",
      bio: "Business development professional building partnerships with organizations supporting Python education.",
      twitter: "@aichaNdoye",
      linkedin: "aicha-ndoye",
      email: "partnerships@pyconsenegambia.org"
    },
    {
      name: "Lamin Jallow",
      role: "Marketing Lead",
      location: "Brikama, Gambia",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face",
      bio: "Digital marketing strategist spreading the word about PyCon Senegambia across social media and tech communities.",
      twitter: "@laminjallow",
      linkedin: "lamin-jallow",
      github: "laminjallow"
    }
  ];

  const stats = [
    { number: "2", label: "Countries United", icon: Globe },
    { number: "500+", label: "Expected Attendees", icon: Users },  
    { number: "20+", label: "Expert Speakers", icon: Award },
    { number: "1", label: "Historic Conference", icon: Target }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    
        <div className="text-center mb-16">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-yellow-100 to-yellow-200 border border-yellow-300 mb-6">
            <UsersIcon className="w-4 h-4 text-yellow-600 mr-2" />
            <span className="text-sm font-semibold text-yellow-800">About Us</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About <span className="bg-gradient-to-r from-blue-600 to-yellow-600 bg-clip-text text-transparent">PyCon Senegambia</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            The first-ever Python conference bringing together developers, data scientists, and tech enthusiasts 
            from Gambia and Senegal to learn, share, and build the future of technology in West Africa.
          </p>
        </div>

        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-full p-3 mr-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              To foster a vibrant Python community across the Senegambia region by providing a platform for 
              knowledge sharing, networking, and collaboration. We aim to bridge the gap between Gambian and 
              Senegalese developers while promoting diversity and inclusion in tech.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full p-3 mr-4">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              To establish PyCon Senegambia as the premier technology conference in West Africa, inspiring 
              the next generation of Python developers and creating lasting partnerships that drive 
              innovation and economic growth in the region.
            </p>
          </div>
        </div>

       
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
              <div className="text-gray-600 text-sm uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>

       
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 mb-20 text-white">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-4">Why PyCon Senegambia?</h3>
            <p className="text-blue-100">Discover what makes our conference unique</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Code className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
              <h4 className="text-xl font-semibold mb-2">Technical Excellence</h4>
              <p className="text-blue-100">World-class speakers sharing cutting-edge Python techniques and best practices</p>
            </div>
            <div className="text-center">
              <Users className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
              <h4 className="text-xl font-semibold mb-2">Community Building</h4>
              <p className="text-blue-100">Connecting developers across borders to build lasting professional relationships</p>
            </div>
            <div className="text-center">
              <Globe className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
              <h4 className="text-xl font-semibold mb-2">Regional Impact</h4>
              <p className="text-blue-100">Driving technological advancement and economic growth in West Africa</p>
            </div>
          </div>
        </div>

        
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Passionate individuals from across the Senegambia region working together to make 
              PyCon Senegambia an unforgettable experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="text-center mb-4">
                  <Image
                  width={24}
                  height={24}
                    src={member.image} 
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-blue-100 group-hover:border-blue-300 transition-colors"
                  />
                  <h4 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h4>
                  <p className="text-blue-600 font-semibold mb-2">{member.role}</p>
                  <div className="flex items-center justify-center text-gray-500 text-sm mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    {member.location}
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{member.bio}</p>
                
                <div className="flex justify-center space-x-3">
                  {member.twitter && (
                    <a href={`https://twitter.com/${member.twitter.replace('@', '')}`} 
                       className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors">
                      <Twitter className="w-4 h-4" />
                    </a>
                  )}
                  {member.linkedin && (
                    <a href={`https://linkedin.com/in/${member.linkedin}`}
                       className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors">
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {member.github && (
                    <a href={`https://github.com/${member.github}`}
                       className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-800 hover:text-white transition-colors">
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {member.email && (
                    <a href={`mailto:${member.email}`}
                       className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-green-500 hover:text-white transition-colors">
                      <Mail className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Want to Join Our Team?</h3>
          <p className="text-gray-600 mb-6">
            We are always looking for passionate volunteers to help make PyCon Senegambia even better.
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            Become a Volunteer
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;