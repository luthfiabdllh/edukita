"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { School, MapPin, Phone, Mail } from "lucide-react"
import type { School as SchoolType } from "../types/school"
import { LocationPickerMap } from "./location-picker-map"

interface AddSchoolDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (school: Partial<SchoolType>) => void
}

export function AddSchoolDialog({ open, onOpenChange }: AddSchoolDialogProps) {
  const [formData, setFormData] = useState<Partial<SchoolType>>({
    npsn: "",
    nama: "",
    bentuk_pendidikan: "SD",
    jalur_pendidikan: "FORMAL",
    jenjang_pendidikan: "PENDIDIKAN DASAR",
    kementerian_pembina: "KEMENTERIAN PENDIDIKAN, KEBUDAYAAN, RISET DAN TEKNOLOGI",
    status_satuan_pendidikan: "NEGERI",
    akreditasi: "B",
    jenis_pendidikan: "PENDIDIKAN UMUM",
    alamat: [
      {
        rt: 0,
        rw: 0,
        npsn: "",
        jalan: "",
        nama_desa: "",
        nama_dusun: "",
        nama_negara: "INDONESIA",
        kode_wilayah: "",
        kode_provinsi: "34",
        nama_provinsi: "D.I. YOGYAKARTA",
        kode_kabupaten: "",
        kode_kecamatan: "",
        nama_kabupaten: "",
        nama_kecamatan: "",
      },
    ],
    kontak: [
      {
        npsn: "",
        email: "",
        website: "",
        nomor_fax: "",
        nomor_telepon: "",
      },
    ],
    lokasi: [
      {
        npsn: "",
        bujur: 110.3695,
        lintang: -7.7956,
      },
    ],
  })

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleAddressChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      alamat: [{ ...prev.alamat![0], [field]: value }],
    }))
  }

  const handleContactChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      kontak: [{ ...prev.kontak![0], [field]: value }],
    }))
  }

  const handleLocationChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      lokasi: [{ ...prev.lokasi![0], [field]: value }],
    }))
  }

  const handleSubmit = () => {
    // Update NPSN in all nested objects
    const updatedFormData = {
      ...formData,
      alamat: [{ ...formData.alamat![0], npsn: formData.npsn }],
      kontak: [{ ...formData.kontak![0], npsn: formData.npsn }],
      lokasi: [{ ...formData.lokasi![0], npsn: formData.npsn }],
    }

    // onSave(updatedFormData)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <School className="w-5 h-5" />
            Tambah Sekolah Baru
          </DialogTitle>
          <DialogDescription>Masukkan informasi sekolah baru ke dalam sistem</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Informasi Dasar</TabsTrigger>
            <TabsTrigger value="address">Alamat</TabsTrigger>
            <TabsTrigger value="contact">Kontak</TabsTrigger>
            <TabsTrigger value="location">Lokasi</TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="basic" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="npsn">NPSN</Label>
                  <Input
                    id="npsn"
                    value={formData.npsn}
                    onChange={(e) => handleChange("npsn", e.target.value)}
                    placeholder="Nomor Pokok Sekolah Nasional"
                  />
                </div>
                <div>
                  <Label htmlFor="nama">Nama Sekolah</Label>
                  <Input
                    id="nama"
                    value={formData.nama}
                    onChange={(e) => handleChange("nama", e.target.value)}
                    placeholder="Nama lengkap sekolah"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="bentuk_pendidikan">Bentuk Pendidikan</Label>
                  <Select
                    value={formData.bentuk_pendidikan}
                    onValueChange={(value) => handleChange("bentuk_pendidikan", value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih bentuk pendidikan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SD">SD</SelectItem>
                      <SelectItem value="SMP">SMP</SelectItem>
                      <SelectItem value="SMA">SMA</SelectItem>
                      <SelectItem value="SMK">SMK</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="status_satuan_pendidikan">Status</Label>
                  <Select
                    value={formData.status_satuan_pendidikan}
                    onValueChange={(value) => handleChange("status_satuan_pendidikan", value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NEGERI">NEGERI</SelectItem>
                      <SelectItem value="SWASTA">SWASTA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="akreditasi">Akreditasi</Label>
                  <Select value={formData.akreditasi} onValueChange={(value) => handleChange("akreditasi", value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih akreditasi" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A">A</SelectItem>
                      <SelectItem value="B">B</SelectItem>
                      <SelectItem value="C">C</SelectItem>
                      <SelectItem value="BELUM">BELUM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="jenis_pendidikan">Jenis Pendidikan</Label>
                  <Select
                    value={formData.jenis_pendidikan}
                    onValueChange={(value) => handleChange("jenis_pendidikan", value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih jenis pendidikan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PENDIDIKAN UMUM">PENDIDIKAN UMUM</SelectItem>
                      <SelectItem value="PENDIDIKAN KEJURUAN">PENDIDIKAN KEJURUAN</SelectItem>
                      <SelectItem value="PENDIDIKAN KHUSUS">PENDIDIKAN KHUSUS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="address" className="space-y-4">
              <div>
                <Label htmlFor="jalan">Alamat Jalan</Label>
                <Textarea
                  id="jalan"
                  value={formData.alamat?.[0]?.jalan || ""}
                  onChange={(e) => handleAddressChange("jalan", e.target.value)}
                  placeholder="Alamat lengkap jalan"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nama_desa">Desa/Kelurahan</Label>
                  <Input
                    id="nama_desa"
                    value={formData.alamat?.[0]?.nama_desa || ""}
                    onChange={(e) => handleAddressChange("nama_desa", e.target.value)}
                    placeholder="Nama desa/kelurahan"
                  />
                </div>
                <div>
                  <Label htmlFor="nama_dusun">Dusun</Label>
                  <Input
                    id="nama_dusun"
                    value={formData.alamat?.[0]?.nama_dusun || ""}
                    onChange={(e) => handleAddressChange("nama_dusun", e.target.value)}
                    placeholder="Nama dusun"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nama_kecamatan">Kecamatan</Label>
                  <Input
                    id="nama_kecamatan"
                    value={formData.alamat?.[0]?.nama_kecamatan || ""}
                    onChange={(e) => handleAddressChange("nama_kecamatan", e.target.value)}
                    placeholder="Nama kecamatan"
                  />
                </div>
                <div>
                  <Label htmlFor="nama_kabupaten">Kabupaten/Kota</Label>
                  <Input
                    id="nama_kabupaten"
                    value={formData.alamat?.[0]?.nama_kabupaten || ""}
                    onChange={(e) => handleAddressChange("nama_kabupaten", e.target.value)}
                    placeholder="Nama kabupaten/kota"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="rt">RT</Label>
                  <Input
                    id="rt"
                    type="number"
                    value={formData.alamat?.[0]?.rt || 0}
                    onChange={(e) => handleAddressChange("rt", Number.parseInt(e.target.value) || 0)}
                    placeholder="RT"
                  />
                </div>
                <div>
                  <Label htmlFor="rw">RW</Label>
                  <Input
                    id="rw"
                    type="number"
                    value={formData.alamat?.[0]?.rw || 0}
                    onChange={(e) => handleAddressChange("rw", Number.parseInt(e.target.value) || 0)}
                    placeholder="RW"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="contact" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email" className="flex items-center gap-1">
                    <Mail className="w-4 h-4" /> Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.kontak?.[0]?.email || ""}
                    onChange={(e) => handleContactChange("email", e.target.value)}
                    placeholder="Email sekolah"
                  />
                </div>
                <div>
                  <Label htmlFor="website" className="flex items-center gap-1">
                    Website
                  </Label>
                  <Input
                    id="website"
                    value={formData.kontak?.[0]?.website || ""}
                    onChange={(e) => handleContactChange("website", e.target.value)}
                    placeholder="Website sekolah"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nomor_telepon" className="flex items-center gap-1">
                    <Phone className="w-4 h-4" /> Telepon
                  </Label>
                  <Input
                    id="nomor_telepon"
                    value={formData.kontak?.[0]?.nomor_telepon || ""}
                    onChange={(e) => handleContactChange("nomor_telepon", e.target.value)}
                    placeholder="Nomor telepon"
                  />
                </div>
                <div>
                  <Label htmlFor="nomor_fax" className="flex items-center gap-1">
                    Fax
                  </Label>
                  <Input
                    id="nomor_fax"
                    value={formData.kontak?.[0]?.nomor_fax || ""}
                    onChange={(e) => handleContactChange("nomor_fax", e.target.value)}
                    placeholder="Nomor fax"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="location" className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-red-500" />
                <p className="text-sm text-muted-foreground">
                  Pilih lokasi sekolah pada peta atau masukkan koordinat secara manual
                </p>
              </div>

              <LocationPickerMap
                initialLongitude={formData.lokasi?.[0]?.bujur || 110.3695}
                initialLatitude={formData.lokasi?.[0]?.lintang || -7.7956}
                onLocationSelected={(longitude, latitude) => {
                  handleLocationChange("bujur", longitude)
                  handleLocationChange("lintang", latitude)
                }}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <Label htmlFor="bujur">Longitude (Bujur)</Label>
                  <Input
                    id="bujur"
                    type="number"
                    step="0.0001"
                    value={formData.lokasi?.[0]?.bujur || 0}
                    onChange={(e) => handleLocationChange("bujur", Number.parseFloat(e.target.value) || 0)}
                    placeholder="Contoh: 110.3695"
                  />
                </div>
                <div>
                  <Label htmlFor="lintang">Latitude (Lintang)</Label>
                  <Input
                    id="lintang"
                    type="number"
                    step="0.0001"
                    value={formData.lokasi?.[0]?.lintang || 0}
                    onChange={(e) => handleLocationChange("lintang", Number.parseFloat(e.target.value) || 0)}
                    placeholder="Contoh: -7.7956"
                  />
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Batal
          </Button>
          <Button onClick={handleSubmit} className="gap-2">
            <School className="w-4 h-4" />
            Simpan Sekolah
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
