import { listContacts } from '@/app/actions/list-newsletters'
import React from 'react'
import MembersTable from './table';

const MembersPage = async () => {
  const members = await listContacts();
  const membersData = members?.data?.data || [];

  return (
    <div className="p-4 mt-4">
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <MembersTable members={membersData} />
      </main>
    </div>
  )
}

export default MembersPage