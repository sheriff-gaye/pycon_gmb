'use client'

import React, { useState, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { MoreHorizontal, Users, UserX, Trash2, Calendar, Search, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Edit, Key, CheckCircle2 } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import axios from 'axios'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useStaffModal } from '@/hooks/frontdes'

interface Staff {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "ADMIN" | "FRONTDESK" | "SECURITY";
  isActive: boolean;
  lastLogin: string | null;
  createdAt: string;
  updatedAt: string;
  _count?: {
    checkedInTickets: number;
  };
}

interface StaffTableProps {
  staff: Staff[];
}

const StaffTable: React.FC<StaffTableProps> = ({ staff }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const { onOpen } = useStaffModal()
  const router = useRouter()

  const formatDate = (date: string | null) => {
    if (!date) return 'Never';
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatDateTime = (date: string | null) => {
    if (!date) return 'Never';
    const dateObj = new Date(date);
    return dateObj.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadgeColor = (isActive: boolean) => {
    return isActive 
      ? 'bg-green-100 text-green-800 border-green-200' 
      : 'bg-red-100 text-red-800 border-red-200';
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'FRONTDESK':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'SECURITY':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return 'Admin';
      case 'FRONTDESK':
        return 'Front Desk';
      case 'SECURITY':
        return 'Security';
      default:
        return role;
    }
  };

  // Filter staff based on search term
  const filteredStaff = useMemo(() => {
    if (!searchTerm) return staff;
    
    return staff.filter(member => {
      const fullName = `${member.firstName} ${member.lastName}`.toLowerCase();
      const email = member.email.toLowerCase();
      const role = member.role.toLowerCase();
      const search = searchTerm.toLowerCase();
      
      return (
        fullName.includes(search) ||
        email.includes(search) ||
        role.includes(search)
      );
    });
  }, [staff, searchTerm]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredStaff.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedStaff = filteredStaff.slice(startIndex, endIndex);

  // Reset to first page when search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1);
  };

  const handleEdit = (member: Staff) => {
    onOpen(member, true);
  };

  const handleToggleStatus = async (member: Staff) => {
    try {
      await axios.patch(`/api/admin/staff/${member.id}`, {
        isActive: !member.isActive
      });
      toast.success(`Staff member ${!member.isActive ? 'activated' : 'deactivated'} successfully`);
      router.refresh();
    } catch (error) {
      toast.error('Failed to update staff member status');
    }
  };

  const handleDelete = async (member: Staff) => {
    if (!confirm(`Are you sure you want to deactivate ${member.firstName} ${member.lastName}? This action will prevent them from accessing the system.`)) {
      return;
    }

    try {
      setIsDeleting(member.id);
      await axios.delete(`/api/admin/staff/${member.id}`);
      toast.success('Staff member deactivated successfully');
      router.refresh();
    } catch (error) {
      toast.error('Failed to deactivate staff member');
    } finally {
      setIsDeleting(null);
    }
  };

  const handleResetPassword = async (member: Staff) => {
    if (!confirm(`Reset password for ${member.firstName} ${member.lastName}? A new password will be emailed to them.`)) {
      return;
    }

    try {
      const response = await axios.post(`/api/admin/staff/${member.id}/reset-password`);
      
      if (response.data.warning === "EMAIL_FAILED") {
        toast.warning(response.data.message, {
          description: `New password: ${response.data.data.newPassword}`,
          duration: 10000,
        });
      } else {
        toast.success(response.data.message);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to reset password');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Staff Management
        </CardTitle>
        <CardDescription>
          Manage staff members who can check-in attendees at the conference.
          <span className="text-blue-600 ml-2">
            {filteredStaff.length !== staff.length ? (
              <>Showing {filteredStaff.length} of {staff.length} members</>
            ) : (
              <>Total: {staff.length} members</>
            )}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Search and Filters */}
        <div className="flex items-center justify-between mb-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search by name, email, or role..."
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
              </SelectContent>
            </Select>
            <span className="text-sm text-gray-600">per page</span>
          </div>
        </div>

        {/* Table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="hidden md:table-cell">Role</TableHead>
              <TableHead className="hidden md:table-cell">Check-ins</TableHead>
              <TableHead className="hidden lg:table-cell">Last Login</TableHead>
              <TableHead className="hidden lg:table-cell">Joined Date</TableHead>
              <TableHead className="hidden md:table-cell">Status</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedStaff.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
                  <div className="flex flex-col items-center gap-2">
                    <Users className="h-8 w-8 text-gray-400" />
                    <p className="text-gray-500">
                      {staff.length === 0 ? 'No staff members found.' : 'No staff match your search.'}
                    </p>
                    <p className="text-sm text-gray-400">
                      {staff.length === 0 ? 'Add your first staff member to get started!' : 'Try a different search term.'}
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              paginatedStaff.map((member) => {
                return (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium">
                      {member.firstName} {member.lastName}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-gray-600">
                        {member.email}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge className={getRoleBadgeColor(member.role)}>
                        {getRoleLabel(member.role)}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-gray-400" />
                        <span className="font-medium">
                          {member._count?.checkedInTickets || 0}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <div className="text-sm text-gray-600">
                        {formatDateTime(member.lastLogin)}
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        {formatDate(member.createdAt)}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge className={getStatusBadgeColor(member.isActive)}>
                        {member.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                            disabled={isDeleting === member.id}
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          
                          <DropdownMenuItem 
                            className="cursor-pointer"
                            onClick={() => handleEdit(member)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Details
                          </DropdownMenuItem>
                          
                          <DropdownMenuItem 
                            className="cursor-pointer"
                            onClick={() => handleResetPassword(member)}
                          >
                            <Key className="mr-2 h-4 w-4" />
                            Reset Password
                          </DropdownMenuItem>
                          
                          <DropdownMenuSeparator />
                          
                          <DropdownMenuItem 
                            className={`cursor-pointer ${
                              member.isActive 
                                ? 'text-orange-600 focus:text-orange-600' 
                                : 'text-green-600 focus:text-green-600'
                            }`}
                            onClick={() => handleToggleStatus(member)}
                          >
                            <UserX className="mr-2 h-4 w-4" />
                            {member.isActive ? 'Deactivate' : 'Activate'}
                          </DropdownMenuItem>
                          
                          <DropdownMenuSeparator />
                          
                          <DropdownMenuItem 
                            className="text-red-600 focus:text-red-600 cursor-pointer"
                            onClick={() => handleDelete(member)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Remove
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-600">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredStaff.length)} of {filteredStaff.length} results
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
              
              {/* Page Numbers */}
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
                      variant={currentPage === pageNumber ? "default" : "outline"}
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
    </Card>
  );
};

export default StaffTable;