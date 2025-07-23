"use client";

import { usePathname } from "next/navigation";
import CallForProposals from "../components/call_for_proposal";

const Proposals = () => {
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1] || "en";
  return (
    <div>
      <CallForProposals currentLocale={currentLocale} />
    </div>
  );
};

export default Proposals;
