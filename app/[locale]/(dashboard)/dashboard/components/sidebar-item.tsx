"use client";
import { LucideIcon } from "lucide-react";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface SiderBarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
  disabled?: boolean;
  badge?: string | number;
}

const SiderBarItem = ({ 
  icon: Icon, 
  label, 
  href, 
  disabled = false,
  badge 
}: SiderBarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();
  
  // More precise isActive logic
  const isActive = pathname?.endsWith(href) || pathname === href;

  const onClick = () => {
    if (!disabled) {
      router.push(href);
    }
  };

  return (
    <button
      onClick={onClick}
      type="button"
      disabled={disabled}
      className={cn(
        "group flex items-center w-full text-sm font-medium pl-6 transition-all duration-200 ease-in-out relative",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        isActive 
          ? "bg-blue-600 dark:bg-blue-600  " 
          : "disabled:hover:bg-transparent",
        !isActive && "text-slate-600 dark:text-slate-300"
      )}
      aria-current={isActive ? "page" : undefined}
      title={disabled ? `${label} (Disabled)` : label}
    >
      <div className="flex items-center justify-between w-full py-3 pr-6">
        <div className="flex items-center gap-x-3">
          <Icon
            size={20}
            className={cn(
              "transition-colors duration-200",
              "group-hover:scale-105 transition-transform",
              isActive 
                ? "text-white" 
                : "text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200",
              disabled && "opacity-50"
            )}
          />
          <span 
            className={cn(
              "transition-colors duration-200",
              isActive 
                ? "text-white font-semibold" 
                : "text-slate-600 dark:text-slate-300",
              disabled && "opacity-50"
            )}
          >
            {label}
          </span>
        </div>
        
        {/* Badge for notifications or counts */}
        {badge && !disabled && (
          <span 
            className={cn(
              "inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none rounded-full",
              "min-w-5 h-5",
              isActive
                ? "bg-white text-blue-600"
                : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
            )}
          >
            {badge}
          </span>
        )}
      </div>

      {/* Active indicator line */}
      {isActive && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full" />
      )}
    </button>
  );
};

export default SiderBarItem;