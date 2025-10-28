'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { toast } from 'sonner';
import { useSpeakerModal } from '@/hooks/speakers';
import { useConfirmModal, ConfirmAction } from '@/hooks/confirm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { User, Search, MoreHorizontal, Edit, Trash2, Eye, EyeOff, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Star, Mic, MapPin } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Image from 'next/image';
import ConfirmActionModal from '@/modals/confirm-action';
import { SpeakerModal } from '@/modals/speakers';
import { useRouter } from 'next/navigation';

interface Speaker {
  id: string;
  name: string;
  title: string;
  company: string;
  location: string;
  image: string;
  bio: string;
  expertise: string[];
  isKeynote: boolean;
  isActive: boolean;
  order: number;
  sessionTitle: string;
  sessionDescription: string;
  sessionDuration: string;
  sessionTrack: string;
  sessionLevel: string;
  linkedin: string | null;
  twitter: string | null;
  github: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface SpeakersTableProps {
  speakers: Speaker[];
}

const SpeakersTable: React.FC<SpeakersTableProps> = ({ speakers: initialSpeakers }) => {
  const [speakers, setSpeakers] = useState<Speaker[]>(initialSpeakers);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const { onOpen } = useSpeakerModal();
  const confirmModal = useConfirmModal();

  const router = useRouter();

  useEffect(() => {
    setSpeakers(initialSpeakers);
  }, [initialSpeakers]);

  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusBadgeColor = (isActive: boolean) => {
    return isActive
      ? 'bg-green-100 text-green-800 border-green-200'
      : 'bg-red-100 text-red-800 border-red-200';
  };

  const getKeynoteBadgeColor = (isKeynote: boolean) => {
    return isKeynote
      ? 'bg-yellow-100 text-yellow-800 border-yellow-200'
      : 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getLevelBadgeColor = (level: string) => {
    const colors: Record<string, string> = {
      'Beginner': 'bg-green-100 text-green-800 border-green-200',
      'Intermediate': 'bg-blue-100 text-blue-800 border-blue-200',
      'Advanced': 'bg-purple-100 text-purple-800 border-purple-200',
      'All Levels': 'bg-gray-100 text-gray-800 border-gray-200',
    };
    return colors[level] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const filteredSpeakers = useMemo(() => {
    let filtered = speakers;

    if (typeFilter !== 'all') {
      filtered = filtered.filter(speaker => 
        typeFilter === 'keynote' ? speaker.isKeynote : !speaker.isKeynote
      );
    }

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(speaker =>
        speaker.name.toLowerCase().includes(searchLower) ||
        speaker.company.toLowerCase().includes(searchLower) ||
        speaker.sessionTitle.toLowerCase().includes(searchLower) ||
        speaker.sessionTrack.toLowerCase().includes(searchLower) ||
        speaker.expertise.some(exp => exp.toLowerCase().includes(searchLower))
      );
    }

    return filtered;
  }, [speakers, searchTerm, typeFilter]);

  const totalPages = Math.ceil(filteredSpeakers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedSpeakers = filteredSpeakers.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, typeFilter]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1);
  };

  const openConfirmModal = (speaker: Speaker, action: ConfirmAction) => {
    confirmModal.onOpen({
      userId: speaker.id,
      userName: speaker.name,
      userEmail: `${speaker.company} - ${speaker.sessionTrack}`,
      action
    });
  };

  const handleConfirmedAction = async (speakerId: string, action: ConfirmAction) => {
    setActionLoading(speakerId);
    
    try {
      if (action === 'delete') {
        await handleDeleteConfirmed(speakerId);
      } else if (action === 'activate' || action === 'deactivate') {
        await handleToggleStatusConfirmed(speakerId, action === 'activate');
      }
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleteConfirmed = async (id: string) => {
    try {
      const response = await fetch(`/api/speakers/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Speaker deleted successfully');
        setSpeakers(speakers.filter(speaker => speaker.id !== id));
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || 'Failed to delete speaker');
      }
    } catch (error) {
      toast.error('Failed to delete speaker');
    }
  };

  const handleToggleStatusConfirmed = async (id: string, shouldActivate: boolean) => {
    const speaker = speakers.find(s => s.id === id);
    if (!speaker) return;

    try {
      const response = await fetch(`/api/speakers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...speaker,
          isActive: shouldActivate,
        }),
      });

      if (response.ok) {
        toast.success(`Speaker ${shouldActivate ? 'activated' : 'deactivated'} successfully`);
        
        setSpeakers(speakers.map(s => s.id === id ? { ...s, isActive: shouldActivate } : s));
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || 'Failed to update speaker status');
      }
    } catch (error) {
      toast.error('Failed to update speaker status');
    }
  };

  
  const handleAdd = () => {
    onOpen();
  };

  const handleEdit = (speaker: Speaker) => {
    onOpen(speaker, true);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Speakers Management
              </CardTitle>
              <CardDescription>
                Manage PyCon Senegambia 2025 speakers and sessions.
                <span className="text-blue-600 ml-2">
                  {filteredSpeakers.length !== speakers.length ? (
                    <>Showing {filteredSpeakers.length} of {speakers.length} speakers</>
                  ) : (
                    <>Total: {speakers.length} speakers</>
                  )}
                </span>
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700">
                Add New Speaker
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4 gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by name, company, session, or expertise..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Speaker Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Speakers</SelectItem>
                  <SelectItem value="keynote">Keynote Only</SelectItem>
                  <SelectItem value="regular">Regular Only</SelectItem>
                </SelectContent>
              </Select>
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
                </SelectContent>
              </Select>
              <span className="text-sm text-gray-600">per page</span>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Speaker</TableHead>
                <TableHead>Company & Location</TableHead>
                <TableHead>Track & Level</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedSpeakers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={10} className="text-center py-8">
                    <div className="flex flex-col items-center gap-2">
                      <User className="h-8 w-8 text-gray-400" />
                      <p className="text-gray-500">
                        {speakers.length === 0 ? 'No speakers found.' : 'No speakers match your search.'}
                      </p>
                      <p className="text-sm text-gray-400">
                        {speakers.length === 0 ? 'Add your first speaker to get started.' : 'Try a different search term or filter.'}
                      </p>
                      {speakers.length === 0 && (
                        <Button onClick={handleAdd} className="mt-2">
                          Add Your First Speaker
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedSpeakers.map((speaker) => (
                  <TableRow key={speaker.id}>
                    <TableCell>
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden relative">
                        {actionLoading === speaker.id ? (
                          <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-full" />
                        ) : (
                          <Image
                            src={speaker.image}
                            alt={speaker.name}
                            width={64}
                            height={64}
                            className="max-w-full max-h-full object-cover rounded-full"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/placeholder-avatar.png';
                            }}
                          />
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      <div>
                        <div className="font-semibold">{speaker.name}</div>
                        <div className="text-sm text-gray-500">
                          {speaker.title}
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {speaker.expertise.slice(0, 2).map((skill, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs"
                            >
                              {skill}
                            </span>
                          ))}
                          {speaker.expertise.length > 2 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                              +{speaker.expertise.length - 2}
                            </span>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{speaker.company}</div>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          {speaker.location}
                        </div>
                      </div>
                    </TableCell>
                   
                    <TableCell>
                      <div className="space-y-1">
                        <Badge variant="outline" className="text-xs">
                          {speaker.sessionTrack}
                        </Badge>
                        <Badge className={getLevelBadgeColor(speaker.sessionLevel)}>
                          {speaker.sessionLevel}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getKeynoteBadgeColor(speaker.isKeynote)}>
                        {speaker.isKeynote ? (
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400" />
                            Keynote
                          </div>
                        ) : (
                          'Regular'
                        )}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusBadgeColor(speaker.isActive)}>
                        {speaker.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                   
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                            disabled={actionLoading === speaker.id}
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() => handleEdit(speaker)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Speaker
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() => openConfirmModal(speaker, speaker.isActive ? 'deactivate' : 'activate')}
                          >
                            {speaker.isActive ? (
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
                            onClick={() => openConfirmModal(speaker, "delete")}
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

          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-gray-600">
                Showing {startIndex + 1} to {Math.min(endIndex, filteredSpeakers.length)} of {filteredSpeakers.length} results
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
        <SpeakerModal />
      </Card>
      
      <ConfirmActionModal onConfirm={handleConfirmedAction} />
    </>
  );
};

export default SpeakersTable;