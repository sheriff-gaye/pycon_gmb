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
  
  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

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
        "group flex items-center w-full text-sm font-medium pl-6 transition-all duration-200 ease-in-out",
        "hover:bg-slate-100 dark:hover:bg-slate-800",
        "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent",
        isActive && [
          "bg-blue-600 dark:bg-blue-900/20 " ,
         
          "text-blue-700 dark:text-blue-300"
        ],
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
                ? "text-blue-600 dark:text-blue-400" 
                : "text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200",
              disabled && "opacity-50"
            )}
          />
          <span 
            className={cn(
              "transition-colors duration-200",
              isActive 
                ? "text-blue-700 dark:text-blue-300 font-semibold" 
                : "text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-slate-100",
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
              "min-w-[1.25rem] h-5",
              isActive
                ? "bg-blue-600 text-white"
                : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
            )}
          >
            {badge}
          </span>
        )}
      </div>

      {/* Active indicator line */}
      {isActive && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r-full" />
      )}
    </button>
  );
};

export default SiderBarItem;