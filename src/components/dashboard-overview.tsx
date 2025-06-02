"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  School,
  Award,
  MapPin,
  Building,
  TrendingUp,
  GraduationCap,
  BookOpen,
} from "lucide-react"
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
  LabelList,
} from "recharts"
import type { School as SchoolType } from "../types/school"

// Ganti fungsi DashboardOverview dengan implementasi yang lebih baik
export function DashboardOverview({ schools }: { schools: SchoolType[] }) {
  // Calculate statistics
  const totalSchools = schools.length

  // Distribution by education level
  const educationDistribution = [
    {
      name: "SD",
      value: schools.filter((s) => s.bentuk_pendidikan === "SD").length,
      color: "#ef4444",
      percentage: ((schools.filter((s) => s.bentuk_pendidikan === "SD").length / totalSchools) * 100).toFixed(1),
    },
    {
      name: "SMP",
      value: schools.filter((s) => s.bentuk_pendidikan === "SMP").length,
      color: "#3b82f6",
      percentage: ((schools.filter((s) => s.bentuk_pendidikan === "SMP").length / totalSchools) * 100).toFixed(1),
    },
    {
      name: "SMA",
      value: schools.filter((s) => s.bentuk_pendidikan === "SMA").length,
      color: "#10b981",
      percentage: ((schools.filter((s) => s.bentuk_pendidikan === "SMA").length / totalSchools) * 100).toFixed(1),
    },
    {
      name: "SMK",
      value: schools.filter((s) => s.bentuk_pendidikan === "SMK").length,
      color: "#f59e0b",
      percentage: ((schools.filter((s) => s.bentuk_pendidikan === "SMK").length / totalSchools) * 100).toFixed(1),
    },
  ].filter((item) => item.value > 0)

  // Status distribution (Negeri vs Swasta)
  const statusDistribution = [
    {
      name: "Negeri",
      value: schools.filter((s) => s.status_satuan_pendidikan === "NEGERI").length,
      color: "#10b981",
      percentage: (
        (schools.filter((s) => s.status_satuan_pendidikan === "NEGERI").length / totalSchools) *
        100
      ).toFixed(1),
    },
    {
      name: "Swasta",
      value: schools.filter((s) => s.status_satuan_pendidikan === "SWASTA").length,
      color: "#f59e0b",
      percentage: (
        (schools.filter((s) => s.status_satuan_pendidikan === "SWASTA").length / totalSchools) *
        100
      ).toFixed(1),
    },
  ].filter((item) => item.value > 0)

  // Accreditation distribution
  const accreditationDistribution = [
    {
      name: "A",
      value: schools.filter((s) => s.akreditasi === "A").length,
      color: "#10b981",
      percentage: ((schools.filter((s) => s.akreditasi === "A").length / totalSchools) * 100).toFixed(1),
    },
    {
      name: "B",
      value: schools.filter((s) => s.akreditasi === "B").length,
      color: "#f59e0b",
      percentage: ((schools.filter((s) => s.akreditasi === "B").length / totalSchools) * 100).toFixed(1),
    },
    {
      name: "C",
      value: schools.filter((s) => s.akreditasi === "C").length,
      color: "#ef4444",
      percentage: ((schools.filter((s) => s.akreditasi === "C").length / totalSchools) * 100).toFixed(1),
    },
    {
      name: "Belum",
      value: schools.filter((s) => !["A", "B", "C"].includes(s.akreditasi)).length,
      color: "#6b7280",
      percentage: (
        (schools.filter((s) => !["A", "B", "C"].includes(s.akreditasi)).length / totalSchools) *
        100
      ).toFixed(1),
    },
  ].filter((item) => item.value > 0)

  // Schools by region
  const regionDistribution = schools
    .reduce(
      (acc, school) => {
        const region = school.alamat[0]?.nama_kabupaten || "Tidak Diketahui"
        const existing = acc.find((item) => item.name === region)
        if (existing) {
          existing.value += 1
        } else {
          acc.push({ name: region, value: 1 })
        }
        return acc
      },
      [] as { name: string; value: number }[],
    )
    .sort((a, b) => b.value - a.value)
    .slice(0, 5) // Top 5 regions

  // Custom pie chart label
  const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, percent, index, name }: any) => {
    const RADIAN = Math.PI / 180
    const radius = outerRadius * 1.1
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text
        x={x}
        y={y}
        fill={educationDistribution[index].color}
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="text-xs font-medium"
      >
        {`${name} (${(percent * 100).toFixed(1)}%)`}
      </text>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sekolah</CardTitle>
            <School className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSchools.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Satuan pendidikan di DIY</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sekolah Negeri</CardTitle>
            <Building className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {schools.filter((s) => s.status_satuan_pendidikan === "NEGERI").length}
            </div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              {statusDistribution.find((s) => s.name === "Negeri")?.percentage || 0}% dari total
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Akreditasi A</CardTitle>
            <Award className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{schools.filter((s) => s.akreditasi === "A").length}</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              {accreditationDistribution.find((s) => s.name === "A")?.percentage || 0}% terakreditasi A
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wilayah</CardTitle>
            <MapPin className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{regionDistribution.length}</div>
            <p className="text-xs text-muted-foreground">Kabupaten/Kota di DIY</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Education Distribution Pie Chart */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-600" />
              Distribusi Bentuk Pendidikan
            </CardTitle>
            <CardDescription>Proporsi sekolah berdasarkan jenjang pendidikan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={educationDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={80}
                  >
                    {educationDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="white" strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value, name) => [
                      `${value} sekolah (${educationDistribution.find((item) => item.name === name)?.percentage}%)`,
                      name,
                    ]}
                    contentStyle={{
                      backgroundColor: "white",
                      borderRadius: "0.375rem",
                      border: "1px solid #e2e8f0",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                    }}
                  />
                  <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="center"
                    formatter={(value) => {
                      const item = educationDistribution.find((item) => item.name === value)
                      return <span style={{ color: item?.color }}>{value}</span>
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Status Distribution Donut Chart */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5 text-green-600" />
              Status Satuan Pendidikan
            </CardTitle>
            <CardDescription>Perbandingan sekolah negeri dan swasta</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) => `${name} (${percentage}%)`}
                    outerRadius={80}
                    innerRadius={40}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statusDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value, name) => [
                      `${value} sekolah (${statusDistribution.find((item) => item.name === name)?.percentage}%)`,
                      name,
                    ]}
                    contentStyle={{
                      backgroundColor: "white",
                      borderRadius: "0.375rem",
                      border: "1px solid #e2e8f0",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                    }}
                  />
                  <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="center"
                    formatter={(value) => {
                      const item = statusDistribution.find((item) => item.name === value)
                      return <span style={{ color: item?.color }}>{value}</span>
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Accreditation Distribution */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-yellow-600" />
              Akreditasi Sekolah
            </CardTitle>
            <CardDescription>Distribusi sekolah berdasarkan peringkat akreditasi</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={accreditationDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(1)}%)`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {accreditationDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="white" strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value, name) => [
                      `${value} sekolah (${accreditationDistribution.find((item) => item.name === name)?.percentage}%)`,
                      name,
                    ]}
                    contentStyle={{
                      backgroundColor: "white",
                      borderRadius: "0.375rem",
                      border: "1px solid #e2e8f0",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                    }}
                  />
                  <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="center"
                    formatter={(value) => {
                      const item = accreditationDistribution.find((item) => item.name === value)
                      return <span style={{ color: item?.color }}>{value}</span>
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Regional Distribution Bar Chart */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-red-600" />
              Sekolah per Kabupaten/Kota
            </CardTitle>
            <CardDescription>Jumlah sekolah di setiap wilayah administratif</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={regionDistribution} layout="horizontal" margin={{ left: 20, right: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip
                    formatter={(value) => [`${value} sekolah`, "Jumlah"]}
                    contentStyle={{
                      backgroundColor: "white",
                      borderRadius: "0.375rem",
                      border: "1px solid #e2e8f0",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                    }}
                  />
                  <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} animationDuration={1000}>
                    <LabelList dataKey="value" position="top" fill="#3b82f6" fontSize={12} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-red-600" />
              Sekolah Dasar (SD)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600 mb-2">
              {schools.filter((s) => s.bentuk_pendidikan === "SD").length}
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Negeri:</span>
                <span className="font-medium">
                  {
                    schools.filter((s) => s.bentuk_pendidikan === "SD" && s.status_satuan_pendidikan === "NEGERI")
                      .length
                  }
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Swasta:</span>
                <span className="font-medium">
                  {
                    schools.filter((s) => s.bentuk_pendidikan === "SD" && s.status_satuan_pendidikan === "SWASTA")
                      .length
                  }
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Akreditasi A:</span>
                <span className="font-medium">
                  {schools.filter((s) => s.bentuk_pendidikan === "SD" && s.akreditasi === "A").length}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-blue-600" />
              Sekolah Menengah
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {schools.filter((s) => ["SMP", "SMA", "SMK"].includes(s.bentuk_pendidikan)).length}
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">SMP:</span>
                <span className="font-medium">{schools.filter((s) => s.bentuk_pendidikan === "SMP").length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">SMA:</span>
                <span className="font-medium">{schools.filter((s) => s.bentuk_pendidikan === "SMA").length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">SMK:</span>
                <span className="font-medium">{schools.filter((s) => s.bentuk_pendidikan === "SMK").length}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Award className="h-5 w-5 text-green-600" />
              Kualitas Akreditasi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600 mb-2">
              {((schools.filter((s) => s.akreditasi === "A").length / totalSchools) * 100).toFixed(1)}%
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">A:</span>
                <span className="font-medium">{schools.filter((s) => s.akreditasi === "A").length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">B:</span>
                <span className="font-medium">{schools.filter((s) => s.akreditasi === "B").length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">C:</span>
                <span className="font-medium">{schools.filter((s) => s.akreditasi === "C").length}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
