<template lang="pug">
.logo-text
  span(v-for="char in text.toUpperCase().split('')") {{ char }}
</template>

<script setup lang="ts">
defineProps<{ text: string }>()
</script>

<style scoped lang="stylus">
.logo-text
  display inline-flex
  gap 2px
  color black
  font-weight 600
  font-size 20px

  span
    display flex
    flex-grow 1
    width 30px
    height 30px
    align-items center
    background-color yellow
    border-radius 5px
    justify-content space-evenly
</style>
