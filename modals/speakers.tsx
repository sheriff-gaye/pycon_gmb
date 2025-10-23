"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { X, User, Pencil, PlusCircle, ImageIcon, Upload, Mic, Award, MapPin, Clock, Tag } from "lucide-react";
import { useSpeakerModal, speakerSchema, SpeakerFormData } from "@/hooks/speakers";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";





interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <User className="h-5 w-5" />
            {title}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

interface ImageFormProps {
  value: string;
  onChange: (dataUrl: string) => void;
  error?: string;
}

const ImageForm = ({ value, onChange, error }: ImageFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB');
      return;
    }

    setIsUploading(true);

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      onChange(dataUrl);
      toast.success('Image uploaded successfully');
      setIsUploading(false);
      toggleEdit();
    };

    reader.onerror = () => {
      toast.error('Failed to read the image file');
      setIsUploading(false);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="mt-6 border rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Speaker Image *
        <Button onClick={toggleEdit} variant="ghost" disabled={isUploading}>
          {isEditing && <>Cancel</>}
          {!isEditing && !value && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add image
            </>
          )}
          {!isEditing && value && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit image
            </>
          )}
        </Button>
      </div>
      
      {!isEditing && (
        !value ? (
          <div className="flex items-center justify-center h-48 bg-slate-200 rounded-md mt-2">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative mt-2">
            <img
              alt="Speaker preview"
              className="object-cover rounded-md mx-auto max-h-48 w-full"
              src={value}
            />
          </div>
        )
      )}
      
      {isEditing && (
        <div className="mt-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
            <div className="flex flex-col items-center gap-4">
              <Upload className="h-8 w-8 text-gray-400" />
              <div>
                <label htmlFor="image-upload" className="cursor-pointer">
                  <span className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors inline-block">
                    {isUploading ? 'Uploading...' : 'Choose Image'}
                  </span>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={isUploading}
                    className="sr-only"
                  />
                </label>
                <p className="text-sm text-gray-500 mt-2">
                  PNG, JPG, GIF up to 5MB
                </p>
              </div>
            </div>
          </div>
          
          {isUploading && (
            <div className="text-sm text-blue-600 mt-2 text-center">
              Processing image... Please wait.
            </div>
          )}
        </div>
      )}
      
      {error && !isUploading && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

export const SpeakerModal = () => {
  const { isOpen, data, isEditing, onClose } = useSpeakerModal();
  const [isLoading, setIsLoading] = useState(false);
  const [expertiseInput, setExpertiseInput] = useState("");
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(speakerSchema),
    mode: "onSubmit" as const,
    defaultValues: {
      name: "",
      title: "",
      company: "",
      location: "",
      image: "",
      bio: "",
      expertise: [],
      isKeynote: false,
      isActive: true,
      order: 0,
      sessionTitle: "",
      sessionDescription: "",
      sessionDuration: "",
      sessionTrack: "",
      sessionLevel: "",
      linkedin: "",
      twitter: "",
      github: "",
    },
  });

  useEffect(() => {
    if (isOpen && data) {
      form.reset({
        name: data.name || "",
        title: data.title || "",
        company: data.company || "",
        location: data.location || "",
        image: data.image || "",
        bio: data.bio || "",
        expertise: data.expertise || [],
        isKeynote: data.isKeynote || false,
        isActive: data.isActive ?? true,
        order: data.order || 0,
        sessionTitle: data.sessionTitle || "",
        sessionDescription: data.sessionDescription || "",
        sessionDuration: data.sessionDuration || "",
        sessionTrack: data.sessionTrack || "",
        sessionLevel: data.sessionLevel || "",
        linkedin: data.linkedin || "",
        twitter: data.twitter || "",
        github: data.github || "",
      });
    } else if (isOpen && !data) {
      form.reset({
        name: "",
        title: "",
        company: "",
        location: "",
        image: "",
        bio: "",
        expertise: [],
        isKeynote: false,
        isActive: true,
        order: 0,
        sessionTitle: "",
        sessionDescription: "",
        sessionDuration: "",
        sessionTrack: "",
        sessionLevel: "",
        linkedin: "",
        twitter: "",
        github: "",
      });
    }
  }, [isOpen, data, form]);

  const expertise = form.watch("expertise") || [];

  const addExpertise = () => {
    if (expertiseInput.trim() && !expertise.includes(expertiseInput.trim())) {
      const newExpertise = [...expertise, expertiseInput.trim()];
      form.setValue("expertise", newExpertise);
      setExpertiseInput("");
    }
  };

  const removeExpertise = (index: number) => {
    const newExpertise = expertise.filter((_, i) => i !== index);
    form.setValue("expertise", newExpertise);
  };

  const onSubmit = async (formData: SpeakerFormData) => {
    if (!formData.image || formData.image.trim() === "") {
      toast.error("Please upload a speaker image before submitting");
      return;
    }

    setIsLoading(true);
    try {
      if (isEditing && data?.id) {
        await axios.put(`/api/speakers/${data.id}`, formData);
        toast.success("Speaker updated successfully");
      } else {
        await axios.post('/api/speakers', formData);
        toast.success("Speaker created successfully");
      }
      onClose();
      form.reset();
      router.refresh();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const imageValue = form.watch("image");

  const handleImageChange = (dataUrl: string) => {
    form.setValue('image', dataUrl, { 
      shouldValidate: true, 
      shouldDirty: true 
    });
    form.clearErrors('image');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? "Edit Speaker" : "Add New Speaker"}
    >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Speaker Name *
            </label>
            <input
              type="text"
              {...form.register("name")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Dr. Amara Kamara"
            />
            {form.formState.errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title *
            </label>
            <input
              type="text"
              {...form.register("title")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Senior Machine Learning Engineer"
            />
            {form.formState.errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.title.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company 
            </label>
            <input
              type="text"
              {...form.register("company")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="TechAfrica Solutions"
            />
            {form.formState.errors.company && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.company.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location *
            </label>
            <input
              type="text"
              {...form.register("location")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Dakar, Senegal"
            />
            {form.formState.errors.location && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.location.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bio *
          </label>
          <textarea
            {...form.register("bio")}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Speaker biography..."
          />
          {form.formState.errors.bio && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.bio.message}
            </p>
          )}
        </div>

        <ImageForm
          value={imageValue}
          onChange={handleImageChange}
          error={form.formState.errors.image?.message}
        />

        {/* Expertise */}
        <div className="border rounded-md p-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Expertise *
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={expertiseInput}
              onChange={(e) => setExpertiseInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addExpertise())}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Add expertise (e.g., Machine Learning)"
            />
            <Button type="button" onClick={addExpertise} variant="ghost">
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {expertise.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeExpertise(index)}
                  className="ml-2 text-blue-500 hover:text-blue-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          {form.formState.errors.expertise && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.expertise.message}
            </p>
          )}
        </div>

        {/* Session Details */}
        <div className="border rounded-md p-4">
          <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
            <Mic className="h-5 w-5 text-blue-600" />
            Session Details
          </h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Session Title *
            </label>
            <input
              type="text"
              {...form.register("sessionTitle")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Building Ethical AI Systems for African Markets"
            />
            {form.formState.errors.sessionTitle && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.sessionTitle.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Session Description *
            </label>
            <textarea
              {...form.register("sessionDescription")}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Session description..."
            />
            {form.formState.errors.sessionDescription && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.sessionDescription.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Clock className="h-4 w-4 inline mr-1" />
                Duration *
              </label>
              <input
                type="text"
                {...form.register("sessionDuration")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="45 minutes"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Tag className="h-4 w-4 inline mr-1" />
                Track *
              </label>
              <input
                type="text"
                {...form.register("sessionTrack")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Data Science & AI"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Award className="h-4 w-4 inline mr-1" />
                Level *
              </label>
              <select
                {...form.register("sessionLevel")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="All Levels">All Levels</option>
              </select>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="border rounded-md p-4">
          <h3 className="text-lg font-medium mb-4">Social Links (Optional)</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                LinkedIn
              </label>
              <input
                type="text"
                {...form.register("linkedin")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Twitter
              </label>
              <input
                type="text"
                {...form.register("twitter")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                GitHub
              </label>
              <input
                type="text"
                {...form.register("github")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="username"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              {...form.register("isKeynote")}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">
              Keynote Speaker
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              {...form.register("isActive")}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">
              Active (visible on website)
            </label>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Display Order
            </label>
            <input
              type="number"
              min="0"
              {...form.register("order", { valueAsNumber: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" onClick={onClose} variant="ghost" disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading || !imageValue}>
            {isLoading ? "Saving..." : isEditing ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};