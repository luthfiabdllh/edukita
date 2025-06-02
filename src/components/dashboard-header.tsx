"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { School, MapPin, BarChart3, Home } from "lucide-react"

interface DashboardHeaderProps {
  currentPage: string
}

export function DashboardHeader({ currentPage }: DashboardHeaderProps) {
  const getPageInfo = (page: string) => {
    switch (page) {
      case "dashboard":
        return { title: "Dashboard", icon: Home, description: "Overview Infrastruktur Pendidikan DIY" }
      case "map":
        return { title: "Pemetaan Sekolah", icon: MapPin, description: "Visualisasi Peta Sekolah DIY" }
      case "analytics":
        return { title: "Analytics", icon: BarChart3, description: "Analisis Data Pendidikan" }
      default:
        return { title: page, icon: School, description: "Sistem Informasi Pendidikan" }
    }
  }

  const pageInfo = getPageInfo(currentPage)

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1 mr-2" />

      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage className="flex items-center gap-2">
              <pageInfo.icon className="w-4 h-4" />
              {pageInfo.title}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="ml-auto flex items-center gap-2">
        <div className="text-sm text-muted-foreground">{pageInfo.description}</div>
      </div>
    </header>
  )
}
