"use client";

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
import { useState } from "react";
import { getTranslation } from "@/lib/i18n";
import { HeroProps } from "./interfaces/interface";

const Footer = ({ currentLocale }: HeroProps) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setMessage("Please enter your email address");
      setMessageType("error");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Successfully subscribed to newsletter!");
        setMessageType("success");
        setEmail("");
      } else {
        setMessage(data.error || "Failed to subscribe");
        setMessageType("error");
      }
    } catch (error) {
      setMessage(`Something went wrong. Please try again. ${error}`);
      setMessageType("error");
    }

    setIsSubmitting(false);

    // Clear message after 5 seconds
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 5000);
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="bg-linear-to-r from-blue-600 to-purple-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              {getTranslation(currentLocale, "footer.subscribe_title")}
            </h3>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              {getTranslation(currentLocale, "footer.subscribe_subtitle")}
            </p>

            <form
              onSubmit={handleNewsletterSubmit}
              className="max-w-md mx-auto"
            >
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={getTranslation(
                    currentLocale,
                    "footer.subscribe_placeholder"
                  )}
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none bg-white disabled:opacity-50"
                />
                <button
                  aria-label="subscribe"
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-xl font-semibold hover:bg-yellow-300 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting
                    ? "Subscribing..."
                    : getTranslation(currentLocale, "footer.subscribe_button")}
                  {!isSubmitting && <ArrowRight className="w-4 h-4 ml-2" />}
                </button>
              </div>

              {message && (
                <div
                  className={`mt-4 p-3 rounded-lg text-sm ${
                    messageType === "success"
                      ? "bg-green-500 bg-opacity-20 text-green-100 border border-green-400"
                      : "bg-red-500 bg-opacity-20 text-red-100 border border-red-400"
                  }`}
                >
                  {message}
                </div>
              )}
            </form>
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
                  src="/images/logo.png"
                  alt="logo"
                  height={50}
                  width={200}
                />
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                {getTranslation(currentLocale, "footer.brand_description")}
              </p>

              {/* Social links */}
              <div className="flex space-x-4">
                <a
                  aria-label="twitter"
                  href="https://x.com/PyconSenegambia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  aria-label="linkedin"
                  href="https://www.linkedin.com/company/pycon-senegambia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                >
                  <Linkedin className="w-4 h-4" aria-label="linkedin" />
                </a>
                <a
                  aria-label="instagram"
                  href="https://www.instagram.com/pyconsenegambia/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors"
                >
                  <Instagram className="w-4 h-4" aria-label="instagram" />
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
                    aria-label="about"
                    href={`/${currentLocale}/about`}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {getTranslation(currentLocale, "footer.quick_links.about")}
                  </a>
                </li>
                <li>
                  <a
                    aria-label="sponsorship"
                    href={`/${currentLocale}/speakers`}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {getTranslation(
                      currentLocale,
                      "footer.quick_links.speakers"
                    )}
                  </a>
                </li>

                <li>
                  <a
                    aria-label="call for proposals"
                    href={`/${currentLocale}/proposal`}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {getTranslation(
                      currentLocale,
                      "footer.quick_links.proposal"
                    )}
                  </a>
                </li>
                <li>
                  <a
                    aria-label="sponsorship"
                    href={`/${currentLocale}/sponsorship`}
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
                    aria-label="code of conduct"
                    href={`/${currentLocale}/conduct`}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {getTranslation(
                      currentLocale,
                      "footer.community.code_of_conduct"
                    )}
                  </a>
                </li>
                <li>
                  <a
                    aria-label="diversity"
                    href={`/${currentLocale}/#diversity`}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {getTranslation(
                      currentLocale,
                      "footer.community.diversity"
                    )}
                  </a>
                </li>
                <li>
                  <a
                    aria-label="volunteer"
                    href={`/${currentLocale}/volunteers`}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {getTranslation(
                      currentLocale,
                      "footer.community.volunteer"
                    )}
                  </a>
                </li>

                <li>
                  <a
                    aria-label="blog"
                    href={`/${currentLocale}/blog`}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {getTranslation(currentLocale, "footer.quick_links.blog")}
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
                  <Mail
                    className="w-5 h-5 text-blue-400 mr-3 mt-0.5 shrink-0"
                    aria-label="mail"
                  />
                  <div>
                    <div className="text-gray-400">
                      {getTranslation(currentLocale, "footer.contact_email")}
                    </div>
                  </div>
                </li>
                <li className="flex items-start">
                  <Phone className="w-5 h-5 text-green-400 mr-3 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-gray-400">
                      {getTranslation(currentLocale, "footer.contact_phone1")}
                    </div>
                    <div className="text-gray-400">
                      {getTranslation(currentLocale, "footer.contact_phone2")}
                    </div>
                  </div>
                </li>
                <li className="flex items-start">
                  <MapPin
                    className="w-5 h-5 text-red-400 mr-3 mt-0.5 shrink-0"
                    aria-label="map pin"
                  />
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
              <span>
                {getTranslation(currentLocale, "footer.copyright").replace(
                  "love",
                  ""
                )}
              </span>
              <Heart
                className="w-4 h-4 text-red-500 mx-1 fill-current"
                aria-label="heart"
              />
              <span>
                {
                  getTranslation(currentLocale, "footer.copyright").split(
                    "love"
                  )[1]
                }
              </span>
            </div>

            <div className="flex items-center space-x-6 text-sm">
              <a
                aria-label="privacy"
                href={`/${currentLocale}/#privacy`}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {getTranslation(currentLocale, "footer.privacy")}
              </a>
              <a
                aria-label="terms"
                href={`/${currentLocale}/#terms`}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {getTranslation(currentLocale, "footer.terms")}
              </a>
              <a
                aria-label="cookie"
                href={`/${currentLocale}/#cookie`}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {getTranslation(currentLocale, "footer.cookie")}
              </a>
            </div>

            <div className="flex items-center text-gray-400 text-sm">
              <Globe className="w-4 h-4 mr-2" aria-label="globe" />
              <span>{getTranslation(currentLocale, "footer.location")}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
