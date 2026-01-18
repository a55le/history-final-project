import data from "@/data/museum-data.json"
import developersData from "@/data/developers.json"
import axios from "axios";

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
  startDate: number
  endDate: number
  image: string
  artifacts: string[]
}

export interface Developer {
  name: string
  role: string
  avatar: string
  description: string
}

export async function getAllHalls(): Promise<Hall[]> {
  // const response = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}/halls`, {})
  //
  // const data: Hall[] = await response.data()
  //
  // return data

  return data.halls
}

export async function getHallById(id: string): Promise<Hall | undefined> {
  // const response = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}/halls/${id}`)
  //
  // const data: Hall | undefined = await response.data()
  //
  // return data

  return data.halls.find((hall) => hall.id === id)
}

export async function getAllExhibits(): Promise<Exhibit[]> {
  // const response = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}/exhibits`)
  //
  // const data: Exhibit[] = await response.data()
  //
  // return data

  return data.exhibits
}

export async function getExhibitsByHall(hallId: string): Promise<Exhibit[]> {
  // const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/halls/${hallId}/exhibits`)
  //
  // const data: Exhibit[] = await response.data()
  //
  // return data

  return data.exhibits.filter((exhibit) => exhibit.hallId === hallId)
}

export async function getExhibitById(exhibitId: string): Promise<Exhibit | undefined> {
  // const response = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}/exhibits/${exhibitId}`)
  //
  // const data = await response.data()
  //
  // return data

  return data.exhibits.find((exhibit) => exhibit.id === exhibitId)
}

export async function getExhibitsSortedByDate(): Promise<Exhibit[]> {
  // const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/exhibits`)
  //
  // const data: Exhibit[] = await response.data()
  //
  // const sortedData = data.sort((a, b) => a.startDate - b.startDate)
  //
  // return sortedData

  return [...data.exhibits].sort((a, b) => a.startDate - b.startDate)
}

export function getDevelopers(): Developer[] {
  return developersData
}
