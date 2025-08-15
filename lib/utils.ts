import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {
  saveToLocalStorage,
  readFromLocalStorage,
  removeFromLocalStorage,
} from "./ls"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export {
  cn,
  saveToLocalStorage,
  readFromLocalStorage,
  removeFromLocalStorage,
}
