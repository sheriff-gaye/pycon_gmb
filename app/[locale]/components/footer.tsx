"use client";

import { Mail, Phone, MapPin, Twitter, Linkedin, Instagram, ArrowRight, Heart, Globe } from "lucide-react";
import Image from "next/image";
import { getTranslation } from "@/lib/i18n";
import { HeroProps } from "./interfaces/interface";

const Footer = ({currentLocale}:HeroProps) => {

  return (
    <footer className="bg-gray-900 text-white">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              {getTranslation(currentLocale, "footer.subscribe_title")}
            </h3>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              {getTranslation(currentLocale, "footer.subscribe_subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder={getTranslation(currentLocale, "footer.subscribe_placeholder")}
                className="flex-1 px-6 py-3 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none bg-white"
              />
              <button className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-xl font-semibold hover:bg-yellow-300 transition-colors flex items-center justify-center">
                {getTranslation(currentLocale, "footer.subscribe_button")}
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
                <Image src="/images/logo.png" alt="logo" height={50} width={200} />
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                {getTranslation(currentLocale, "footer.brand_description")}
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

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6">
                {getTranslation(currentLocale, "footer.quick_links_title")}
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href={`/${currentLocale}/about`}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {getTranslation(currentLocale, "footer.quick_links.about")}
                  </a>
                </li>
                <li>
                  <a
                    href={`/${currentLocale}/speakers`}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {getTranslation(currentLocale, "footer.quick_links.speakers")}
                  </a>
                </li>
                <li>
                  <a
                    href={`/${currentLocale}/#schedule`}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {getTranslation(currentLocale, "footer.quick_links.schedule")}
                  </a>
                </li>
                <li>
                  <a
                    href={`/${currentLocale}/#sponsors`}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {getTranslation(currentLocale, "footer.quick_links.sponsors")}
                  </a>
                </li>
                <li>
                  <a
                    href={`/${currentLocale}/proposal`}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {getTranslation(currentLocale, "footer.quick_links.proposal")}
                  </a>
                </li>
                <li>
                  <a
                    href={`/${currentLocale}/#cfs`}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {getTranslation(currentLocale, "footer.quick_links.cfs")}
                  </a>
                </li>
              </ul>
            </div>

            {/* Community */}
            <div>
              <h4 className="text-lg font-semibold mb-6">
                {getTranslation(currentLocale, "footer.community_title")}
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href={`/${currentLocale}/conduct`}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {getTranslation(currentLocale, "footer.community.code_of_conduct")}
                  </a>
                </li>
                <li>
                  <a
                    href={`/${currentLocale}/#diversity`}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {getTranslation(currentLocale, "footer.community.diversity")}
                  </a>
                </li>
                <li>
                  <a
                    href={`/${currentLocale}/volunteers`}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {getTranslation(currentLocale, "footer.community.volunteer")}
                  </a>
                </li>
                <li>
                  <a
                    href={`/${currentLocale}/#user-groups`}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {getTranslation(currentLocale, "footer.community.user_groups")}
                  </a>
                </li>
                <li>
                  <a
                    href={`/${currentLocale}/#mentorship`}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {getTranslation(currentLocale, "footer.community.mentorship")}
                  </a>
                </li>
                <li>
                  <a
                    href={`/${currentLocale}/#job-board`}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {getTranslation(currentLocale, "footer.community.job_board")}
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact info */}
            <div>
              <h4 className="text-lg font-semibold mb-6">
                {getTranslation(currentLocale, "footer.contact_title")}
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Mail className="w-5 h-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-gray-400">
                      {getTranslation(currentLocale, "footer.contact_email")}
                    </div>
                  </div>
                </li>
                <li className="flex items-start">
                  <Phone className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-gray-400">{getTranslation(currentLocale, "footer.contact_phone1")}</div>
                    <div className="text-gray-400">{getTranslation(currentLocale, "footer.contact_phone2")}</div>
                  </div>
                </li>
                <li className="flex items-start">
                  <MapPin className="w-5 h-5 text-red-400 mr-3 mt-0.5 flex-shrink-0" />
                  <div className="text-gray-400 whitespace-pre-line">
                    {getTranslation(currentLocale, "footer.contact_location")}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center text-gray-400 text-sm">
              <span>{getTranslation(currentLocale, "footer.copyright").replace("love", "")}</span>
              <Heart className="w-4 h-4 text-red-500 mx-1 fill-current" />
              <span>{getTranslation(currentLocale, "footer.copyright").split("love")[1]}</span>
            </div>

            <div className="flex items-center space-x-6 text-sm">
              <a
                href={`/${currentLocale}/#privacy`}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {getTranslation(currentLocale, "footer.privacy")}
              </a>
              <a
                href={`/${currentLocale}/#terms`}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {getTranslation(currentLocale, "footer.terms")}
              </a>
              <a
                href={`/${currentLocale}/#cookie`}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {getTranslation(currentLocale, "footer.cookie")}
              </a>
            </div>

            <div className="flex items-center text-gray-400 text-sm">
              <Globe className="w-4 h-4 mr-2" />
              <span>{getTranslation(currentLocale, "footer.location")}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;