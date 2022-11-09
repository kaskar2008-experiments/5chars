<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import GameLogo from './components/GameLogo.vue'
import words from './words.json';

const keyboard = [
  ['й','ц','у','к','е','н','г','ш','щ','з','х','ъ'],
  ['ф','ы','в','а','п','р','о','л','д','ж','э'],
  ['я','ч','с','м','и','т','ь','б','ю']
]

function getRandomArbitrary(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const currentWord = ref('');
const guesses = ref<any>([]);
const myGuess = ref('');
const canGuess = computed(() => guesses.value.length < 6);
const isNotAWord = ref(false);
const charStatuses = ref<Record<string, string>>({});

const addCharGuess = (char: string) => {
  if (myGuess.value.length >= 5) {
    return;
  }

  myGuess.value += char;
}

const deleteCharGuess = () => {
  if (myGuess.value.length === 0) {
    return;
  }

  myGuess.value = myGuess.value.substring(0, myGuess.value.length - 1);
}

currentWord.value = words[getRandomArbitrary(0, words.length - 1)];

watch(myGuess, () => {
  isNotAWord.value = false;
});

const doGuess = (window as any).doGuess = (word: string) => {
  if (!canGuess.value || !word || word.length < 5) {
    return;
  }

  // if (!words.includes(word)) {
  //   isNotAWord.value = true;
  //   return;
  // }

  const newGuess = {
    word,
    info: [] as Array<string>,
  };

  word.toUpperCase().split('').forEach((char, index) => {
    if (currentWord.value[index] === char) {
      newGuess.info[index] = 'hit';
      charStatuses.value[char] = newGuess.info[index];
      return;
    }

    if (!currentWord.value.includes(char)) {
      newGuess.info[index] = 'wrong';
      if (!charStatuses.value[char]) {
        charStatuses.value[char] = newGuess.info[index];
      }
      return;
    }

    if (currentWord.value.includes(char)) {
      newGuess.info[index] = 'miss';
      if (charStatuses.value[char] !== 'hit') {
        charStatuses.value[char] = newGuess.info[index];
      }
      return;
    }
  });

  console.log(charStatuses.value);

  guesses.value.push(newGuess);

  myGuess.value = '';
}

const getCellClassName = (rindex: number, cindex: number) => {
  const guess = guesses.value[rindex];

  if (!guess) {
    return '';
  }

  return guess.info[cindex];
}
</script>

<template lang="pug">
.app
  header
    game-logo(text="5chars")
  main
    .field
      .row(v-for="(row, rindex) in 6")
        template(v-for="(cell, cindex) in 5")
          .cell(v-if="guesses[rindex]" :class="getCellClassName(rindex, cindex)")
            span {{ guesses[rindex].word[cindex] }}

          .cell(v-else-if="rindex === guesses.length" :class="{ 'non-word': isNotAWord }")
            span {{ myGuess[cindex] }}

          .cell(v-else)
  footer
    .keyboard(v-if="canGuess")
      .row(v-for="(row, rindex) in keyboard")
        template(v-if="rindex === 2")
          .cell.ok(@click="doGuess(myGuess)") ✓
        template(v-for="char in row" :key="char")
          .cell(@click="addCharGuess(char)" :class="charStatuses[char.toUpperCase()]") {{ char }}
        template(v-if="rindex === 2")
          .cell.delete(@click="deleteCharGuess") ✕

    .result(v-else)
      .word {{ currentWord }}
</template>

<style scoped lang="stylus">
.app
  min-height 100vh
  max-width 500px
  width 100%
  margin 0 auto
  padding 20px 0
  box-sizing border-box
  display grid
  grid-template-rows auto 1fr auto
  grid-gap 24px
  line-height 1

header
  padding 8px

.field
  padding 8px
  display grid
  grid-gap 10px

  .row
    display flex
    gap 10px

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

    &.non-word
      border-color red
      color red

    &.wrong,
    &.miss,
    &.hit
      border none

    &.wrong
      background-color #555

    &.miss
      background-color #fff
      color black

    &.hit
      background-color yellow
      color black

    span
      display block

footer
  padding-bottom 20px

  .keyboard
    display flex
    flex-direction column
    gap 10px

    .row
      display flex
      margin 0 auto
      gap 4px

    .cell
      box-shadow: 0 0 1px #999;
      padding 8px
      border-radius 5px
      font-size 23px

      &.wrong
        background-color #555

      &.miss
        background-color #fff
        color black

      &.hit
        background-color yellow
        color black

      &.ok,
      &.delete
        border 1px solid rgba(0,0,0,0)

      &.ok
        background-color green
        padding 8px 12px
      &.delete
        background-color red
        padding 8px 12px

  .result
    text-align center
    font-size 50px
    color green
</style>
