"use client"

import * as React from "react"
import {
  Warehouse,
  ClipboardList,
  BarChart2,
  Upload,
  Files,
  Gauge,
  Map,
  Package,
  ShoppingCart,
  Wrench,
  WrenchIcon,
  Users,
  UsersIcon,
  CheckSquare,
} from "lucide-react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import { TrialAlert } from "@/components/trial-alert"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from "next/image"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "سفارشات کار",
      url: "/dashboard/work-orders",
      icon: WrenchIcon,
    },
    {
      title: "نگهداری پیشگیرانه",
      url: "/dashboard/preventive-maintenance",
      icon: Wrench,
    },
    {
      title: "تجزیه و تحلیل",
      url: "/dashboard/analytics",
      icon: BarChart2,
    },
    {
      title: "درخواست‌ها",
      url: "#",
      icon: ClipboardList,
      badge: 1,
    },
    {
      title: "مکان‌ها",
      url: "#",
      icon: Map,
    },
    {
      title: "دارایی‌ها",
      url: "#",
      icon: Warehouse,
    },
    {
      title: "قطعات و موجودی",
      url: "#",
      icon: Package,
      badge: 1,
    },
    {
      title: "سفارشات خرید",
      url: "#",
      icon: ShoppingCart,
      badge: 1,
    },
    {
      title: "سنجش‌گرها",
      url: "#",
      icon: Gauge,
    },
    {
      title: "افراد و تیم‌ها",
      url: "#",
      icon: UsersIcon,
    },
    {
      title: "فروشندگان و مشتریان",
      url: "#",
      icon: Users,
    },
    {
      title: "چک‌لیست‌ها",
      url: "#",
      icon: CheckSquare,
    },
    {
      title: "فایل‌ها",
      url: "#",
      icon: Files,
    },
    {
      title: "پورتال درخواست",
      url: "#",
      icon: ClipboardList,
    },
    {
      title: "ورود و خروج داده",
      url: "#",
      icon: Upload,
    },
  ],
  navSecondary: [],
  documents: [],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <Image src="/images/logo.svg"  alt="logo" width={32} height={32} />
                <span className="text-sm font-semibold">نرم افزار نگهداری تعمیرات سرپا</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <TrialAlert 
          daysLeft={6}
          planName="Business Plus"
          buttonText="Upgrade UpKeep"
          onUpgradeClick={() => console.log("Upgrade clicked")}
        />
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}

