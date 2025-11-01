"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { X, Users, Mail } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StaffFormData, staffSchema, useStaffModal } from "@/hooks/frontdes";

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
            <Users className="h-5 w-5" />
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

export const StaffModal = () => {
  const { isOpen, data, isEditing, onClose } = useStaffModal();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<StaffFormData>({
    resolver: zodResolver(staffSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      role: "FRONTDESK",
      isActive: true,
    },
  });

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen && data) {
      form.reset({
        email: data.email || "",
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        role: data.role || "FRONTDESK",
        isActive: data.isActive !== undefined ? data.isActive : true,
      });
    } else if (isOpen && !data) {
      form.reset({
        email: "",
        firstName: "",
        lastName: "",
        role: "FRONTDESK",
        isActive: true,
      });
    }
  }, [isOpen, data, form]);

  const onSubmit = async (formData: StaffFormData) => {
    setIsLoading(true);
    try {
      if (isEditing && data?.id) {
        await axios.patch(`/api/staff/${data.id}`, {
          firstName: formData.firstName,
          lastName: formData.lastName,
          role: formData.role,
          isActive: formData.isActive !== undefined ? formData.isActive : true,
        });
        toast.success("Staff member updated successfully");
      } else {
        const response = await axios.post('/api/staff', formData);
        
        if (response.data.warning === "EMAIL_FAILED") {
          toast.warning(response.data.message, {
            description: `Temporary password: ${response.data.data.tempPassword}`,
            duration: 10000,
          });
        } else {
          toast.success(response.data.message);
        }
      }
      onClose();
      form.reset();
      router.refresh();
    } catch (error: any) {
      console.error('Error submitting form:', error);
      const errorMessage = error.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!data?.id) return;
    
    if (!confirm(`Are you sure you want to reset password for ${data.firstName} ${data.lastName}?`)) {
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(`/api/staff/${data.id}/reset-password`);
      
      if (response.data.warning === "EMAIL_FAILED") {
        toast.warning(response.data.message, {
          description: `New password: ${response.data.data.newPassword}`,
          duration: 10000,
        });
      } else {
        toast.success(response.data.message);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to reset password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? "Edit Staff Member" : "Add New Staff Member"}
    >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="email"
              {...form.register("email")}
              disabled={isEditing}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholder="staff@example.com"
            />
          </div>
          {form.formState.errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.email.message}
            </p>
          )}
          {isEditing && (
            <p className="text-xs text-gray-500 mt-1">
              Email cannot be changed after creation
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name *
            </label>
            <input
              type="text"
              {...form.register("firstName")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="John"
            />
            {form.formState.errors.firstName && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.firstName.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name *
            </label>
            <input
              type="text"
              {...form.register("lastName")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Doe"
            />
            {form.formState.errors.lastName && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Role *
          </label>
          <Select
            value={form.watch("role")}
            onValueChange={(value: any) => form.setValue("role", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ADMIN">Admin</SelectItem>
              <SelectItem value="FRONTDESK">Front Desk</SelectItem>
              <SelectItem value="SECURITY">Security</SelectItem>
            </SelectContent>
          </Select>
          {form.formState.errors.role && (
            <p className="text-red-500 text-sm mt-1">
              {form.formState.errors.role.message}
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
            Active (can access the system)
          </label>
        </div>

        {isEditing && (
          <div className="pt-2 border-t">
            <Button
              type="button"
              onClick={handleResetPassword}
              variant="outline"
              disabled={isLoading}
              className="w-full"
            >
              Reset Password
            </Button>
            <p className="text-xs text-gray-500 mt-2 text-center">
              A new password will be generated and emailed to the staff member
            </p>
          </div>
        )}

        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" onClick={onClose} variant="ghost" disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : isEditing ? "Update" : "Create"}
          </Button>
        </div>

        {!isEditing && (
          <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
            <p className="text-xs text-blue-800">
              <strong>Note:</strong> A temporary password will be automatically generated 
              and sent to the staff member's email address.
            </p>
          </div>
        )}
      </form>
    </Modal>
  );
};