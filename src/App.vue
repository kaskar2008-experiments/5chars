<script setup lang="ts">
import { computed, ref, watch, shallowRef, defineAsyncComponent } from 'vue';
import GameLogo from './components/GameLogo.vue';
import Modal from './components/Modal.vue';
import words from './words.json';

const rulesModal = () => import('./components/Rules.vue');

const currentModal = shallowRef<(() => Promise<any>) | null>(null);
const modalTitle = ref('');

const keyboard = [
  ['й','ц','у','к','е','н','г','ш','щ','з','х','ъ'],
  ['ф','ы','в','а','п','р','о','л','д','ж','э'],
  ['я','ч','с','м','и','т','ь','б','ю']
]

const onModalClose = () => {
  currentModal.value = null;
}

const openRulesModal = () => {
  modalTitle.value = 'Правила игры';
  currentModal.value = defineAsyncComponent(rulesModal);
}

function getRandomArbitrary(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

window.addEventListener('keydown', (event: KeyboardEvent) => {
  if (event.key.match(/[а-я]/)) {
    addCharGuess(event.key);
  }

  if (event.key === 'Backspace') {
    deleteCharGuess();
  }

  if (event.key === 'Enter') {
    doGuess(myGuess.value);
  }
}, true);

const currentWord = ref('');
const guesses = ref<any>([]);
const myGuess = ref('');
const hasGuessed = ref(false);
const canGuess = computed(() => guesses.value.length < 6);
const hasGameEnded = computed(() => {
  return !canGuess.value || hasGuessed.value;
});
const isNotAWord = ref(false);
const charStatuses = ref<Record<string, string>>({});

const addCharGuess = (char: string) => {
  if (!canGuess.value || hasGameEnded.value || myGuess.value.length >= 5) {
    return;
  }

  myGuess.value += char;
}

const deleteCharGuess = () => {
  if (myGuess.value.length === 0 || hasGameEnded.value) {
    return;
  }

  myGuess.value = myGuess.value.substring(0, myGuess.value.length - 1);
}

const newGame = () => {
  myGuess.value = '';
  guesses.value = [];
  isNotAWord.value = false;
  charStatuses.value = {};
  currentWord.value = words[getRandomArbitrary(0, words.length - 1)];
  hasGuessed.value = false;
}

watch(myGuess, () => {
  isNotAWord.value = false;
});

const doGuess = (word: string) => {
  if (!canGuess.value || !word || word.length < 5 || hasGameEnded.value) {
    return;
  }

  if (!words.includes(word.toUpperCase())) {
    isNotAWord.value = true;
    return;
  }

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

  guesses.value.push(newGuess);

  if (word.toUpperCase() === currentWord.value.toUpperCase()) {
    hasGuessed.value = true;
  }

  myGuess.value = '';
}

const getCellClassName = (rindex: number, cindex: number) => {
  const guess = guesses.value[rindex];

  if (!guess) {
    return '';
  }

  return guess.info[cindex];
}

newGame();
</script>

<template lang="pug">
modal(v-if="currentModal" @close="onModalClose" :title="modalTitle")
  component(:is="currentModal")
.app
  header
    game-logo(text="5chars")
    .actions
      button(@click="openRulesModal") ?
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
    template(v-if="!hasGameEnded")
      .keyboard
        .row(v-for="(row, rindex) in keyboard")
          template(v-if="rindex === 2")
            .cell.ok(@click="doGuess(myGuess)")
              span ✓
          template(v-for="char in row" :key="char")
            .cell(@click="addCharGuess(char)" :class="charStatuses[char.toUpperCase()]")
              span {{ char }}
          template(v-if="rindex === 2")
            .cell.delete(@click="deleteCharGuess")
              span ✕

    template(v-else)
      .result(v-if="!canGuess")
        .word {{ currentWord }}

      .end-game(v-else)
        .action
          button(@click="newGame") Играть еще
</template>

<style scoped lang="stylus">
.app
  width 100vw
  margin 0 auto
  max-width 560px
  padding 20px 0
  box-sizing border-box
  display grid
  grid-gap 24px
  line-height 1
  position relative
  z-index 1

header
  padding 8px
  display flex
  justify-content space-between
  align-items center

  .actions
    button
      padding 8px 13px
      border none
      background-color #ccc
      cursor pointer
      border-radius 5px
      color black

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
    position relative

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

footer
  padding 20px 16px

  .end-game
    .action
      display flex
      justify-content center

      button
        background-color #333
        color yellow
        border none
        padding 15px 25px
        border-radius 8px
        font-size 24px
        cursor pointer

  .keyboard
    display flex
    flex-direction column
    gap 10px

    .row
      display flex
      margin 0 auto
      gap 4px
      width 100%

      &:nth-child(2)
        width 90%

    .cell
      box-shadow: 0 0 1px #999;
      cursor pointer
      border-radius 5px
      font-size 24px
      width 12%
      aspect-ratio 1 / 1.2
      position relative

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
        aspect-ratio initial
        padding 8px 12px

      &.ok
        background-color green
      &.delete
        background-color red

      span
        display flex
        position absolute
        left 0
        top 0
        right 0
        bottom 0
        align-items center
        justify-content center

  .result
    text-align center
    font-size 50px
    color green
</style>
