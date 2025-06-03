import type { School, SchoolApiResponse } from "@/types/school"

// Base URL for internal proxy API
const API_URL = '/api/proxy/schools'

/**
 * Get all schools
 */
export async function getAllSchools(): Promise<SchoolApiResponse> {
  const response = await fetch(API_URL)
  
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`)
  }
  
  return await response.json()
}

/**
 * Get school by NPSN
 */
export async function getSchoolByNpsn(npsn: string): Promise<School> {
  const response = await fetch(`${API_URL}/${npsn}`)
  
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`)
  }
  
  return await response.json()
}

/**
 * Filter schools by education level
 */
export async function getSchoolsByLevel(level: string): Promise<SchoolApiResponse> {
  const response = await fetch(`${API_URL}/filter?bentukPendidikan=${level}`)
  
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`)
  }
  
  return await response.json()
}

/**
 * Add new school
 */
export async function addSchool(school: Partial<School>): Promise<any> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(school),
  })
  
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`)
  }
  
  return await response.json()
}

/**
 * Update school
 */
export async function updateSchool(npsn: string, school: Partial<School>): Promise<any> {
  const response = await fetch(`${API_URL}/${npsn}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(school),
  })
  
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`)
  }
  
  return await response.json()
}

/**
 * Delete school
 */
export async function deleteSchool(npsn: string): Promise<any> {
  const response = await fetch(`${API_URL}/${npsn}`, {
    method: 'DELETE',
  })
  
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`)
  }
  
  return await response.json()
}