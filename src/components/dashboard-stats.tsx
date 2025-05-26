"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Users, Activity, TrendingUp, Eye, Clock } from "lucide-react"

const stats = [
  {
    title: "Total Lokasi",
    value: "2,847",
    description: "+12%",
    icon: MapPin,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "Pengguna Aktif",
    value: "1,234",
    description: "+8%",
    icon: Users,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    title: "Views Hari Ini",
    value: "8,945",
    description: "+23%",
    icon: Eye,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  {
    title: "Avg. Session",
    value: "4m 32s",
    description: "Durasi",
    icon: Clock,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    title: "Real-time",
    value: "89",
    description: "Online",
    icon: Activity,
    color: "text-red-600",
    bgColor: "bg-red-50",
  },
  {
    title: "Pertumbuhan",
    value: "15.2%",
    description: "Bulanan",
    icon: TrendingUp,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
  },
]

export function DashboardStats() {
  return (
    <div className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
      {stats.map((stat) => (
        <Card key={stat.title} className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium">{stat.title}</CardTitle>
            <div className={`p-1.5 rounded-md ${stat.bgColor}`}>
              <stat.icon className={`h-3 w-3 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="text-lg font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
