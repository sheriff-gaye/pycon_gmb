"use client";

import { useEffect, useState } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import SideBar from "./components/sidebar";
import NavBar from "./components/dashboard-navbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  if (!isLoading) return null;

  return (
    <ClerkProvider>
      <div className="h-full">
        <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-[100]">
          <NavBar  />
        </div>
        <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
          <SideBar />
        </div>
        <main className="md:pl-56 pt-[80px] h-full">
          {children}
          <Toaster richColors />
        </main>
      </div>
    </ClerkProvider>
  );
}