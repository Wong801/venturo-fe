<script setup lang="ts">
import { useCartStore } from '@/stores/cart';
import { storeToRefs } from 'pinia';
import ItemCart from './ItemCart.vue';
import ItemVoucher from './ItemVoucher.vue';
import { useVoucherStore } from '@/stores/voucher';
import { useOrderStore } from '@/stores/order';
import { useToast } from 'vue-toastification';

interface LayoutCartProps {
  modelValue: string
}

defineProps<LayoutCartProps>()

const toast = useToast()

const cartStore = useCartStore()
const voucherStore = useVoucherStore()
const orderStore = useOrderStore()

const { items } = storeToRefs(cartStore)
const { voucher } = storeToRefs(voucherStore)

const emit = defineEmits(['update:modelValue'])

const close = () => {
  emit('update:modelValue', 'close')
}

const makeOrder = async () => {
  try {
    const msg = await orderStore.makeOrder(voucher.value?.nominal || 0, cartStore.totalPrice, items.value, voucher.value?.id)
    toast.success(msg)
  } catch (error) {
    toast.error(error as string)
  }
}
</script>

<template>
  <div @click="close" class="fixed top-0 right-0 bg-black bg-opacity-30 w-screen h-screen">
    <div @click.prevent.stop class="fixed top-0 right-0 border w-1/3 h-full bg-white"> 
      <div class="border-b flex justify-between items-center mx-4 px-2 py-4">
        <h4>Main Course</h4>
        <button @click="close" class="font-bold px-2">x</button>
      </div>

      <div class="border-b py-4 h-3/5 overflow-y-scroll px-4">
        <ItemCart v-for="item in items" :key="item.id" :item="item" />
      </div>

      <ItemVoucher v-show="items.length" class="px-6" />

      <div class="absolute bottom-0 bg-white w-full px-2 py-4 flex flex-col items-center">
        <div class="bg-gray-200 px-2 m-2 py-1 rounded-md w-full">
          <div v-if="voucher" class="flex justify-between">
            <h5>Discount: </h5>
            <p>
              {{ voucher?.nominal }}
            </p>
          </div>
          <div class="flex justify-between">
            <h5>Total: </h5>
            <p v-if="voucher">
              {{ cartStore.totalPrice - voucher.nominal < 0 ? 0 : cartStore.totalPrice - voucher.nominal }}
            </p>
            <p v-else>
              {{ cartStore.totalPrice }}
            </p>
          </div>
        </div>
        <button @click="makeOrder" :disabled="!items.length" class="disabled:bg-cyan-800 w-11/12 bg-cyan-500 text-white rounded-md py-2">Buat Pesanan</button>
      </div>
    </div>
  </div>
</template>