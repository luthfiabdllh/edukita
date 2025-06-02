"use client"

import { useState, useEffect } from "react"
import { Search, Filter, MapPin, School, X, ChevronLeft, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface SchoolFiltersProps {
  onFilterChange: (filters: {
    jenjang?: string
    kabupaten?: string
    kecamatan?: string
    search?: string
  }) => void
  getUniqueKabupaten: () => string[]
  getUniqueKecamatan: (kabupaten?: string) => string[]
  totalSchools: number
  filteredCount: number
  isVisible: boolean
  onToggleVisibility: () => void
}

export function SchoolFilters({
  onFilterChange,
  getUniqueKabupaten,
  getUniqueKecamatan,
  totalSchools,
  filteredCount,
  isVisible,
  onToggleVisibility,
}: SchoolFiltersProps) {
  const [filters, setFilters] = useState({
    jenjang: "all",
    kabupaten: "all",
    kecamatan: "all",
    search: "",
  })

  const [kecamatanOptions, setKecamatanOptions] = useState<string[]>([])

  useEffect(() => {
    setKecamatanOptions(getUniqueKecamatan(filters.kabupaten))
  }, [filters.kabupaten, getUniqueKecamatan])

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value }

    // Reset kecamatan when kabupaten changes
    if (key === "kabupaten") {
      newFilters.kecamatan = "all"
    }

    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const clearFilters = () => {
    const clearedFilters = {
      jenjang: "all",
      kabupaten: "all",
      kecamatan: "all",
      search: "",
    }
    setFilters(clearedFilters)
    onFilterChange(clearedFilters)
  }

  return (
    <>
      {/* Toggle Button */}
      <div className="absolute top-4 left-4">
        <Button
          onClick={onToggleVisibility}
          size="sm"
          variant="secondary"
          className="bg-card backdrop-blur-sm shadow-lg border "
        >
          {isVisible ? (
            <>
              <ChevronLeft className="w-4 h-4 mr-1" />
              Hide
            </>
          ) : (
            <>
              <ChevronRight className="w-4 h-4 mr-1" />
              <Filter className="w-4 h-4 mr-1" />
            </>
          )}
        </Button>
      </div>

      {/* Filter Panel */}
      <div
        className={cn(
          "absolute top-14 left-4 w-80 transition-transform duration-300 ease-in-out",
          isVisible ? "left-4 translate-x-0" : "left-0 -translate-x-full"
        )}
      >
        <div className="bg-card backdrop-blur-sm rounded-lg p-4 shadow-lg border space-y-4">
        
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-blue-600" />
              <h3 className="font-semibold">Filter Sekolah</h3>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={clearFilters} className="text-xs">
                Reset
              </Button>
              <Button variant="ghost" size="sm" onClick={onToggleVisibility} className="p-1 h-auto">
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-50 dark:bg-blue-950 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <School className="w-4 h-4 text-blue-600" />
                <div>
                  <div className="text-lg font-bold text-blue-900 dark:text-blue-400">{filteredCount}</div>
                  <div className="text-xs text-blue-600">Sekolah Ditampilkan</div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-950 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-600" />
                <div>
                  <div className="text-lg font-bold text-gray-900 dark:text-gray-400">{totalSchools}</div>
                  <div className="text-xs text-gray-600">Total Sekolah</div>
                </div>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Cari nama sekolah atau NPSN..."
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="pl-10 text-sm"
            />
          </div>

          {/* Jenjang Filter */}
          <div>
            <label className="text-xs font-medium text-gray-700 mb-1 block">Jenjang Pendidikan</label>
            <Select value={filters.jenjang} onValueChange={(value) => handleFilterChange("jenjang", value)}>
              <SelectTrigger className="text-sm w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Jenjang</SelectItem>
                <SelectItem value="SD">SD - Sekolah Dasar</SelectItem>
                <SelectItem value="SMP">SMP - Sekolah Menengah Pertama</SelectItem>
                <SelectItem value="SMA">SMA - Sekolah Menengah Atas</SelectItem>
                <SelectItem value="SMK">SMK - Sekolah Menengah Kejuruan</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Kabupaten Filter */}
          <div>
            <label className="text-xs font-medium text-gray-700 mb-1 block">Kabupaten/Kota</label>
            <Select value={filters.kabupaten} onValueChange={(value) => handleFilterChange("kabupaten", value)}>
              <SelectTrigger className="text-sm w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kabupaten/Kota</SelectItem>
                {getUniqueKabupaten().map((kabupaten) => (
                  <SelectItem key={kabupaten} value={kabupaten}>
                    {kabupaten}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Kecamatan Filter */}
          <div>
            <label className="text-xs font-medium text-gray-700 mb-1 block">Kecamatan</label>
            <Select
              value={filters.kecamatan}
              onValueChange={(value) => handleFilterChange("kecamatan", value)}
              disabled={filters.kabupaten === "all"}
            >
              <SelectTrigger className="text-sm w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kecamatan</SelectItem>
                {kecamatanOptions.map((kecamatan) => (
                  <SelectItem key={kecamatan} value={kecamatan}>
                    {kecamatan}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </>
  )
}
