"use client"
import { usePathname } from "next/navigation";
import Sponsorship from "../components/call_for_sponors";

const SponorsPage = () => {
    const pathname = usePathname();
      const currentLocale = pathname.split("/")[1] || "en";
  return (
    <div>
      <Sponsorship  currentLocale={currentLocale}/>
    </div>
  );
};

export default SponorsPage;
