"use client"

import { School, Map, Settings, Home } from "lucide-react"

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
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

interface AppSidebarProps {
  currentPage: string
  onPageChange: (page: string) => void
  onSettingsClick: () => void
}

export function AppSidebar({ currentPage, onPageChange, onSettingsClick }: AppSidebarProps) {
  const { theme, resolvedTheme } = useTheme();
  

  const [logoSrc, setLogoSrc] = useState('/logo.svg');
  
  useEffect(() => {
    const isDark = theme === 'dark' || resolvedTheme === 'dark';
    setLogoSrc(isDark ? '/logo_light.svg' : '/logo.svg');
  }, [theme, resolvedTheme]);

  // Menu items
  const items = [
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
    {
      title: "Data Sekolah",
      url: "data",
      icon: School,
    },
  ]

  const settingsItems = [
    {
      title: "Pengaturan",
      url: "settings",
      icon: Settings,
      onClick: onSettingsClick,
    },
  ]

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton  size="lg" asChild className="hover:bg-transparent">
              <Link href="#" className="flex items-center gap-2">
                <Image
                  src={logoSrc}
                  alt="Logo"
                  width={24}
                  height={24}
                  className="size-16"
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
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#" className="flex items-center gap-2">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                  <AvatarFallback className="rounded-lg">DY</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Dinas Pendidikan</span>
                  <span className="truncate text-xs">DIY</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
