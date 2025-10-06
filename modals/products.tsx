"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { X, Package, Pencil, PlusCircle, ImageIcon, Upload } from "lucide-react";
import { useProductModal, productSchema, ProductFormData } from "@/hooks/products";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Mock toast for demo
const toast = {
  success: (msg: string) => console.log("Success:", msg),
  error: (msg: string) => console.error("Error:", msg)
};

// Mock Button component
const Button = ({ children, onClick, variant = "default", disabled = false, type = "button" }: any) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`px-4 py-2 rounded-md font-medium transition-colors ${
      variant === "ghost" 
        ? "hover:bg-gray-100" 
        : "bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-300"
    }`}
  >
    {children}
  </button>
);

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
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Package className="h-5 w-5" />
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
        Product Image *
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
              alt="Product preview"
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

export const ProductModal = () => {
  const { isOpen, data, isEditing, onClose } = useProductModal();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Define form with correct typing - remove optional fields from defaults
   const form = useForm({
    resolver: zodResolver(productSchema),
    mode: "onSubmit" as const,
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      image: "",
      category: "APPAREL" as const,
      inStock: true,
      rating: 0,
      reviews: 0,
      featured: false,
      isActive: true,
      order: 0,
    },
  });

  useEffect(() => {
    if (isOpen && data) {
      form.reset({
        name: data.name || "",
        description: data.description || "",
        price: data.price || 0,
        originalPrice: data.originalPrice,
        image: data.image || "",
        category: data.category || "APPAREL",
        inStock: data.inStock ?? true,
        rating: data.rating || 0,
        reviews: data.reviews || 0,
        featured: data.featured ?? false,
        isActive: data.isActive ?? true,
        order: data.order ?? 0,
      });
    } else if (isOpen && !data) {
      form.reset({
        name: "",
        description: "",
        price: 0,
        image: "",
        category: "APPAREL",
        inStock: true,
        rating: 0,
        reviews: 0,
        featured: false,
        isActive: true,
        order: 0,
      });
    }
  }, [isOpen, data, form]);

  const onSubmit = async (formData: ProductFormData) => {
    if (!formData.image || formData.image.trim() === "") {
      toast.error("Please upload a product image before submitting");
      return;
    }

    setIsLoading(true);
    try {
      if (isEditing && data?.id) {
        await axios.put(`/api/products/${data.id}`, formData);
        toast.success("Product updated successfully");
      } else {
        await axios.post('/api/products', formData);
        toast.success("Product created successfully");
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
      title={isEditing ? "Edit Product" : "Add New Product"}
    >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name *
            </label>
            <input
              type="text"
              {...form.register("name")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="PyCon T-Shirt"
            />
            {form.formState.errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category *
            </label>
            <select
              {...form.register("category")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="APPAREL">Apparel</option>
              <option value="ACCESSORIES">Accessories</option>
              <option value="TECH">Tech</option>
              <option value="BOOKS">Books</option>
              <option value="STICKERS">Stickers</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description *
          </label>
          <textarea
            {...form.register("description")}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Describe the product..."
          />
          {form.formState.errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.description.message}
            </p>
          )}
        </div>

        <ImageForm
          value={imageValue}
          onChange={handleImageChange}
          error={form.formState.errors.image?.message}
        />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price (D) *
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              {...form.register("price", { valueAsNumber: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="25.00"
            />
            {form.formState.errors.price && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.price.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Original Price (D)
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              {...form.register("originalPrice", { 
                setValueAs: (v) => v === "" || v === null || v === undefined ? undefined : parseFloat(v)
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="35.00"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rating (0-5)
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="5"
              {...form.register("rating", { valueAsNumber: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="4.5"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reviews
            </label>
            <input
              type="number"
              min="0"
              {...form.register("reviews", { valueAsNumber: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="124"
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
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              {...form.register("inStock")}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">
              In Stock
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              {...form.register("featured")}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">
              Featured Product
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              {...form.register("isActive")}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">
              Active (visible on shop)
            </label>
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