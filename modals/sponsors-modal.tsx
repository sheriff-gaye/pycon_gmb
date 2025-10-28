"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { X, Building2, Pencil, PlusCircle, ImageIcon, Upload } from "lucide-react";
import { useSponsorModal } from "@/hooks/sponsors";
import Image from "next/image";

const sponsorSchema = z.object({
  name: z.string().min(1, "Sponsor name is required"),
  logo: z.string().min(1, "Logo is required"),
  website: z.string().url("Website must be a valid URL").optional().or(z.literal("")),
  description: z.string().optional(),
  isActive: z.boolean(), 
  order: z.number().int().min(0, "Order must be a non-negative integer"), 
});

type SponsorFormData = z.infer<typeof sponsorSchema>;

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
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Building2 className="h-5 w-5" />
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

interface LogoFormProps {
  value: string;
  onChange: (dataUrl: string) => void;
  error?: string;
}

const LogoForm = ({ value, onChange, error }: LogoFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB');
      return;
    }

    setIsUploading(true);

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      onChange(dataUrl);
      toast.success('Logo uploaded successfully');
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
        Sponsor Logo *
        <Button onClick={toggleEdit} variant="ghost" disabled={isUploading} type="button">
          {isEditing && (
            <>Cancel</>
          )}
          {!isEditing && !value && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a logo
            </>
          )}
          {!isEditing && value && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit logo
            </>
          )}
        </Button>
      </div>
      
      {!isEditing && (
        !value ? (
          <div className="flex items-center justify-center h-32 bg-slate-200 rounded-md mt-2">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative mt-2">
            <Image
              alt="Logo preview"
              width={200}
              height={100}
              className="object-contain rounded-md mx-auto max-h-32"
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
                <label htmlFor="logo-upload" className="cursor-pointer">
                  <span className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors inline-block">
                    {isUploading ? 'Uploading...' : 'Choose Image'}
                  </span>
                  <input
                    id="logo-upload"
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
          
          <div className="text-xs text-muted-foreground mt-4 text-center">
            Square aspect ratio recommended for logos
          </div>
        </div>
      )}
      
      {error && !isUploading && (
        <p className="text-red-500 text-sm mt-1">
          {error}
        </p>
      )}
    </div>
  );
};

export const SponsorModal = () => {
  const { isOpen, data, isEditing, onClose } = useSponsorModal();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Use the explicit type for better type safety
  const form = useForm<SponsorFormData>({
    resolver: zodResolver(sponsorSchema),
    mode: "onSubmit",
    defaultValues: {
      name: "",
      logo: "",
      website: "",
      description: "",
      isActive: true, // Provide explicit default
      order: 0, // Provide explicit default
    },
  });

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen && data) {
      form.reset({
        name: data.name || "",
        logo: data.logo || "",
        website: data.website || "",
        description: data.description || "",
        isActive: data.isActive ?? true,
        order: data.order ?? 0,
      });
    } else if (isOpen && !data) {
      form.reset({
        name: "",
        logo: "",
        website: "",
        description: "",
        isActive: true,
        order: 0,
      });
    }
  }, [isOpen, data, form]);

  // Use the explicit type for the submit handler
  const onSubmit = async (formData: SponsorFormData) => {
    if (!formData.logo || formData.logo.trim() === "") {
      toast.error("Please upload a logo before submitting");
      return;
    }

    setIsLoading(true);
    try {
      if (isEditing && data?.id) {
        await axios.put(`/api/sponsors/${data.id}`, formData);
        toast.success("Sponsor updated successfully");
      } else {
        await axios.post('/api/sponsors', formData);
        toast.success("Sponsor created successfully");
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

  const logoValue = form.watch("logo");

  const handleLogoChange = (dataUrl: string) => {
    form.setValue('logo', dataUrl, { 
      shouldValidate: true, 
      shouldDirty: true 
    });
    form.clearErrors('logo');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? "Edit Sponsor" : "Add New Sponsor"}
    >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sponsor Name *
          </label>
          <input
            type="text"
            {...form.register("name")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter sponsor name"
          />
          {form.formState.errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.name.message}
            </p>
          )}
        </div>

        {/* Enhanced Logo Form Component */}
        <LogoForm
          value={logoValue}
          onChange={handleLogoChange}
          error={form.formState.errors.logo?.message}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Website URL
          </label>
          <input
            type="url"
            {...form.register("website")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://example.com"
          />
          {form.formState.errors.website && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.website.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            {...form.register("description")}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Brief description about the sponsor"
          />
        </div>

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
          {form.formState.errors.order && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.order.message}
            </p>
          )}
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

        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" onClick={onClose} variant="ghost" disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading || !logoValue}>
            {isLoading ? "Saving..." : isEditing ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};