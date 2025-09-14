"use client";

import { usePathname } from "next/navigation";
import CallForVolunteers from "../components/call_for_volunteers";

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
