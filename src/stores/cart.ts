import type { CartItem } from "@/constants/interfaces";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])

  const itemCount = computed<number>(() => items.value.reduce((pv ,cv) => {return pv + cv.qty}, 0))
  const totalPrice = computed<number>(() => items.value.reduce((pv ,cv) => {return pv + (cv.qty * cv.harga)}, 0))

  const addItem = (item: CartItem) => {
    const existing = items.value.find(i => i.id === item.id) 
    if (existing) {
      existing.qty += 1
    } else {
      items.value.push(item)
    }
  }

  const removeItem = (id: number) => {
    const item = items.value.find(i => i.id === id)
    if (item) {
      item.qty -= 1
      if (item.qty === 0) {
        items.value.splice(items.value.indexOf(item), 1)
      }
    }
  }

  return { items, itemCount, totalPrice, addItem, removeItem }
})