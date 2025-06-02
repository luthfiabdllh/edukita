"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { School, MapPin, Phone, Mail, Globe, Users, Award, Building, Navigation, Share2 } from "lucide-react"
import type { School as SchoolType } from "../types/school"

interface SchoolDetailDialogProps {
  school: SchoolType | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SchoolDetailDialog({ school, open, onOpenChange }: SchoolDetailDialogProps) {
  if (!school) return null

  const getJenjangColor = (bentuk: string) => {
    switch (bentuk) {
      case "SD":
        return "bg-red-100 text-red-800 border-red-200"
      case "SMP":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "SMA":
        return "bg-green-100 text-green-800 border-green-200"
      case "SMK":
        return "bg-orange-100 text-orange-800 border-orange-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getAkreditasiColor = (akreditasi: string) => {
    switch (akreditasi) {
      case "A":
        return "bg-green-100 text-green-800 border-green-200"
      case "B":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "C":
        return "bg-orange-100 text-orange-800 border-orange-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const handleGetDirections = () => {
    if (school.lokasi && school.lokasi[0]) {
      const { bujur, lintang } = school.lokasi[0]
      const url = `https://www.google.com/maps/dir/?api=1&destination=${lintang},${bujur}`
      window.open(url, "_blank")
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: school.nama,
          text: `${school.nama} - ${school.alamat[0]?.jalan}`,
          url: window.location.href,
        })
      } catch (err) {
        console.log("Error sharing:", err)
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(`${school.nama} - ${school.alamat[0]?.jalan}`)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <School className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <DialogTitle className="text-xl font-bold mb-2">{school.nama}</DialogTitle>
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge className={getJenjangColor(school.bentuk_pendidikan)}>{school.bentuk_pendidikan}</Badge>
                <Badge className={getAkreditasiColor(school.akreditasi)}>Akreditasi {school.akreditasi}</Badge>
                <Badge variant="outline">{school.status_satuan_pendidikan}</Badge>
              </div>
              <DialogDescription className="text-sm text-gray-600">
                NPSN: {school.npsn} • {school.jenis_pendidikan}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informasi Dasar */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Building className="w-5 h-5" />
              Informasi Dasar
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-600">Bentuk Pendidikan</label>
                  <p className="text-sm">{school.bentuk_pendidikan}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Jenjang Pendidikan</label>
                  <p className="text-sm">{school.jenjang_pendidikan}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Jalur Pendidikan</label>
                  <p className="text-sm">{school.jalur_pendidikan}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-600">Status Sekolah</label>
                  <p className="text-sm">{school.status_satuan_pendidikan}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Jenis Pendidikan</label>
                  <p className="text-sm">{school.jenis_pendidikan}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Akreditasi</label>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-yellow-500" />
                    <p className="text-sm">{school.akreditasi}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Alamat */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Alamat & Lokasi
            </h3>
            {school.alamat[0] && (
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-600">Alamat Lengkap</label>
                  <p className="text-sm">{school.alamat[0].jalan}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Desa/Kelurahan</label>
                    <p className="text-sm">{school.alamat[0].nama_desa}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Kecamatan</label>
                    <p className="text-sm">{school.alamat[0].nama_kecamatan}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Kabupaten/Kota</label>
                    <p className="text-sm">{school.alamat[0].nama_kabupaten}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Provinsi</label>
                    <p className="text-sm">{school.alamat[0].nama_provinsi}</p>
                  </div>
                </div>
                {school.alamat[0].rt > 0 && school.alamat[0].rw > 0 && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">RT</label>
                      <p className="text-sm">{school.alamat[0].rt}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">RW</label>
                      <p className="text-sm">{school.alamat[0].rw}</p>
                    </div>
                  </div>
                )}
                {school.lokasi[0] && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Latitude</label>
                      <p className="text-sm font-mono">{school.lokasi[0].lintang}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Longitude</label>
                      <p className="text-sm font-mono">{school.lokasi[0].bujur}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <Separator />

          {/* Kontak */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Informasi Kontak
            </h3>
            {school.kontak[0] && (
              <div className="space-y-3">
                {school.kontak[0].email && (
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    <div>
                      <label className="text-sm font-medium text-gray-600">Email</label>
                      <p className="text-sm">
                        <a href={`mailto:${school.kontak[0].email}`} className="text-blue-600 hover:underline">
                          {school.kontak[0].email}
                        </a>
                      </p>
                    </div>
                  </div>
                )}
                {school.kontak[0].nomor_telepon && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    <div>
                      <label className="text-sm font-medium text-gray-600">Telepon</label>
                      <p className="text-sm">
                        <a href={`tel:${school.kontak[0].nomor_telepon}`} className="text-blue-600 hover:underline">
                          {school.kontak[0].nomor_telepon}
                        </a>
                      </p>
                    </div>
                  </div>
                )}
                {school.kontak[0].nomor_fax && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    <div>
                      <label className="text-sm font-medium text-gray-600">Fax</label>
                      <p className="text-sm">{school.kontak[0].nomor_fax}</p>
                    </div>
                  </div>
                )}
                {school.kontak[0].website && (
                  <div className="flex items-center gap-3">
                    <Globe className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    <div>
                      <label className="text-sm font-medium text-gray-600">Website</label>
                      <p className="text-sm">
                        <a
                          href={school.kontak[0].website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {school.kontak[0].website}
                        </a>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <Separator />

          {/* Kementerian Pembina */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Kementerian Pembina
            </h3>
            <p className="text-sm">{school.kementerian_pembina}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 pt-4 border-t">
            <Button onClick={handleGetDirections} className="flex items-center gap-2">
              <Navigation className="w-4 h-4" />
              Petunjuk Arah
            </Button>
            <Button variant="outline" onClick={handleShare} className="flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              Bagikan
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
