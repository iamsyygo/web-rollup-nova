<template>
  <Affix>affix</Affix>
</template>

<script setup lang="ts">
import { Affix } from 'ant-design-vue'
const props = defineProps<{
  offsetTop?: number
  offsetBottom?: number
}>()

console.log(props)
</script>

<!-- <style scoped lang="scss">
.affix {
  color: red;

  p {
    color: blue;
  }
}
</style> -->

<style>
h1 {
  color: red;
  left: v-bind(offsetTop);
}
</style>
