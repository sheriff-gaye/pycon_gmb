"use client"

import VisaSection from "@/app/[locale]/components/visa";
import { usePathname } from "next/navigation";

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
