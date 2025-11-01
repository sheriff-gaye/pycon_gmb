import React from 'react'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import StaffAddButton from './add'
import StaffTable from './table'
import { StaffModal } from '@/modals/frontdesk'
import { getAllStaff } from '@/app/actions/frontdesk'

const StaffPage = async () => {
  const result = await getAllStaff();
  const staffData = result?.data || [];

  return (
    <>
      <div className="p-4 mt-4">
      


      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Staff Management</h1>
            <p className="text-sm text-gray-600 mt-1">
              Manage staff members who can check-in attendees at the conference
            </p>
          </div>
          <StaffAddButton />
        </div>
          <StaffTable staff={staffData} />
        </main>
      </div>
    
      
      <StaffModal />
    </>
  )
}

export default StaffPage