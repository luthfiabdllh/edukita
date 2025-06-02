export interface School {
  npsn: string
  nama: string
  bentuk_pendidikan: string
  jalur_pendidikan: string
  jenjang_pendidikan: string
  kementerian_pembina: string
  status_satuan_pendidikan: string
  akreditasi: string
  jenis_pendidikan: string
  alamat: Array<{
    rt: number
    rw: number
    npsn: string
    jalan: string
    nama_desa: string
    nama_dusun: string
    nama_negara: string
    kode_wilayah: string
    kode_provinsi: string
    nama_provinsi: string
    kode_kabupaten: string
    kode_kecamatan: string
    nama_kabupaten: string
    nama_kecamatan: string
  }>
  kontak: Array<{
    npsn: string
    email: string
    website: string
    nomor_fax: string
    nomor_telepon: string
  }>
  lokasi: Array<{
    npsn: string
    bujur: number
    lintang: number
  }>
}

export interface SchoolApiResponse {
  total: number
  data: School[]
}
