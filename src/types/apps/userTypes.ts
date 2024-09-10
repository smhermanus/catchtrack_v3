// Type Imports
import type { ThemeColor } from '@core/types'

export type UsersType = {
  id: number
  role: string
  permit: string
  email: string
  status: string
  statusapplications: string
  avatar: string
  company: string
  country: string
  contact: string
  fullName: string
  username: string
  currentPlan: string
  avatarColor?: ThemeColor
}
