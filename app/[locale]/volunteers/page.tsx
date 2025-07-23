"use client";

import CallForVolunteers from "@/app/[locale]/components/call_for_volunteers";
import { usePathname } from "next/navigation";

const Volunteers = () => {
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1] || "en";
  return (
    <div>
      <CallForVolunteers currentLocale={currentLocale} />
    </div>
  );
};

export default Volunteers;
