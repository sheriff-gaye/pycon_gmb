"use client";
import React from "react";
import {
  Database,
  Server,
  LucideIcon,
  Users,
  Ticket,
  Handshake,
  
 
} from "lucide-react";
import SiderBarItem from "./sidebar-item";

interface Route {
  icon: LucideIcon;
  label: string;
  href: string;
}

const admin: Route[] = [
  {
    icon: Database,
    label: "Dashboard",
    href: "/dashboard"
  },

  {
    icon: Ticket,
    label: "Tickets",
    href: "/dashboard/ticket"
  },
  {
    icon: Users,
    label: "Members",
    href: "/dashboard/members"
  },
    {
    icon: Handshake,
    label: "Sponsors",
    href: "/dashboard/sponsors"
  },
  //  {
  //   icon:BookText ,
  //   label: "Blog",
  //   href: "/dashboard/blog"
  // },
  {
    icon: Server,
    label: "System Logs",
    href: "/dashboard/logs"
  },

];




const SideBarRoutes= () => {
 

  

  return (
    <div className="flex flex-col w-full">
    
     
      {admin.map((route) => (
        <SiderBarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        
        />
      ))}
    </div>
  );
};

export default SideBarRoutes;