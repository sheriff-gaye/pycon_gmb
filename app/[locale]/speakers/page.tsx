"use client";
import { usePathname } from "next/navigation";
import CallForSpeakers from "../components/call_for_speakers";

const Speakers = () => {
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1] || "en";
  return (
    <div>
      <CallForSpeakers currentLocale={currentLocale} />
    </div>
  );
};

export default Speakers;
