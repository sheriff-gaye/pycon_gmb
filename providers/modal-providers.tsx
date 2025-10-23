"use client";

import ConfirmActionModal, { ConfirmAction } from "@/modals/confirm-action";
import { SpeakerModal } from "@/modals/speakers";
import { SponsorModal } from "@/modals/sponsors-modal";
import { useEffect, useState } from "react";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }

  return (
    <>
      <SponsorModal />
    
      <SpeakerModal/>
      
     
    </>
  );
};
