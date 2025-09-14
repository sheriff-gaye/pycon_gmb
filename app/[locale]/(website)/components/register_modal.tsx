import { useState } from "react";
import { X, Mail, User, ArrowRight } from "lucide-react";
import { getTranslation } from "@/lib/i18n";

interface RegistrationModalProps {
  currentLocale: string;
  isOpen: boolean;
  onClose: () => void;
}

const RegistrationModal = ({
  isOpen,
  onClose,
  currentLocale,
}: RegistrationModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      setMessage(getTranslation(currentLocale, "registration.form.error_empty_fields"));
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
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
          type: "conference_registration"
        })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(getTranslation(currentLocale, "registration.form.success_message"));
        setMessageType("success");
        setFormData({ name: "", email: "" });
        setTimeout(() => {
          onClose();
          setMessage("");
          setMessageType("");
        }, 2000);
      } else {
        setMessage(data.error || getTranslation(currentLocale, "registration.form.error_failed"));
        setMessageType("error");
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setMessage(getTranslation(currentLocale, "registration.form.error_generic"));
      setMessageType("error");
    }

    setIsSubmitting(false);

    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 5000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white text-opacity-80 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-bold text-white mb-2">
            {getTranslation(currentLocale, "registration.header.title")}
          </h2>
          <p className="text-blue-100 text-sm">
            {getTranslation(currentLocale, "registration.header.subtitle")}
          </p>
        </div>

        {/* Form */}
        <div className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {getTranslation(currentLocale, "registration.form.name_label")}
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder={getTranslation(currentLocale, "registration.form.name_placeholder")}
                  disabled={isSubmitting}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {getTranslation(currentLocale, "registration.form.email_label")}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={getTranslation(currentLocale, "registration.form.email_placeholder")}
                  disabled={isSubmitting}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            {message && (
              <div
                className={`p-3 rounded-lg text-sm ${
                  messageType === "success"
                    ? "bg-green-50 text-green-800 border border-green-200"
                    : "bg-red-50 text-red-800 border border-red-200"
                }`}
              >
                {message}
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {getTranslation(currentLocale, "registration.form.button_submitting")}
                </div>
              ) : (
                <div className="flex items-center">
                  {getTranslation(currentLocale, "registration.form.button_submit")}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              )}
            </button>
          </div>

          <p className="text-xs text-gray-500 mt-4 text-center">
            {getTranslation(currentLocale, "registration.footer.consent")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationModal;