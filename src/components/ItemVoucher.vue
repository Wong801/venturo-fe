<script setup lang="ts">
import { useVoucherStore } from '@/stores/voucher';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';

const toast = useToast()

const voucherStore = useVoucherStore()

const code = ref('')

const getVoucher = async () => {
  try {
    await voucherStore.getVoucher(code.value)
    toast.success('Voucher ketemu! nikmati diskon anda')
  } catch (error) {
    toast.error(error as string)
  }
}
</script>

<template>
  <div class="py-4">
    <h5 class="text-sm">Tambah Voucher</h5>
    <input v-model="code" @keydown.enter="getVoucher" type="text" placeholder="Masukkan vouchermu disini..." class="border-2 rounded-md w-full px-2 py-1">
  </div>
</template>