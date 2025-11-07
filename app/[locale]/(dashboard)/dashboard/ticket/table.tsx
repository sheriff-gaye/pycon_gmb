"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  Ticket,
  User,
  Calendar,
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Mail,
  AlertTriangle,
  Loader2,
  Send,
  CheckSquare
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { toast } from "sonner";
import { ScholarshipTicketButton } from "./scholarship-button";
import { ScholarshipTicketModal } from "@/modals/scholarship-modal";

// Define the TicketPurchase interface
interface TicketPurchase {
  id: string;
  customerName: string;
  customerEmail: string;
  ticketType: string;
  amount: number;
  currency: string;
  paymentStatus: "COMPLETED" | "PENDING" | "FAILED" | "CANCELLED";
  transactionReference: string;
  createdAt: Date | string;
}

interface TicketPurchasesTableProps {
  purchases: TicketPurchase[];
}

interface LoadingStates {
  [key: string]: boolean;
}

interface BulkFollowUpResponse {
  success: boolean;
  error?: string;
  data?: {
    emailsSent: number;
    errors: Array<{ ticketId: string; error: string }>;
    ticketsProcessed: number;
    successRate?: number;
  };
}

interface SingleFollowUpResponse {
  success: boolean;
  error?: string;
}

const TicketPurchasesTable: React.FC<TicketPurchasesTableProps> = ({
  purchases
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [loadingStates, setLoadingStates] = useState<LoadingStates>({});
  const [selectedTickets, setSelectedTickets] = useState<Set<string>>(
    new Set()
  );
  const [bulkLoading, setBulkLoading] = useState<boolean>(false);

  const formatDate = (date: Date | string): string => {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const getStatusBadgeColor = (status: string): string => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-800 border-green-200";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "FAILED":
      case "CANCELLED":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatCurrency = (amount: number, currency: string): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency
    }).format(amount);
  };

  // Check if ticket is failed (eligible for follow-up)
  const isFailedTicket = (status: string): boolean => {
    return ["FAILED", "CANCELLED", "PENDING"].includes(status);
  };

  // Filter purchases based on search term
  const filteredPurchases = useMemo(() => {
    if (!searchTerm) return purchases;

    return purchases.filter((purchase) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        purchase.customerName.toLowerCase().includes(searchLower) ||
        purchase.customerEmail.toLowerCase().includes(searchLower) ||
        purchase.transactionReference.toLowerCase().includes(searchLower)
      );
    });
  }, [purchases, searchTerm]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredPurchases.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedPurchases = filteredPurchases.slice(startIndex, endIndex);

  // Get failed tickets from current page
  const failedTicketsOnPage = paginatedPurchases.filter((purchase) =>
    isFailedTicket(purchase.paymentStatus)
  );
  const allFailedTickets = filteredPurchases.filter((purchase) =>
    isFailedTicket(purchase.paymentStatus)
  );

  // Selection management
  const handleTicketSelect = (ticketId: string, checked: boolean): void => {
    const newSelection = new Set(selectedTickets);
    if (checked) {
      newSelection.add(ticketId);
    } else {
      newSelection.delete(ticketId);
    }
    setSelectedTickets(newSelection);
  };

  const handleSelectAll = (checked: boolean): void => {
    if (checked) {
      const failedIds = failedTicketsOnPage.map((ticket) => ticket.id);
      setSelectedTickets(new Set([...selectedTickets, ...failedIds]));
    } else {
      const failedIds = new Set(failedTicketsOnPage.map((ticket) => ticket.id));
      const newSelection = new Set(
        [...selectedTickets].filter((id) => !failedIds.has(id))
      );
      setSelectedTickets(newSelection);
    }
  };

  const selectedFailedTickets = [...selectedTickets].filter((id) => {
    const ticket = purchases.find((p) => p.id === id);
    return ticket && isFailedTicket(ticket.paymentStatus);
  });

  // Reset selections when search changes
  useEffect(() => {
    setCurrentPage(1);
    setSelectedTickets(new Set());
  }, [searchTerm]);

  // Individual follow-up email
  const handleSendFollowUp = async (
    ticketId: string,
    customerName: string
  ): Promise<void> => {
    try {
      setLoadingStates((prev) => ({ ...prev, [ticketId]: true }));

      const response = await fetch("/api/follow-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ticketIds: [ticketId],
          retryPaymentLink: "https://pyconsenegambia.org/tickets"
        })
      });

      const result: SingleFollowUpResponse = await response.json();

      if (result.success) {
        toast.success(`Follow-up email sent to ${customerName}`);
        setSelectedTickets((prev) => {
          const newSet = new Set(prev);
          newSet.delete(ticketId);
          return newSet;
        });
      } else {
        toast.error(
          `Failed to send follow-up: ${result.error || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Error sending follow-up email:", error);
      toast.error("Failed to send follow-up email. Please try again.");
    } finally {
      setLoadingStates((prev) => ({ ...prev, [ticketId]: false }));
    }
  };

  // Bulk follow-up emails
  const handleBulkFollowUp = async (): Promise<void> => {
    if (selectedFailedTickets.length === 0) {
      toast.error("No failed tickets selected");
      return;
    }

    try {
      setBulkLoading(true);

      const response = await fetch("/api/follow-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ticketIds: selectedFailedTickets,
          retryPaymentLink: "https://pyconsenegambia.org/tickets"
        })
      });

      const result: BulkFollowUpResponse = await response.json();

      if (result.success && result.data) {
        const { emailsSent, errors, ticketsProcessed } = result.data;

        if (emailsSent === ticketsProcessed) {
          toast.success(
            `Successfully sent follow-up emails to all ${emailsSent} selected tickets`
          );
        } else {
          toast.warning(
            `Sent ${emailsSent} out of ${ticketsProcessed} follow-up emails. ${errors.length} failed.`
          );
        }

        // Clear successful selections
        if (errors.length === 0) {
          setSelectedTickets(new Set());
        } else {
          // Keep only failed tickets in selection
          const failedIds = new Set(errors.map((e) => e.ticketId));
          setSelectedTickets(failedIds);
        }
      } else {
        toast.error(
          `Bulk follow-up failed: ${result.error || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Error sending bulk follow-up emails:", error);
      toast.error("Failed to send bulk follow-up emails. Please try again.");
    } finally {
      setBulkLoading(false);
    }
  };

  // Send to all failed tickets
  const handleSendToAllFailed = async (): Promise<void> => {
    if (allFailedTickets.length === 0) {
      toast.error("No failed tickets found");
      return;
    }

    const confirmed = window.confirm(
      `Send follow-up emails to all ${allFailedTickets.length} failed tickets? This action cannot be undone.`
    );

    if (!confirmed) return;

    try {
      setBulkLoading(true);

      const response = await fetch("/api/tickets/follow-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sendToAll: true,
          days: 30, // Send to failed tickets from last 30 days
          retryPaymentLink: "https://pyconsenegambia.org/tickets"
        })
      });

      const result: BulkFollowUpResponse = await response.json();

      if (result.success && result.data) {
        const { emailsSent, errors, ticketsProcessed, successRate } =
          result.data;

        if (successRate === 100) {
          toast.success(
            `Successfully sent follow-up emails to all ${emailsSent} failed tickets`
          );
        } else {
          toast.warning(
            `Sent ${emailsSent} out of ${ticketsProcessed} follow-up emails (${successRate}% success rate)`
          );
        }

        setSelectedTickets(new Set());
      } else {
        toast.error(
          `Failed to send follow-up emails: ${result.error || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Error sending follow-up to all failed tickets:", error);
      toast.error("Failed to send follow-up emails. Please try again.");
    } finally {
      setBulkLoading(false);
    }
  };

  // Handle resend confirmation (for completed tickets) - Direct send without confirmation
  const handleResendConfirmation = async (
    ticketId: string,
    customerName: string
  ): Promise<void> => {
    try {
      setLoadingStates((prev) => ({ ...prev, [ticketId]: true }));

      const response = await fetch("/api/tickets/resend-confirmation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ticketId })
      });

      const result: SingleFollowUpResponse = await response.json();

      if (result.success) {
        toast.success(`Confirmation email sent to ${customerName}`);
      } else {
        toast.error(
          `Failed to send confirmation: ${result.error || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Error sending confirmation:", error);
      toast.error("Failed to send confirmation. Please try again.");
    } finally {
      setLoadingStates((prev) => ({ ...prev, [ticketId]: false }));
    }
  };

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (value: string): void => {
    setItemsPerPage(Number(value));
    setCurrentPage(1);
  };

  // Check if all failed tickets on current page are selected
  const allFailedOnPageSelected =
    failedTicketsOnPage.length > 0 &&
    failedTicketsOnPage.every((ticket) => selectedTickets.has(ticket.id));

  const someFailedOnPageSelected = failedTicketsOnPage.some((ticket) =>
    selectedTickets.has(ticket.id)
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Ticket className="h-5 w-5" />
              Ticket Purchases
            </CardTitle>
            <CardDescription>
              Manage PyCon Senegambia 2025 ticket purchases.
              <span className="text-blue-600 ml-2">
                {filteredPurchases.length !== purchases.length ? (
                  <>
                    Showing {filteredPurchases.length} of {purchases.length}{" "}
                    purchases
                  </>
                ) : (
                  <>Total: {purchases.length} purchases</>
                )}
              </span>
              {allFailedTickets.length > 0 && (
                <span className="text-red-600 ml-2">
                  • {allFailedTickets.length} failed tickets
                </span>
              )}
            </CardDescription>
          </div>
          <ScholarshipTicketButton />
        </div>
      </CardHeader>
      <CardContent>
        {/* Bulk Actions Bar */}
        {selectedFailedTickets.length > 0 && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckSquare className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">
                {selectedFailedTickets.length} failed ticket
                {selectedFailedTickets.length !== 1 ? "s" : ""} selected
              </span>
            </div>
            <Button
              onClick={handleBulkFollowUp}
              disabled={bulkLoading}
              size="sm"
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {bulkLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send Follow-up ({selectedFailedTickets.length})
                </>
              )}
            </Button>
          </div>
        )}

        {/* Search and Filters */}
        <div className="flex items-center justify-between mb-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search by name, email, or transaction ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            {allFailedTickets.length > 0 && (
              <>
                <Button
                  onClick={handleSendToAllFailed}
                  disabled={bulkLoading}
                  variant="outline"
                  size="sm"
                  className="text-red-600 border-red-300 hover:bg-red-50"
                >
                  {bulkLoading ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 mr-2" />
                  )}
                  Send to All Failed ({allFailedTickets.length})
                </Button>
                <div className="w-px h-6 bg-gray-300 mx-2" />
              </>
            )}
            <span className="text-sm text-gray-600">Show:</span>
            <Select
              value={itemsPerPage.toString()}
              onValueChange={handleItemsPerPageChange}
            >
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sm text-gray-600">per page</span>
          </div>
        </div>

        {/* Table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                {failedTicketsOnPage.length > 0 && (
                  <Checkbox
                    checked={allFailedOnPageSelected}
                    onCheckedChange={(checked) =>
                      handleSelectAll(checked as boolean)
                    }
                    {...(someFailedOnPageSelected && !allFailedOnPageSelected
                      ? { "data-indeterminate": true }
                      : {})}
                  />
                )}
              </TableHead>
              <TableHead>Customer Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Ticket Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Payment Status</TableHead>
              <TableHead className="hidden md:table-cell">
                Transaction ID
              </TableHead>
              <TableHead className="hidden md:table-cell">
                Purchase Date
              </TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedPurchases.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8">
                  <div className="flex flex-col items-center gap-2">
                    <Ticket className="h-8 w-8 text-gray-400" />
                    <p className="text-gray-500">
                      {purchases.length === 0
                        ? "No ticket purchases found."
                        : "No purchases match your search."}
                    </p>
                    <p className="text-sm text-gray-400">
                      {purchases.length === 0
                        ? "No tickets have been purchased yet."
                        : "Try a different search term."}
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              paginatedPurchases.map((purchase) => (
                <TableRow key={purchase.id}>
                  <TableCell>
                    {isFailedTicket(purchase.paymentStatus) && (
                      <Checkbox
                        checked={selectedTickets.has(purchase.id)}
                        onCheckedChange={(checked) =>
                          handleTicketSelect(purchase.id, checked as boolean)
                        }
                      />
                    )}
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-400" />
                      {purchase.customerName}
                    </div>
                  </TableCell>
                  <TableCell>{purchase.customerEmail}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{purchase.ticketType}</Badge>
                  </TableCell>
                  <TableCell>
                    {formatCurrency(purchase.amount, purchase.currency)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Badge
                        className={getStatusBadgeColor(purchase.paymentStatus)}
                      >
                        {purchase.paymentStatus}
                      </Badge>
                      {isFailedTicket(purchase.paymentStatus) && (
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {purchase.transactionReference}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      {formatDate(purchase.createdAt)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                          disabled={loadingStates[purchase.id]}
                        >
                          {loadingStates[purchase.id] ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <MoreHorizontal className="h-4 w-4" />
                          )}
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem className="cursor-pointer">
                          <Ticket className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />

                        {isFailedTicket(purchase.paymentStatus) ? (
                          <DropdownMenuItem
                            className="cursor-pointer text-red-600 focus:text-red-600"
                            onClick={() =>
                              handleSendFollowUp(
                                purchase.id,
                                purchase.customerName
                              )
                            }
                            disabled={loadingStates[purchase.id]}
                          >
                            <AlertTriangle className="mr-2 h-4 w-4" />
                            {loadingStates[purchase.id]
                              ? "Sending..."
                              : "Send Follow-up"}
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem
                            className="cursor-pointer text-blue-600 focus:text-blue-600"
                            onClick={() =>
                              handleResendConfirmation(
                                purchase.id,
                                purchase.customerName
                              )
                            }
                            disabled={loadingStates[purchase.id]}
                          >
                            <Mail className="mr-2 h-4 w-4" />
                            {loadingStates[purchase.id]
                              ? "Sending..."
                              : "Send Confirmation"}
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-600">
              Showing {startIndex + 1} to{" "}
              {Math.min(endIndex, filteredPurchases.length)} of{" "}
              {filteredPurchases.length} results
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNumber: number;
                  if (totalPages <= 5) {
                    pageNumber = i + 1;
                  } else if (currentPage <= 3) {
                    pageNumber = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNumber = totalPages - 4 + i;
                  } else {
                    pageNumber = currentPage - 2 + i;
                  }

                  return (
                    <Button
                      key={pageNumber}
                      variant={
                        currentPage === pageNumber ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => handlePageChange(pageNumber)}
                      className="w-8 h-8"
                    >
                      {pageNumber}
                    </Button>
                  );
                })}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
      <ScholarshipTicketModal />
    </Card>
  );
};

export default TicketPurchasesTable;
