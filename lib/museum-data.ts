import data from "@/data/museum-data.json"

export interface Hall {
  id: string
  title: string
  description: string
  image: string
  exhibitsCount: number
}

export interface Exhibit {
  id: string
  hallId: string
  title: string
  description: string
  fullDescription: string
  date: string
  year: number
  image: string
  artifacts: string[]
}

export interface Developer {
  id: string
  name: string
  role: string
  avatar: string
  description: string
}

export function getAllHalls(): Hall[] {
  return data.halls
}

export function getHallById(id: string): Hall | undefined {
  return data.halls.find((hall) => hall.id === id)
}

export function getAllExhibits(): Exhibit[] {
  return data.exhibits
}

export function getExhibitsByHall(hallId: string): Exhibit[] {
  return data.exhibits.filter((exhibit) => exhibit.hallId === hallId)
}

export function getExhibitById(hallId: string, exhibitId: string): Exhibit | undefined {
  return data.exhibits.find((exhibit) => exhibit.hallId === hallId && exhibit.id === exhibitId)
}

export function getExhibitsSortedByDate(): Exhibit[] {
  return [...data.exhibits].sort((a, b) => a.year - b.year)
}

export function getDevelopers(): Developer[] {
  return data.developers
}
