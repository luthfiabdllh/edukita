"use client"

import { useState, useEffect } from "react"
import type { School } from "../types/school"
import { getDummySchools } from "@/data/dummySchool"

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

      // Use dummy data instead of API
      const data = await getDummySchools()

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

  const addSchool = (newSchool: Partial<School>) => {
    // Generate a unique NPSN if not provided
    const schoolToAdd = {
      ...newSchool,
      npsn: newSchool.npsn || `${Date.now()}`,
    } as School

    setSchools((prevSchools) => [...prevSchools, schoolToAdd])
    setFilteredSchools((prevFiltered) => [...prevFiltered, schoolToAdd])
  }

  const editSchool = (updatedSchool: School) => {
    setSchools((prevSchools) =>
      prevSchools.map((school) => (school.npsn === updatedSchool.npsn ? updatedSchool : school)),
    )

    setFilteredSchools((prevFiltered) =>
      prevFiltered.map((school) => (school.npsn === updatedSchool.npsn ? updatedSchool : school)),
    )
  }

  const deleteSchool = (schoolToDelete: School) => {
    setSchools((prevSchools) => prevSchools.filter((school) => school.npsn !== schoolToDelete.npsn))

    setFilteredSchools((prevFiltered) => prevFiltered.filter((school) => school.npsn !== schoolToDelete.npsn))
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
