export type Vehicle = {
  id: number
  location: number
  startCity: string
  startCountry: string
  endCity: string
  endCountry: string
  warnings: string
  progress: number
}

export type Vessel = {
  id: number
  name: string
  location: number
  startCity: string
  startCountry: string
  endCity: string
  endCountry: string
  warnings: string
  progress: number
}

export type logisticsType = {
  vehicles: Vehicle[]
}
