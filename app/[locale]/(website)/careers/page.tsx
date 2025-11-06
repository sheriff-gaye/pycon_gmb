"use client";
import { usePathname } from "next/navigation";
import CareersPage from "../components/careers";

const Speakers = () => {
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1] || "en";
  return (
    <div>
      <CareersPage   />
    </div>
  );
};

export default Speakers;
