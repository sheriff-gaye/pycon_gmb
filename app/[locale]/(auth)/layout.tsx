

import { ClerkProvider } from "@clerk/nextjs";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: LayoutProps) {
  return (
    <ClerkProvider>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md p-8">
          {children}
        </div>
      </div>
    </ClerkProvider>
  );
}