"use client";

import ConfirmActionModal from "@/modals/confirm-action";
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
     
    </>
  );
};
