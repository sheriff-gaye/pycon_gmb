"use client"
import { usePathname } from "next/navigation";
import CTA from "./components/call_to_action";
import Contact from "./components/contact_us";
import FAQ from "./components/faq";
import Hero from "./components/hero";
import TicketPricing from "./components/pricing";
import Sponsors from "./components/sponsors";

export default function Home() {

   const pathname = usePathname();
    const currentLocale = pathname.split('/')[1] || 'en';
  return (

    <div>
     
      <Hero currentLocale={currentLocale}/>
      <Sponsors  currentLocale={currentLocale}/>
      <CTA currentLocale={currentLocale}/>
      <TicketPricing currentLocale={currentLocale}/>
      <FAQ currentLocale={currentLocale}/>
      <Contact currentLocale={currentLocale}/>
      
      
    </div>

   
   
  );
}
