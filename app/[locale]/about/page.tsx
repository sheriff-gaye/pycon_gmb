"use client";

import { usePathname } from "next/navigation";
import About from "../components/about_us";

const AboutUs = () => {
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1] || "en";
  return (
    <div>
      <About currentLocale={currentLocale} />
    </div>
  );
};

export default AboutUs;
