"use client";

import {
  Users,
  Target,
  Heart,
  Globe,
  Code,
  Award,
  MapPin,
  Linkedin,
  UsersIcon
} from "lucide-react";
import Image from "next/image";
import { HeroProps } from "./interfaces/interface";
import { getTranslation } from "@/lib/i18n";

const About = ({ currentLocale }: HeroProps) => {
  const teamMembers = [
   
    {
      name: "Sheriff Ahmed Fadil Sonko",
      role: "Confrence Chair",
      location: getTranslation(currentLocale, "about.gambia"),
      image: "/images/bio/sonko.jpg",
      bio: getTranslation(currentLocale, "about.sonko"),
      linkedin: "sheriff-ahmed-fadil-sonko-541a7a218"
    },
    {
      name: "Sheriff Gaye",
      role: "Technical Lead",
      location: getTranslation(currentLocale, "about.gambia"),
      image: "/images/bio/sheriff.jpeg",
      bio: getTranslation(currentLocale, "about.sheriff"),
      linkedin: "sheriff-gaye-283772211"
    },
    {
      name: "Aji Fama Jobe",
      role: "Program Chair",
      location: getTranslation(currentLocale, "about.gambia"),
      image: "/images/bio/ajifama.jpg",
      bio: getTranslation(currentLocale, "about.ajifama"),
      linkedin: "ajifamajobe"
    },
   
    {
      name: "Therese Keita",
      role: "Logistics chair, Conference co chair",
      location: getTranslation(currentLocale, "about.gambia"),
      image: "/images/bio/keita.jpg",
      bio: getTranslation(currentLocale, "about.keita"),
      linkedin: "therese-k-keita-4b1799142"
    },
    {
      name: "Seray Sidibeh",
      role: "Volunteer Lead",
      location: getTranslation(currentLocale, "about.gambia"),
      image: "/images/bio/seray.jpg",
      bio: getTranslation(currentLocale, "about.seray"),
      linkedin: ""
    },
    {
      name: "Fatou Ndow",
      role: "Social Media & Content Lead",
      location: getTranslation(currentLocale, "about.gambia"),
      image: "/images/bio/fatou.png",
      bio: getTranslation(currentLocale, "about.fatou"),
      linkedin: "fatou-ndow-8841b1242"
    },
    {
      name: "Emmanuel Nsikak",
      role: "Graphic Designer",
      location: getTranslation(currentLocale, "about.gambia"),
      image: "/images/bio/digital_pencil.jpg",
      bio: getTranslation(currentLocale, "about.emma"),
      linkedin: ""
    },

    {
      name: "Abdul Muizz Ikumapayi",
      role: "Speakers & talk Lead",
      location: getTranslation(currentLocale, "about.gambia"),
      image: "/images/bio/abdul.png",
      bio: getTranslation(currentLocale, "about.muizz"),
      linkedin: "abdul-muizz-ikumapayi"
    },

    {
      name: "Thiaba Diop",
      role: "Talk & Speakers Co Lead",
      location: getTranslation(currentLocale, "about.senegal"),
      image: "/images/bio/diop.jpg",
      bio: getTranslation(currentLocale, "about.diop"),
      linkedin: "thiaba-diop"
    }
  ];

  const stats = [
    {
      number: "2",
      label: getTranslation(currentLocale, "about.countries"),
      icon: Globe
    },
    {
      number: "500+",
      label: getTranslation(currentLocale, "about.expected_attendees"),
      icon: Users
    },
    {
      number: "20+",
      label: getTranslation(currentLocale, "about.expert_speakers"),
      icon: Award
    },
    {
      number: "1",
      label: getTranslation(currentLocale, "about.historic_confrence"),
      icon: Target
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-yellow-100 to-yellow-200 border border-yellow-300 mb-6">
            <UsersIcon className="w-4 h-4 text-yellow-600 mr-2" />
            <span className="text-sm font-semibold text-yellow-800">
              {" "}
              {getTranslation(currentLocale, "about.about_us")}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {getTranslation(currentLocale, "about.about")}{" "}
            <span className="bg-gradient-to-r from-blue-600 to-yellow-600 bg-clip-text text-transparent">
              {getTranslation(currentLocale, "about.pycon_senegambia")}
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {getTranslation(currentLocale, "about.about_text")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-full p-3 mr-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                {" "}
                {getTranslation(currentLocale, "about.our_mission")}
              </h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              {getTranslation(currentLocale, "about.mission_text")}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full p-3 mr-4">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                {" "}
                {getTranslation(currentLocale, "about.our_vision")}
              </h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              {getTranslation(currentLocale, "about.vision_text")}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 text-sm uppercase tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 mb-20 text-white">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-4">
              {getTranslation(currentLocale, "about.why_pycon_senegambia")}
            </h3>
            <p className="text-blue-100">
              {getTranslation(currentLocale, "about.why_text")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Code className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
              <h4 className="text-xl font-semibold mb-2">
                {getTranslation(currentLocale, "about.techincal_experience")}
              </h4>
              <p className="text-blue-100">
                {getTranslation(currentLocale, "about.techincal_text")}
              </p>
            </div>
            <div className="text-center">
              <Users className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
              <h4 className="text-xl font-semibold mb-2">
                {getTranslation(currentLocale, "about.community_building")}
              </h4>
              <p className="text-blue-100">
                {getTranslation(currentLocale, "about.community_text")}
              </p>
            </div>
            <div className="text-center">
              <Globe className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
              <h4 className="text-xl font-semibold mb-2">
                {getTranslation(currentLocale, "about.impact")}
              </h4>
              <p className="text-blue-100">
                {getTranslation(currentLocale, "about.impact_text")}
              </p>
            </div>
          </div>
        </div>

        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              {getTranslation(currentLocale, "about.meet_our_team")}
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {getTranslation(currentLocale, "about.team_text")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="text-center mb-4">
                  <Image
                    width={70}
                    height={70}
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-blue-100 group-hover:border-blue-300 transition-colors"
                  />
                  <h4 className="text-xl font-bold text-gray-900 mb-1">
                    {member.name}
                  </h4>
                  <p className="text-blue-600 font-semibold mb-2">
                    {member.role}
                  </p>
                  <div className="flex items-center justify-center text-gray-500 text-sm mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    {member.location}
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {member.bio}
                </p>

                <div className="flex justify-center space-x-3">
                  {member.linkedin && (
                    <a
                      href={`https://linkedin.com/in/${member.linkedin}`}
                      className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            {getTranslation(currentLocale, "about.join_team")}
          </h3>
          <p className="text-gray-600 mb-6">
            {getTranslation(currentLocale, "about.join_team_text")}
          </p>
          <button
            onClick={() =>
              window.open(
                "https://docs.google.com/forms/d/e/1FAIpQLSeIOD8hC_MxuAyHPcpry7lQwemPypDQVZn2sJ-90yqYo8LtEA/viewform",
                "_blank",
                "noopener,noreferrer"
              )
            }
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            {getTranslation(currentLocale, "about.join_btn")}
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;
