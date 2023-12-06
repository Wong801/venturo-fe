<script setup lang="ts">
import { ref } from 'vue';
import IconNotif from './IconNotif.vue';
import LayoutCart from './LayoutCart.vue';
import { useCartStore } from '@/stores/cart';
import { storeToRefs } from 'pinia';

const cartStore = useCartStore()

const { itemCount } = storeToRefs(cartStore)

type CartState = 'open' | 'close'

const cartState = ref<CartState>('close')
</script>
<template>
  <header class="flex justify-between items-center px-8 py-10">
    <h1>Menu</h1>
    <div class="relative">
      <IconNotif :qty="itemCount" />
      <button @click="cartState = 'open'" class="border rounded-md border-cyan-500 hover:bg-cyan-500 hover:text-white py-2 px-8 text-xs">keranjang</button>
    </div>
  </header>
  <LayoutCart v-if="cartState === 'open'" v-model="cartState" />
</template>