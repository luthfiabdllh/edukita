"use client"

import { School, Map, Settings, Home, LogOut } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

interface AppSidebarProps {
  currentPage: string
  onPageChange: (page: string) => void
  onSettingsClick: () => void
}

export function AppSidebar({ currentPage, onPageChange, onSettingsClick }: AppSidebarProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const isAdmin = session?.user?.role === "admin";

  // Menu items
  const commonItems = [
    {
      title: "Dashboard",
      url: "dashboard",
      icon: Home,
    },
    {
      title: "Peta Sekolah",
      url: "map",
      icon: Map,
    },
  ]

  const adminItems = [
    {
      title: "Data Sekolah",
      url: "data",
      icon: School,
    },
  ];

  const items = isAdmin ? [...commonItems, ...adminItems] : commonItems;

  const settingsItems = [
    {
      title: "Pengaturan",
      url: "settings",
      icon: Settings,
      onClick: onSettingsClick,
    },
  ]

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/auth/signin');
  };

  useEffect(() => {
    if (currentPage === 'data' && !isAdmin && status !== 'loading') {
      onPageChange('dashboard');
      router.push('/dashboard');
    }
  }, [currentPage, isAdmin, status, onPageChange, router]);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton  size="lg" asChild className="hover:bg-transparent">
              <Link href="#" className="flex items-center gap-2">
                <Image
                  src="/logo.svg"
                  alt="EduKita Logo"
                  width={128}
                  height={128}
                  className="size-16 logo-light"
                />
                <Image
                  src="/logo_light.svg"
                  alt="EduKita Logo"
                  width={128}
                  height={128}
                  className="size-16 logo-dark"
                />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Utama</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={currentPage === item.url}
                    tooltip={item.title}
                    onClick={() => onPageChange(item.url)}
                  >
                    <button className="flex items-center gap-2 w-full">
                      <item.icon />
                      <span>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Pengaturan</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    onClick={item.onClick || (() => onPageChange(item.url))}
                  >
                    <button className="flex items-center gap-2 w-full">
                      <item.icon />
                      <span>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
            {session ? (
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                <AvatarFallback className="rounded-lg">
                  {session.user?.name?.substring(0, 2) || "?"}
                </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{session.user?.name}</span>
                <span className="truncate text-xs">{isAdmin ? "Admin" : "User"}</span>
                </div>
                <button 
                onClick={handleLogout}
                className="ml-2 p-1 rounded-md hover:bg-muted"
                title="Logout"
                >
                <LogOut size={16} />
                </button>
              </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
            ) : null}
          </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
