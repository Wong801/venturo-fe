import type { Voucher } from "@/constants/interfaces";
import { AxiosError } from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";
import axios from '@/plugins/axios'

export const useVoucherStore = defineStore('voucher', () => {
  const voucher = ref<Voucher | null>()

  async function getVoucher(code: string) {
    if (!code) {
      voucher.value = null
    } else {
      try {
        const { data } = await axios.get(`/vouchers?kode=${code}`)
        if (data.message) {
          voucher.value = null
          throw new Error(data.message)
        } else {
          voucher.value = data.datas
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          throw error.response?.data.message
        } else {
          throw (error as Error).message
        }
      }
    }
  }

  return { voucher, getVoucher }
})