"use client"

import { usePathname } from "next/navigation";
import VisaSection from "../components/visa";

const Visas = () => {
  const pathname = usePathname();
        const currentLocale = pathname.split('/')[1] || 'en';
  return (
    <div>
      <VisaSection currentLocale={currentLocale} />
    </div>
  );
};

export default Visas;
