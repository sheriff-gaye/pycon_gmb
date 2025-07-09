import CTA from "./components/call_to_action";
import Contact from "./components/contact_us";
import FAQ from "./components/faq";
import Hero from "./components/hero";
import TicketPricing from "./components/pricing";

export default function Home() {
  return (

    <div>
     
      <Hero/>
      <CTA/>
      <TicketPricing/>
      <FAQ/>
      <Contact/>
      
      
    </div>

   
   
  );
}
