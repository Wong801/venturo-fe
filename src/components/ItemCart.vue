<script setup lang="ts">
import type { CartItem } from '@/constants/interfaces';
import { useCartStore } from '@/stores/cart';

const cartStore = useCartStore()

interface ItemCartProps {
  item: CartItem
}

defineProps<ItemCartProps>()
</script>

<template>
  <div class="flex w-full gap-x-4">
    <div class="h-24 w-28 overflow-hidden">
      <img :src="item.gambar" :alt="item.nama" class="w-auto h-auto">
    </div>
    <div class="w-full">
      <h4 class="font-semibold">{{ item.nama }}</h4>
      <p class="text-cyan-500 font-semibold text-sm pt-2 pb-4">Rp. {{ item.harga }}</p>
      <div class="flex justify-between">
        <p>{{ item.note }}</p>
        <div class="flex gap-x-4 items-center">
          <button @click="cartStore.removeItem(item.id)" class="bg-cyan-600 text-white px-2 py-1 rounded-md">-</button>
          <p>{{ item.qty }}</p>
          <button @click="cartStore.addItem(item)" class="bg-cyan-600 text-white px-2 py-1 rounded-md">+</button>
        </div>
      </div>
    </div>
  </div>
</template>