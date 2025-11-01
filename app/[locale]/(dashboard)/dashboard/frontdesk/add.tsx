'use client'

import { Button } from '@/components/ui/button'
import { useStaffModal } from '@/hooks/frontdes'
import { Plus } from 'lucide-react'

const StaffAddButton = () => {
  const { onOpen } = useStaffModal()

  return (
    <Button onClick={() => onOpen()} className="gap-2">
      <Plus className="h-4 w-4" />
      Add Staff Member
    </Button>
  )
}

export default StaffAddButton