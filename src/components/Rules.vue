<template lang="pug">
.rules
  p Загадано существительное из пяти букв в единственном числе. Нужно отгадать слово. В игре не используется буква "Ё", вместо неё используйте "Е".
  p У вас есть шесть попыток. После каждой попытки цвет букв меняется.

  hr

  .row
    .cell.miss к
    .cell.wrong а
    .cell.miss р
    .cell.miss м
    .cell.wrong а

  p Если буква белая - она есть в загаданном слове, но стоит в другом месте.
  p Если буква серая - её в слове нет.

  .row
    .cell.hit п
    .cell.wrong е
    .cell.hit р
    .cell.wrong е
    .cell.wrong ц

  p Желтый цвет буквы означает, что она есть в загаданном слове и стоит на своём месте.

  .row
    .cell.non-word а
    .cell.non-word н
    .cell.non-word т
    .cell.non-word о
    .cell.non-word н

  p Красный цвет - недопустимое слово.

  .row
    .cell.hit д
    .cell.hit о
    .cell.hit ж
    .cell.hit д
    .cell.hit ь

  p Когда вы угадаете слово - все буквы станут желтыми.

  hr

  p В загаданном слове могут встретиться повторяющиеся буквы, например буква "А" в слове "Карта".
</template>

<style scoped lang="stylus">
.rules
  color #fff
  font-size 18px

.row
  display flex
  gap 10px
  margin 20px

.cell
  width 25%
  aspect-ratio 1 / 1
  border 1px solid yellow
  border-radius 8px
  font-size 40px
  line-height 1.6
  display flex
  align-content center
  justify-content center
  text-transform uppercase
  position relative
  align-items center

  &.non-word
    border-color red
    color red

  &.wrong,
  &.miss,
  &.hit
    border none

  &.wrong
    background-color var(--wrong-char-bg)
    color var(--wrong-char-color)

  &.miss
    background-color var(--miss-char-bg)
    color var(--miss-char-color)

  &.hit
    background-color var(--hit-char-bg)
    color var(--hit-char-color)

  span
    display flex
    position absolute
    left 0
    top 0
    right 0
    bottom 0
    align-items center
    justify-content center
</style>
