import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from '@/plugins/axios'
import type { Menu } from '@/constants/interfaces'

export const useMenuStore = defineStore('menu', () => {
  const menus = ref<Menu[]>([])

  const foods = computed<Menu[]>(() => menus.value.filter(menu => menu.tipe === 'makanan'))
  const drinks = computed<Menu[]>(() => menus.value.filter(menu => menu.tipe === 'minuman'))

  async function fetchMenus() {
    try {
      const { data } = await axios.get('/menus')
      menus.value = data.datas
    } catch (error) {
      console.log(error)
    }
  }

  return { menus, fetchMenus, foods, drinks }
})
