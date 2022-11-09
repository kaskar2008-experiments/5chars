<template lang="pug">
.shadow(@click="onClose")
.modal-container
  .modal-content
    .title
      .text {{ props.title }}
      .action(@click="onClose") X
    .content
      slot
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue';

const props = defineProps({
  title: String,
})

const emit = defineEmits(['close']);

const onClose = () => {
  emit('close');
}

onMounted(() => {
  document.body.style.overflowY = 'hidden'
});

onBeforeUnmount(() => {
  document.body.style.overflowY = 'auto'
});
</script>

<style scoped lang="stylus">
.shadow
  position fixed
  top 0
  left 0
  bottom 0
  right 0
  background-color rgba(0,0,0,0.5)
  backdrop-filter blur(3px)
  z-index 10

.modal-container
  height 100vh
  width 100vw
  display flex
  align-items center
  justify-content center
  position absolute

.modal-content
  max-width 560px
  width 100%
  border-radius 15px
  background-color #444
  padding 16px
  max-height 80%
  overflow hidden
  position relative
  z-index 11
  display flex
  flex-direction column

.title
  display flex
  justify-content space-between
  align-items center
  font-size 20px
  font-weight bold
  color yellow

.content
  overflow-y auto

.action
  cursor pointer
  padding 10px
  color white
</style>
