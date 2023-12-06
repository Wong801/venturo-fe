import type { CartItem } from "@/constants/interfaces";
import { AxiosError } from "axios";
import { defineStore } from "pinia";
import axios from '@/plugins/axios'

export const useOrderStore = defineStore('order', () => {
  function mapCartItem(items: CartItem[]) {
    const mappedItems: Record<string, any>[] = []
    items.forEach(item => {
      // if (item.qty === 1) {
        mappedItems.push({
          id: item.id,
          harga: item.harga, 
          catatan: item.note || ''
        })
      // } else {
      //   for (let i = 1; i <= item.qty; i++) {
      //     mappedItems.push({
      //       id: item.id,
      //       harga: item.harga, 
      //       catatan: item.note
      //     })
      //   }
      // }
    })

    return mappedItems
  }

  async function makeOrder(discount:number, total: number, items: CartItem[], voucherId?: number) {
    try {
      const { data } = await axios.post('/order', {
        ...(voucherId && { voucher_id: voucherId }),
        nominal_diskon: discount,
        nominal_pesanan: total,
        items: mapCartItem(items)
      })

      if (data.status_code !== 200) {
        throw new Error(data.message)
      }
      return data.message
    } catch (error) {
      if (error instanceof AxiosError) {
        throw error.response?.data.message
      } else {
        throw (error as Error).message
      }
    }
  }

  return { makeOrder }
})