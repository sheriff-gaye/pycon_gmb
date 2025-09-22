'use server';

import { getAllSponsors } from "@/app/actions/sponsors";
import SponsorsTable from "./table";

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

const SponsorsPage = async () => {
  const result = await getAllSponsors();
  const sponsors: Sponsor[] = result.success && result.data ? result.data : [];

  return (
    <div className="p-4 mt-4">
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <SponsorsTable sponsors={sponsors} />
      </main>
    </div>
  );
};

export default SponsorsPage;