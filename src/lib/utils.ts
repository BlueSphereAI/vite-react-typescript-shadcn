import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Image URLs
const IMAGE_BASE_URL = 'https://mediglobal-connect.greensphere.one/images'
export const IMAGES = {
  logo: `${IMAGE_BASE_URL}/logo.jpg`,
  advisorAvatar: `${IMAGE_BASE_URL}/advisor-avatar.jpg`,
  defaultProcedure: `${IMAGE_BASE_URL}/procedures/default.jpg`
} as const

// Preload images
export const preloadImages = () => {
  Object.values(IMAGES).forEach(url => {
    const img = new Image()
    img.src = url
  })
}

// Get procedure image URL
export const getProcedureImageUrl = (procedureId: string) => {
  return `${IMAGE_BASE_URL}/procedures/${procedureId}.jpg`
}

// Generate UUID v4
export const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}
