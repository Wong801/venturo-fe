<script setup lang="ts">
import { useMenuStore } from '@/stores/menu';
import { onMounted } from 'vue';
import ItemMenu from './ItemMenu.vue';

type MenuType = 'foods' | 'drinks'

interface ListMenuProps {
  type?: MenuType
}

const props = withDefaults(defineProps<ListMenuProps>(), {
  type: 'foods'
})

const menuStore = useMenuStore()

onMounted(async() => {
  await menuStore.fetchMenus()
})
</script>

<template>
  <div class="grid grid-flow-col grid-cols-5 gap-x-5 px-8">
    <ItemMenu v-for="menu in menuStore[props.type]" :key="menu.id" :menu="menu" />
  </div>
</template>