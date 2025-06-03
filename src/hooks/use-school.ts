"use client"

import { useState, useEffect } from "react"
import type { School, SchoolApiResponse } from "../types/school"
import { 
  getAllSchools,
  getSchoolsByLevel, 
  addSchool as apiAddSchool, 
  updateSchool as apiUpdateSchool, 
  deleteSchool as apiDeleteSchool
} from "@/services/api"


export function useSchools() {
  const [schools, setSchools] = useState<School[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filteredSchools, setFilteredSchools] = useState<School[]>([])

  useEffect(() => {
    fetchSchools()
  }, [])

  const fetchSchools = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const data = await getAllSchools()

      setSchools(data.data)
      setFilteredSchools(data.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const filterSchools = (filters: {
    jenjang?: string
    kabupaten?: string
    kecamatan?: string
    search?: string
  }) => {
    let filtered = schools

    if (filters.jenjang && filters.jenjang !== "all") {
      filtered = filtered.filter((school) => school.bentuk_pendidikan === filters.jenjang)
    }

    if (filters.kabupaten && filters.kabupaten !== "all") {
      filtered = filtered.filter((school) => school.alamat[0]?.nama_kabupaten === filters.kabupaten)
    }

    if (filters.kecamatan && filters.kecamatan !== "all") {
      filtered = filtered.filter((school) => school.alamat[0]?.nama_kecamatan === filters.kecamatan)
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(
        (school) => school.nama.toLowerCase().includes(searchLower) || school.npsn.includes(filters.search ?? ""),
      )
    }

    setFilteredSchools(filtered)
  }

  const getUniqueKabupaten = () => {
    const kabupaten = schools.map((school) => school.alamat[0]?.nama_kabupaten).filter(Boolean)
    return [...new Set(kabupaten)]
  }

  const getUniqueKecamatan = (kabupaten?: string) => {
    let filtered = schools
    if (kabupaten && kabupaten !== "all") {
      filtered = schools.filter((school) => school.alamat[0]?.nama_kabupaten === kabupaten)
    }
    const kecamatan = filtered.map((school) => school.alamat[0]?.nama_kecamatan).filter(Boolean)
    return [...new Set(kecamatan)]
  }

  const addSchool = async (newSchool: Partial<School>) => {
    try {
      setLoading(true)
      
      await apiAddSchool(newSchool)
      await fetchSchools() // Refresh the list after adding
      
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add school")
      throw err
    } finally {
      setLoading(false)
    }
  }

  const editSchool = async (updatedSchool: School) => {
    try {
      setLoading(true)
      
      await apiUpdateSchool(updatedSchool.npsn, updatedSchool)
      await fetchSchools() // Refresh the list after editing
      
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update school")
      throw err
    } finally {
      setLoading(false)
    }
  }

  const deleteSchool = async (schoolToDelete: School) => {
    try {
      setLoading(true)
      
      await apiDeleteSchool(schoolToDelete.npsn)
      
      // Update local state
      setSchools((prevSchools) => prevSchools.filter((school) => school.npsn !== schoolToDelete.npsn))
      setFilteredSchools((prevFiltered) => prevFiltered.filter((school) => school.npsn !== schoolToDelete.npsn))
      
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete school")
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    schools,
    filteredSchools,
    loading,
    error,
    filterSchools,
    getUniqueKabupaten,
    getUniqueKecamatan,
    refetch: fetchSchools,
    addSchool,
    editSchool,
    deleteSchool,
  }
}
