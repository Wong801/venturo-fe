<script setup lang="ts">
interface IconNotifProps {
  qty: number
}

defineProps<IconNotifProps>()
</script>

<template>
  <div class="absolute top-[-0.5rem] right-[-0.5rem] bg-red-600 text-white rounded-full text-xs w-6 h-6 font-bold flex justify-center items-center">
    {{ qty }}
  </div>
</template>