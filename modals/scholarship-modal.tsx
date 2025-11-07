// components/modals/scholarship-ticket-modal.tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Loader2, 
  Ticket, 
  Gift,
  CheckCircle2,
  User,
  Mail,
  Phone,
  FileText,
  Sparkles,
} from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import {
  scholarshipTicketSchema,
  type ScholarshipTicketFormData,
  defaultScholarshipValues,
  createScholarshipTicket,
  useScholarshipModal,
} from '@/hooks/scholarship';

export function ScholarshipTicketModal() {
  const { isOpen, onClose } = useScholarshipModal();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ScholarshipTicketFormData>({
    resolver: zodResolver(scholarshipTicketSchema),
    defaultValues: defaultScholarshipValues,
  });

  const onSubmit = async (data: ScholarshipTicketFormData) => {
    try {
      setIsSubmitting(true);

      console.log('Submitting scholarship ticket:', data);

      const result = await createScholarshipTicket(data);

      if (result.success) {
        toast.success(
          result.emailError
            ? `Ticket created successfully! However, email failed to send: ${result.emailError}`
            : 'Scholarship ticket created and email sent successfully!',
          {
            description: `Ticket for ${data.customerName} (${data.ticketType})`,
            duration: 5000,
          }
        );

        form.reset();
        onClose();
      } else {
        // Handle duplicate email case
        if (result.existingTicket) {
          toast.error('Duplicate Scholarship Ticket', {
            description: `This email already has a ${result.existingTicket.ticketType} scholarship ticket (${result.existingTicket.transactionReference})`,
            duration: 6000,
          });
        } else {
          toast.error('Failed to create scholarship ticket', {
            description: result.error || 'An unexpected error occurred',
          });
        }
      }
    } catch (error) {
      console.error('Error creating scholarship ticket:', error);
      toast.error('Error', {
        description: error instanceof Error ? error.message : 'Failed to create scholarship ticket',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      form.reset();
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="sr-only">
          <DialogTitle>Issue Scholarship Ticket</DialogTitle>
        </DialogHeader>
        
        <div className="relative">
          {/* Header with gradient */}
          <div className="bg-linear-to-r from-green-600 via-emerald-600 to-teal-600 p-8 rounded-t-xl">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full border-4 border-white shadow-2xl bg-white flex items-center justify-center">
                  <Gift className="w-12 h-12 text-green-600" />
                </div>
                <div className="absolute -top-2 -right-2 bg-linear-to-r from-yellow-400 to-orange-400 rounded-full p-2 shadow-lg">
                  <Ticket className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="text-white text-center md:text-left flex-1">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                  <h2 className="text-3xl font-bold">Scholarship Ticket</h2>
                  <Badge className="bg-yellow-400 text-yellow-900 border-0 font-bold shadow-md">
                    FREE
                  </Badge>
                </div>
                <p className="text-xl text-green-100 mb-2 font-medium">
                  PyCon Senegambia 2025
                </p>
                <p className="text-green-200 mb-3">
                  Issue a complimentary conference pass
                </p>
               
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Form */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Recipient Information Section */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <User className="w-5 h-5 mr-2 text-green-600" />
                    Recipient Information
                  </h3>
                  
                  <div className="space-y-4">
                    {/* Customer Name */}
                    <FormField
                      control={form.control}
                      name="customerName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium">
                            Full Name *
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                              <Input
                                placeholder="Sheriff Gaye"
                                className="pl-10"
                                {...field}
                                disabled={isSubmitting}
                              />
                            </div>
                          </FormControl>
                         
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Customer Email */}
                    <FormField
                      control={form.control}
                      name="customerEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium">
                            Email Address *
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                              <Input
                                type="email"
                                placeholder="johndoe@example.com"
                                className="pl-10"
                                {...field}
                                disabled={isSubmitting}
                              />
                            </div>
                          </FormControl>
                         
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Customer Phone */}
                    <FormField
                      control={form.control}
                      name="customerPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium">
                            Phone Number *
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                              <Input
                                type="tel"
                                placeholder="+220 123 4567"
                                className="pl-10"
                                {...field}
                                disabled={isSubmitting}
                              />
                            </div>
                          </FormControl>
                         
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Ticket Configuration Section */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <Ticket className="w-5 h-5 mr-2 text-green-600" />
                    Ticket Configuration
                  </h3>
                  
                  <div className="space-y-4">
                    {/* Ticket Type */}
                    <FormField
                      control={form.control}
                      name="ticketType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium">
                            Ticket Type *
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            disabled={isSubmitting}
                          >
                            <FormControl>
                              <SelectTrigger className="h-auto">
                                <SelectValue placeholder="Select a ticket type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="STUDENTS">
                                <div className="flex items-center gap-3 py-2">
                                  <span className="text-2xl">🎓</span>
                                  <div className="flex flex-col items-start">
                                    <span className="font-semibold">Students Ticket</span>
                                    <span className="text-xs text-gray-500">For students and learners</span>
                                  </div>
                                </div>
                              </SelectItem>
                              <SelectItem value="INDIVIDUAL">
                                <div className="flex items-center gap-3 py-2">
                                  <span className="text-2xl">👤</span>
                                  <div className="flex flex-col items-start">
                                    <span className="font-semibold">Individual Ticket</span>
                                    <span className="text-xs text-gray-500">For individual attendees</span>
                                  </div>
                                </div>
                              </SelectItem>
                              <SelectItem value="CORPORATE">
                                <div className="flex items-center gap-3 py-2">
                                  <span className="text-2xl">🏢</span>
                                  <div className="flex flex-col items-start">
                                    <span className="font-semibold">Corporate Ticket</span>
                                    <span className="text-xs text-gray-500">For company representatives</span>
                                  </div>
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                         
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                  
                  </div>
                </div>

              
                {/* Action Buttons */}
                <div className="border-t pt-6">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-md hover:shadow-lg transition-all h-11"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating Ticket...
                        </>
                      ) : (
                        <>
                          <Gift className="mr-2 h-4 w-4" />
                          Issue Scholarship Ticket
                        </>
                      )}
                    </Button>
                    
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleClose}
                      disabled={isSubmitting}
                      className="h-11 sm:w-32"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}