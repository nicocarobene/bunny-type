import { writable } from "svelte/store";
import { INITIAL_STATE } from "../utils/const";


const bunnyStore = writable(structuredClone(INITIAL_STATE))

export const { subscribe } = bunnyStore

export const incrementCorrectLetter = ({ count = 1, second }: {
  count?: number, second: number
}) => {
  bunnyStore.update(store => {
    store.total += count
    store.correctLetter[second] = store.correctLetter[second] ? store.correctLetter[second] + count : count
    return store
  })
}

export const incrementIncorrectLetter = ({ count = 1, second }: {
  count?: number, second: number
}) => {
  bunnyStore.update(store => {
    store.total += count
    store.incorrectLetter[second] = store.incorrectLetter[second] ? store.incorrectLetter[second] + count : count
    return store
  })
}
export const setTimeBunnyGame = (time = 30) => {
  bunnyStore.update(store => {
    store.time = time
    store.correctLetter = refillObject(time)
    store.incorrectLetter = refillObject(time)
    return store
  })
}
export const gameOverBunnyGame = () => {
  bunnyStore.update(store => {
    store.gameOver = true
    return store
  })
}

export const restartBunnyGame = () => {
  bunnyStore.set(INITIAL_STATE)
}
function refillObject(timer: number, initalCounter = 0) {
  const obj: { [key: number]: number } = {}
  for (let i = 0; i < timer; i++) {
    obj[i] = initalCounter
  }
  return obj
}