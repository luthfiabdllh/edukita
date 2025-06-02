"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { School, AlertTriangle } from "lucide-react"
import type { School as SchoolType } from "../types/school"

interface DeleteSchoolDialogProps {
  school: SchoolType | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (school: SchoolType) => void
}

export function DeleteSchoolDialog({ school, open, onOpenChange, onConfirm }: DeleteSchoolDialogProps) {
  if (!school) return null

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="w-5 h-5" />
            Konfirmasi Hapus Sekolah
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-2">
            <p>
              Anda akan menghapus data sekolah <strong>{school.nama}</strong> dengan NPSN <strong>{school.npsn}</strong>
              .
            </p>
            <p>Tindakan ini tidak dapat dibatalkan. Data yang sudah dihapus tidak dapat dikembalikan.</p>
            <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
              <div className="flex items-center gap-2">
                <School className="w-4 h-4 text-red-600" />
                <p className="font-medium text-red-600">Detail Sekolah:</p>
              </div>
              <ul className="mt-2 text-sm space-y-1 text-red-600">
                <li>NPSN: {school.npsn}</li>
                <li>Nama: {school.nama}</li>
                <li>Jenjang: {school.bentuk_pendidikan}</li>
                <li>Status: {school.status_satuan_pendidikan}</li>
                <li>
                  Alamat: {school.alamat[0]?.jalan}, {school.alamat[0]?.nama_kecamatan}
                </li>
              </ul>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction onClick={() => onConfirm(school)} className="bg-red-600 hover:bg-red-700 text-white">
            Hapus Sekolah
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
