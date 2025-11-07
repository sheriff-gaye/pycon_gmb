"use client";
import React from "react";
import {
  Database,
  Server,
  LucideIcon,
  Users,
  Ticket,
  Handshake,
  ListCheckIcon,
  ShoppingBasket,
  MicVocalIcon,
  HelpCircleIcon
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

  {
    icon: MicVocalIcon,
    label: "Speakers",
    href: "/dashboard/speakers"
  },

  {
    icon: HelpCircleIcon,
    label: "Front Desk",
    href: "/dashboard/frontdesk"
  },
    {
    icon:ListCheckIcon ,
    label: "Products",
    href: "/dashboard/products"
  },
   {
    icon:ShoppingBasket ,
    label: "Orders",
    href: "/dashboard/orders"
  },
  {
    icon: Server,
    label: "System Logs",
    href: "/dashboard/logs"
  }
];

const SideBarRoutes = () => {
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
