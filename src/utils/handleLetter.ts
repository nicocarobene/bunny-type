
import { incrementIncorrectLetter, incrementCorrectLetter } from "@/store/bunnystore";
export const handleLetter = ({ userInput, currentLetter, second }: { userInput: string; currentLetter: string, second: number }) => {
  const isCorrect = userInput === currentLetter
  const letterClass = isCorrect ? 'correct' : 'incorrect'
  letterClass === 'correct' ? incrementCorrectLetter({ count: 1, second }) : incrementIncorrectLetter({ count: 1, second })
  return letterClass
}

export const toggleClass = ({ element, className }: { element: HTMLElement, className: string }) => {
  element.classList[!element.classList.contains(className) ? 'add' : 'remove'](className)
}
export const changeLetter = ({ element, next = true }: { element: HTMLSpanElement, next?: boolean }): HTMLSpanElement => {
  const nextLetter = next ? element.nextElementSibling as HTMLSpanElement : element.previousElementSibling as HTMLSpanElement
  return nextLetter ?? element
}
export const handleParent = ({ element }: { element: HTMLSpanElement }): HTMLSpanElement | null => {
  element.classList.remove('currentLetter', 'last-letter')
  const parent$ = element.parentElement
  const nextElementSibling = parent$?.nextElementSibling
  const nextLetterSibling$ = nextElementSibling?.firstElementChild as HTMLSpanElement
  if (nextLetterSibling$) return nextLetterSibling$ as HTMLSpanElement
  return null
}

export const confirError = (element: HTMLSpanElement) => {
  const parent$ = element.parentElement
  const isEveryCorrect = parent$?.querySelectorAll('.correct').length === parent$?.children.length
  parent$?.classList[isEveryCorrect ? 'remove' : 'add']('error')
}