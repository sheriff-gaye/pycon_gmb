'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { toast } from 'sonner';
import { useSponsorModal } from '@/hooks/sponsors';
import { useConfirmModal, ConfirmAction } from '@/hooks/confirm';
import { SponsorModal } from '@/modals/sponsors-modal';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Building2, Search, MoreHorizontal, Globe, Edit, Trash2, Eye, EyeOff, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, RefreshCw } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Image from 'next/image';
import ConfirmActionModal from '@/modals/confirm-action';

interface Sponsor {
  id: string;
  name: string;
  logo: string;
  website: string | null;
  description: string | null;
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

interface SponsorsTableProps {
  sponsors: Sponsor[];
}

const SponsorsTable: React.FC<SponsorsTableProps> = ({ sponsors: initialSponsors }) => {
  const [sponsors, setSponsors] = useState<Sponsor[]>(initialSponsors);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [refreshLoading, setRefreshLoading] = useState(false);
  const { onOpen } = useSponsorModal();
  const confirmModal = useConfirmModal();

  // Update sponsors when initialSponsors changes
  useEffect(() => {
    setSponsors(initialSponsors);
  }, [initialSponsors]);


  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusBadgeColor = (isActive: boolean) => {
    return isActive
      ? 'bg-green-100 text-green-800 border-green-200'
      : 'bg-red-100 text-red-800 border-red-200';
  };

  const filteredSponsors = useMemo(() => {
    if (!searchTerm) return sponsors;

    return sponsors.filter(sponsor => {
      const searchLower = searchTerm.toLowerCase();
      return (
        sponsor.name.toLowerCase().includes(searchLower) ||
        (sponsor.description && sponsor.description.toLowerCase().includes(searchLower)) ||
        (sponsor.website && sponsor.website.toLowerCase().includes(searchLower))
      );
    });
  }, [sponsors, searchTerm]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredSponsors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedSponsors = filteredSponsors.slice(startIndex, endIndex);

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1);
  };

  // Open confirm modal for sponsor actions
  const openConfirmModal = (sponsor: Sponsor, action: ConfirmAction) => {
    confirmModal.onOpen({
      userId: sponsor.id,
      userName: sponsor.name,
      userEmail: sponsor.website || 'No website provided', // Using website as fallback since sponsors don't have email
      action
    });
  };

  // Handle confirmed actions from the modal
  const handleConfirmedAction = async (sponsorId: string, action: ConfirmAction) => {
    setActionLoading(sponsorId);
    
    try {
      if (action === 'delete') {
        await handleDeleteConfirmed(sponsorId);
      } else if (action === 'activate' || action === 'deactivate') {
        await handleToggleStatusConfirmed(sponsorId, action === 'activate');
      }
    } finally {
      setActionLoading(null);
    }
  };

  // Handle confirmed delete
  const handleDeleteConfirmed = async (id: string) => {
    try {
      const response = await fetch(`/api/sponsors/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Sponsor deleted successfully');
        setSponsors(sponsors.filter(sponsor => sponsor.id !== id));
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || 'Failed to delete sponsor');
      }
    } catch (error) {
      toast.error('Failed to delete sponsor');
    }
  };

  // Handle confirmed status toggle
  const handleToggleStatusConfirmed = async (id: string, shouldActivate: boolean) => {
    const sponsor = sponsors.find(s => s.id === id);
    if (!sponsor) return;

    try {
      const response = await fetch(`/api/sponsors/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...sponsor,
          isActive: shouldActivate,
        }),
      });

      if (response.ok) {
        toast.success(`Sponsor ${shouldActivate ? 'activated' : 'deactivated'} successfully`);
        setSponsors(sponsors.map(s => s.id === id ? { ...s, isActive: shouldActivate } : s));
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || 'Failed to update sponsor status');
      }
    } catch (error) {
      toast.error('Failed to update sponsor status');
    }
  };

  // Handle add new sponsor
  const handleAdd = () => {
    onOpen();
  };

  // Handle edit sponsor
  const handleEdit = (sponsor: Sponsor) => {
    onOpen(sponsor, true);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Sponsors Management
              </CardTitle>
              <CardDescription>
                Manage PyCon Senegambia 2025 sponsors and partnerships.
                <span className="text-blue-600 ml-2">
                  {filteredSponsors.length !== sponsors.length ? (
                    <>Showing {filteredSponsors.length} of {sponsors.length} sponsors</>
                  ) : (
                    <>Total: {sponsors.length} sponsors</>
                  )}
                </span>
              </CardDescription>
            </div>
            <div className="flex gap-2">
             
              <Button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700">
                Add New Sponsor
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search and Filters */}
          <div className="flex items-center justify-between mb-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by name, description, or website..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Show:</span>
              <Select value={itemsPerPage.toString()} onValueChange={handleItemsPerPageChange}>
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
                <TableHead>Logo</TableHead>
                <TableHead>Sponsor Name</TableHead>
                <TableHead>Website</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Order</TableHead>
                <TableHead className="hidden md:table-cell">Created</TableHead>
                <TableHead className="hidden md:table-cell">Updated</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedSponsors.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    <div className="flex flex-col items-center gap-2">
                      <Building2 className="h-8 w-8 text-gray-400" />
                      <p className="text-gray-500">
                        {sponsors.length === 0 ? 'No sponsors found.' : 'No sponsors match your search.'}
                      </p>
                      <p className="text-sm text-gray-400">
                        {sponsors.length === 0 ? 'Add your first sponsor to get started.' : 'Try a different search term.'}
                      </p>
                      {sponsors.length === 0 && (
                        <Button onClick={handleAdd} className="mt-2">
                          Add Your First Sponsor
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedSponsors.map((sponsor) => (
                  <TableRow key={sponsor.id}>
                    <TableCell>
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden relative">
                        {actionLoading === sponsor.id ? (
                          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                        ) : (
                          <Image
                            src={sponsor.logo}
                            alt={sponsor.name}
                            width={48}
                            height={48}
                            className="max-w-full max-h-full object-contain"
                            onError={(e) => {
                              console.error('Failed to load sponsor logo:', sponsor.logo);
                              (e.target as HTMLImageElement).src = '/placeholder-logo.png';
                              (e.target as HTMLImageElement).alt = 'Logo unavailable';
                            }}
                            placeholder="blur"
                            blurDataURL="/placeholder-logo.png"
                          />
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      <div>
                        <div className="font-semibold">{sponsor.name}</div>
                        {sponsor.description && (
                          <div className="text-sm text-gray-500 line-clamp-2">
                            {sponsor.description}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {sponsor.website ? (
                        <a
                          href={sponsor.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                        >
                          <Globe className="h-4 w-4" />
                          Visit Site
                        </a>
                      ) : (
                        <span className="text-gray-400">No website</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusBadgeColor(sponsor.isActive)}>
                        {sponsor.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant="outline">{sponsor.order}</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">
                          {formatDate(sponsor.createdAt)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">
                          {formatDate(sponsor.updatedAt)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                            disabled={actionLoading === sponsor.id}
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() => handleEdit(sponsor)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Sponsor
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() => openConfirmModal(sponsor, sponsor.isActive ? 'deactivate' : 'activate')}
                          >
                            {sponsor.isActive ? (
                              <>
                                <EyeOff className="mr-2 h-4 w-4" />
                                Deactivate
                              </>
                            ) : (
                              <>
                                <Eye className="mr-2 h-4 w-4" />
                                Activate
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="cursor-pointer text-red-600 focus:text-red-600"
                            onClick={() => openConfirmModal(sponsor, "delete")}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
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
                Showing {startIndex + 1} to {Math.min(endIndex, filteredSponsors.length)} of {filteredSponsors.length} results
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
                    let pageNumber;
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
                        variant={currentPage === pageNumber ? 'default' : 'outline'}
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
        <SponsorModal />
      </Card>
      
      {/* Confirm Action Modal */}
      <ConfirmActionModal onConfirm={handleConfirmedAction} />
    </>
  );
};

export default SponsorsTable;