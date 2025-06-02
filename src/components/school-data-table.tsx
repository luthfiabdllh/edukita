"use client"

import { useState, useMemo } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  MoreHorizontal,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Plus,
  Copy,
} from "lucide-react"
import type { School } from "../types/school"
import { AddSchoolDialog } from "./add-school-dialog."
import { EditSchoolDialog } from "./edit-school-dialog"
import { DeleteSchoolDialog } from "./delete-school-dialog"

interface SchoolDataTableProps {
  schools: School[]
  onSchoolSelect: (school: School) => void
  onAddSchool?: (school: Partial<School>) => void
  onEditSchool?: (school: School) => void
  onDeleteSchool?: (school: School) => void
}

export function SchoolDataTable({
  schools,
  onSchoolSelect,
  onAddSchool,
  onEditSchool,
  onDeleteSchool,
}: SchoolDataTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterJenjang, setFilterJenjang] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterAkreditasi, setFilterAkreditasi] = useState("all")
  const [sortField, setSortField] = useState<keyof School>("nama")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedSchoolForAction, setSelectedSchoolForAction] = useState<School | null>(null)

  const filteredAndSortedSchools = useMemo(() => {
    const filtered = schools.filter((school) => {
      const matchesSearch =
        school.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        school.npsn.includes(searchTerm) ||
        school.alamat[0]?.nama_kabupaten?.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesJenjang = filterJenjang === "all" || school.bentuk_pendidikan === filterJenjang
      const matchesStatus = filterStatus === "all" || school.status_satuan_pendidikan === filterStatus
      const matchesAkreditasi = filterAkreditasi === "all" || school.akreditasi === filterAkreditasi

      return matchesSearch && matchesJenjang && matchesStatus && matchesAkreditasi
    })

    // Sort
    filtered.sort((a, b) => {
      let aValue = a[sortField]
      let bValue = b[sortField]

      if (typeof aValue === "string" && typeof bValue === "string") {
        aValue = aValue.toLowerCase()
        bValue = bValue.toLowerCase()
      }

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
      return 0
    })

    return filtered
  }, [schools, searchTerm, filterJenjang, filterStatus, filterAkreditasi, sortField, sortDirection])

  const totalPages = Math.ceil(filteredAndSortedSchools.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedSchools = filteredAndSortedSchools.slice(startIndex, startIndex + itemsPerPage)

  const handleSort = (field: keyof School) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const getJenjangColor = (bentuk: string) => {
    switch (bentuk) {
      case "SD":
        return "bg-red-100 text-red-800"
      case "SMP":
        return "bg-blue-100 text-blue-800"
      case "SMA":
        return "bg-green-100 text-green-800"
      case "SMK":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getAkreditasiColor = (akreditasi: string) => {
    switch (akreditasi) {
      case "A":
        return "bg-green-100 text-green-800"
      case "B":
        return "bg-yellow-100 text-yellow-800"
      case "C":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const exportData = () => {
    const csvContent = [
      ["NPSN", "Nama Sekolah", "Jenjang", "Status", "Akreditasi", "Kabupaten", "Kecamatan"].join(","),
      ...filteredAndSortedSchools.map((school) =>
        [
          school.npsn,
          `"${school.nama}"`,
          school.bentuk_pendidikan,
          school.status_satuan_pendidikan,
          school.akreditasi,
          `"${school.alamat[0]?.nama_kabupaten || ""}"`,
          `"${school.alamat[0]?.nama_kecamatan || ""}"`,
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "data-sekolah-diy.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const handleAddSchool = (school: Partial<School>) => {
    if (onAddSchool) {
      onAddSchool(school)
    }
  }

  const handleEditSchool = (school: School) => {
    if (onEditSchool) {
      onEditSchool(school)
    }
  }

  const handleDeleteSchool = (school: School) => {
    if (onDeleteSchool) {
      onDeleteSchool(school)
    }
  }

  const openEditDialog = (school: School) => {
    setSelectedSchoolForAction(school)
    setIsEditDialogOpen(true)
  }

  const openDeleteDialog = (school: School) => {
    setSelectedSchoolForAction(school)
    setIsDeleteDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Data Sekolah</h2>
          <p className="text-muted-foreground">
            Menampilkan {filteredAndSortedSchools.length} dari {schools.length} sekolah
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setIsAddDialogOpen(true)} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Tambah Sekolah
          </Button>
          <Button onClick={exportData} variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filter & Pencarian
          </CardTitle>
          <CardDescription>Filter data sekolah berdasarkan kriteria tertentu</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Cari nama sekolah, NPSN, atau wilayah..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={filterJenjang} onValueChange={setFilterJenjang}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Jenjang" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Jenjang</SelectItem>
                <SelectItem value="SD">SD</SelectItem>
                <SelectItem value="SMP">SMP</SelectItem>
                <SelectItem value="SMA">SMA</SelectItem>
                <SelectItem value="SMK">SMK</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="NEGERI">Negeri</SelectItem>
                <SelectItem value="SWASTA">Swasta</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterAkreditasi} onValueChange={setFilterAkreditasi}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Akreditasi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Akreditasi</SelectItem>
                <SelectItem value="A">A</SelectItem>
                <SelectItem value="B">B</SelectItem>
                <SelectItem value="C">C</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setFilterJenjang("all")
                setFilterStatus("all")
                setFilterAkreditasi("all")
              }}
            >
              Reset Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">
                  <Button variant="ghost" onClick={() => handleSort("npsn")} className="h-auto p-0 font-semibold">
                    NPSN
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" onClick={() => handleSort("nama")} className="h-auto p-0 font-semibold">
                    Nama Sekolah
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Jenjang</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Akreditasi</TableHead>
                <TableHead>Wilayah</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedSchools.map((school) => (
                <TableRow key={school.npsn}>
                  <TableCell className="font-mono text-sm">{school.npsn}</TableCell>
                  <TableCell className="font-medium">{school.nama}</TableCell>
                  <TableCell>
                    <Badge className={getJenjangColor(school.bentuk_pendidikan)}>{school.bentuk_pendidikan}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={school.status_satuan_pendidikan === "NEGERI" ? "default" : "secondary"}>
                      {school.status_satuan_pendidikan}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getAkreditasiColor(school.akreditasi)}>{school.akreditasi}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className="font-medium">{school.alamat[0]?.nama_kabupaten}</div>
                      <div className="text-muted-foreground">{school.alamat[0]?.nama_kecamatan}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => onSchoolSelect(school)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Lihat Detail
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openEditDialog(school)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Data
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(school.npsn)}>
                          <Copy className="mr-2 h-4 w-4" />
                          Copy NPSN
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => openDeleteDialog(school)}
                          className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Hapus Sekolah
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Menampilkan {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredAndSortedSchools.length)} dari{" "}
          {filteredAndSortedSchools.length} data
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <div className="flex items-center space-x-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = i + 1
              return (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              )
            })}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Dialogs */}
      <AddSchoolDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} onSave={handleAddSchool} />

      <EditSchoolDialog
        school={selectedSchoolForAction}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSave={handleEditSchool}
      />

      <DeleteSchoolDialog
        school={selectedSchoolForAction}
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDeleteSchool}
      />
    </div>
  )
}
