"use client"

import { useState } from "react"
import { SidebarInset } from "@/components/ui/sidebar"
import { useSchools } from "@/hooks/use-school"
import { School } from "@/types/school"
import { AlertCircle, Loader2 } from "lucide-react"
import { DashboardOverview } from "@/components/dashboard-overview"
import { SchoolMap } from "@/components/school-map"
import { SchoolFilters } from "@/components/school-filters"
import { DashboardHeader } from "@/components/dashboard-header"
import { SchoolDetailDialog } from "@/components/school-detail-dialog"
import { AppSidebar } from "@/components/app-sidebar"
import { SettingsDialog } from "@/components/settings-dialog"
import { toast } from "sonner"
import { SchoolDataTable } from "@/components/school-data-table"

export default function Dashboard() {
  const { 
    schools,
    filteredSchools,
    loading,
    error,
    filterSchools,
    getUniqueKabupaten,
    getUniqueKecamatan,
    addSchool,
    editSchool,
    deleteSchool,
   } =
    useSchools()

  const [filtersVisible, setFiltersVisible] = useState(true)
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState("dashboard")

  const [mapSettings, setMapSettings] = useState({
    style: "mapbox://styles/mapbox/streets-v12",
    showTraffic: false,
    show3D: false,
    showLabels: true,
    markerSize: 0.8,
  })

  const handleMapSettingsChange = (newSettings: Partial<typeof mapSettings>) => {
    setMapSettings((prev) => ({ ...prev, ...newSettings }))
  }


   const handleSchoolSelect = (school: School) => {
    setSelectedSchool(school)
    setIsDetailDialogOpen(true)
  }

  const handlePageChange = (page: string) => {
    setCurrentPage(page)
  }

  const handleSettingsClick = () => {
    setIsSettingsOpen(true)
  }

  const handleAddSchool = (school: Partial<School>) => {
    addSchool(school)
    toast.success(`${school.nama} telah ditambahkan ke database.`, {
      description: "Sekolah berhasil ditambahkan"
    })
  }

  const handleEditSchool = (school: School) => {
    editSchool(school)
    toast.success(`Perubahan pada ${school.nama} telah disimpan.`, {
      description: "Data sekolah diperbarui"
    })
  }

  const handleDeleteSchool = (school: School) => {
    deleteSchool(school)
    toast.error(`${school.nama} telah dihapus dari database.`, {
      description: "Sekolah dihapus"
    })
  }

  const toggleFiltersVisibility = () => {
    setFiltersVisible(!filtersVisible)
  }
  
  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex-1">
          <div className="flex items-center justify-center h-full gap-2">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span>Memuat data sekolah...</span>
          </div>
        </div>
      )
    }

    if (error) {
      return (
        <div className="flex-1">
          <div className="flex items-center justify-center h-full gap-2">
            <AlertCircle className="w-6 h-6" />
            <span>Error: {error}</span>
          </div>
        </div>
      )
    }

    switch (currentPage) {
      case "dashboard":
        return (
          <div className="flex-1 p-6">
            <DashboardOverview schools={schools} />
          </div>
        )

      case "map":
        return (
          <div className="flex-1">
            <div className="h-full w-full relative">
              <SchoolMap 
                schools={filteredSchools}
                onSchoolSelect={handleSchoolSelect}
                mapStyle={mapSettings.style}
                showTraffic={mapSettings.showTraffic}
                show3D={mapSettings.show3D}
                showLabels={mapSettings.showLabels}
                markerSize={mapSettings.markerSize} />

              {/* Responsive Filters Panel */}
              <SchoolFilters
                  onFilterChange={filterSchools}
                  getUniqueKabupaten={getUniqueKabupaten}
                  getUniqueKecamatan={getUniqueKecamatan}
                  totalSchools={schools.length}
                  filteredCount={filteredSchools.length}
                  isVisible={filtersVisible}
                  onToggleVisibility={toggleFiltersVisibility}
              />
              {/* Legend */}
              <div className="absolute top-4 right-4 z-10 ">
                <div className="bg-card backdrop-blur-sm rounded-lg p-3 shadow-lg border">
                  <div className="text-xs font-medium mb-2">Legend</div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-xs">Sekolah Dasar</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-xs">Sekolah Menengah Pertama</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-xs">Sekolah Menengah Atas</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-xs">Sekolah Menengah Kejuruan</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case "data":
        return (
          <div className="flex-1 p-6">
            <SchoolDataTable
              schools={schools}
              onSchoolSelect={handleSchoolSelect}
              onAddSchool={handleAddSchool}
              onEditSchool={handleEditSchool}
              onDeleteSchool={handleDeleteSchool}
            />
          </div>
        )

      default:
        return (
          <div className="flex-1 p-6">
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Halaman {currentPage}</h2>
              <p className="text-gray-600">Konten untuk halaman ini sedang dalam pengembangan.</p>
            </div>
          </div>
        )
    }
  }

  return (
    <>
      <AppSidebar currentPage={currentPage} onPageChange={handlePageChange} onSettingsClick={handleSettingsClick} />
      <SidebarInset>
        <DashboardHeader currentPage={currentPage} />
        {renderContent()}

        {/* School Detail Dialog */}
        <SchoolDetailDialog school={selectedSchool} open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen} />

        {/* Settings Dialog */}
        <SettingsDialog
          open={isSettingsOpen}
          onOpenChange={setIsSettingsOpen}
          onMapStyleChange={(style) => handleMapSettingsChange({ style })}
          currentMapStyle={mapSettings.style}
          mapSettings={mapSettings}
          onMapSettingsChange={handleMapSettingsChange}
        />

      </SidebarInset>
    </>
  )
}
