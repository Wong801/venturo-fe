<script setup lang="ts">
import ListMenu from '@/components/ListMenu.vue';
import { ref } from 'vue';

const showed = ref<'foods' | 'drinks'>('foods')
</script>

<template>
  <main>
    <div class="mx-8">
      <button 
        @click="showed = 'foods'" 
        :class="showed === 'foods' ? 'border-2 border-b-0' : '' "
        class="mb-2 px-4 py-2 border-blue-200"
      >Main Course</button>
      <button 
        @click="showed = 'drinks'" 
        :class="showed === 'drinks' ? 'border-2 border-b-0' : '' "
        class="mb-2 px-4 py-2 border-blue-200"
      >Drinks</button>
    </div>
    <ListMenu :type="showed" />
  </main>
</template>
