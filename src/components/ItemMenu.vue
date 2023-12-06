<script setup lang="ts">
import type { Menu } from '@/constants/interfaces'
import { useCartStore } from '@/stores/cart';

interface ItemMenuProps {
  menu: Menu
}

const cartStore = useCartStore()

const { menu } = defineProps<ItemMenuProps>()
</script>

<template>
  <div class="bg-white p-3 rounded-sm">
    <div class="h-52 flex items-center justify-center overflow-hidden">
      <img :src="menu.gambar" :alt="menu.nama" class="w-auto">
    </div>
    <h1 class="font-semibold text-lg">{{ menu.nama }}</h1>
    <p class="text-cyan-500 font-semibold">Rp. {{ menu.harga }}</p>
    <button @click="cartStore.addItem({ ...menu, qty: 1 })" class="bg-cyan-500 hover:bg-cyan-600 text-white text-sm w-full rounded-lg px-8 py-2 mt-5">+ Tambahkan ke keranjang</button>
  </div>
</template>