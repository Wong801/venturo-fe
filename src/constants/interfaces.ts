export type Menu = {
  id: number,
  nama: string,
  harga: number,
  tipe: string,
  gambar: string
}

export type CartItem = Menu & { qty: number, note?: string }

export type Voucher = {
  id: number,
  kode: string,
  gambar: string,
  nominal: number,
  status: string
}