"use server"

import { cookies } from "next/headers"

// Mock user database
export interface User {
  id: string
  email: string
  password: string
  firstName: string
  lastName: string
  patronymic?: string
  createdAt: string
}

// Mock data store
const mockUsers: User[] = [
  {
    id: "1",
    email: "admin@museum.ru",
    password: "admin123",
    firstName: "Иван",
    lastName: "Петров",
    patronymic: "Сергеевич",
    createdAt: "2024-01-01",
  },
  {
    id: "2",
    email: "user@museum.ru",
    password: "user123",
    firstName: "Мария",
    lastName: "Иванова",
    createdAt: "2024-02-15",
  },
]

// Mock favorites store
interface FavoritesStore {
  [userId: string]: {
    halls: string[]
    exhibits: string[]
  }
}

const mockFavorites: FavoritesStore = {
  "1": {
    halls: ["kievan-rus"],
    exhibits: ["baptism-of-rus"],
  },
  "2": {
    halls: [],
    exhibits: [],
  },
}

export interface AuthResult {
  success: boolean
  error?: string
  user?: Omit<User, "password">
}

// Sign up
export async function signUp(data: {
  email: string
  password: string
  firstName: string
  lastName: string
  patronymic?: string
}): Promise<AuthResult> {
  const existingUser = mockUsers.find((u) => u.email === data.email)
  if (existingUser) {
    return { success: false, error: "Пользователь с таким email уже существует" }
  }

  const newUser: User = {
    id: String(mockUsers.length + 1),
    email: data.email,
    password: data.password,
    firstName: data.firstName,
    lastName: data.lastName,
    patronymic: data.patronymic || undefined,
    createdAt: new Date().toISOString().split("T")[0],
  }

  mockUsers.push(newUser)
  mockFavorites[newUser.id] = { halls: [], exhibits: [] }

  // Set auth token in cookie
  const cookieStore = await cookies()
  const token = Buffer.from(JSON.stringify({ userId: newUser.id })).toString("base64")
  cookieStore.set("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })

  const { password: _, ...userWithoutPassword } = newUser
  return { success: true, user: userWithoutPassword }
}

// Sign in
export async function signIn(email: string, password: string): Promise<AuthResult> {
  const user = mockUsers.find((u) => u.email === email && u.password === password)

  if (!user) {
    return { success: false, error: "Неверный email или пароль" }
  }

  // Set auth token in cookie
  const cookieStore = await cookies()
  const token = Buffer.from(JSON.stringify({ userId: user.id })).toString("base64")
  cookieStore.set("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })

  const { password: _, ...userWithoutPassword } = user
  return { success: true, user: userWithoutPassword }
}

// Sign out
export async function signOut(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete("auth_token")
}

// Get current user
export async function getCurrentUser(): Promise<Omit<User, "password"> | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get("auth_token")?.value

  if (!token) {
    return null
  }

  try {
    const { userId } = JSON.parse(Buffer.from(token, "base64").toString("utf-8"))
    const user = mockUsers.find((u) => u.id === userId)
    if (!user) return null

    const { password: _, ...userWithoutPassword } = user
    return userWithoutPassword
  } catch {
    return null
  }
}

// Update user profile
export async function updateProfile(data: {
  firstName?: string
  lastName?: string
  patronymic?: string
  email?: string
}): Promise<AuthResult> {
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    return { success: false, error: "Не авторизован" }
  }

  const userIndex = mockUsers.findIndex((u) => u.id === currentUser.id)
  if (userIndex === -1) {
    return { success: false, error: "Пользователь не найден" }
  }

  // Check if email is being changed to existing one
  if (data.email && data.email !== currentUser.email) {
    const emailExists = mockUsers.some((u) => u.email === data.email && u.id !== currentUser.id)
    if (emailExists) {
      return { success: false, error: "Этот email уже используется" }
    }
  }

  mockUsers[userIndex] = {
    ...mockUsers[userIndex],
    firstName: data.firstName ?? mockUsers[userIndex].firstName,
    lastName: data.lastName ?? mockUsers[userIndex].lastName,
    patronymic: data.patronymic ?? mockUsers[userIndex].patronymic,
    email: data.email ?? mockUsers[userIndex].email,
  }

  const { password: _, ...userWithoutPassword } = mockUsers[userIndex]
  return { success: true, user: userWithoutPassword }
}

// Favorites functions
export async function getUserFavorites(): Promise<{ halls: string[]; exhibits: string[] } | null> {
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    return null
  }

  return mockFavorites[currentUser.id] || { halls: [], exhibits: [] }
}

export async function toggleFavoriteHall(hallId: string): Promise<{ success: boolean; isFavorite: boolean }> {
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    return { success: false, isFavorite: false }
  }

  if (!mockFavorites[currentUser.id]) {
    mockFavorites[currentUser.id] = { halls: [], exhibits: [] }
  }

  const halls = mockFavorites[currentUser.id].halls
  const index = halls.indexOf(hallId)

  if (index === -1) {
    halls.push(hallId)
    return { success: true, isFavorite: true }
  } else {
    halls.splice(index, 1)
    return { success: true, isFavorite: false }
  }
}

export async function toggleFavoriteExhibit(exhibitId: string): Promise<{ success: boolean; isFavorite: boolean }> {
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    return { success: false, isFavorite: false }
  }

  if (!mockFavorites[currentUser.id]) {
    mockFavorites[currentUser.id] = { halls: [], exhibits: [] }
  }

  const exhibits = mockFavorites[currentUser.id].exhibits
  const index = exhibits.indexOf(exhibitId)

  if (index === -1) {
    exhibits.push(exhibitId)
    return { success: true, isFavorite: true }
  } else {
    exhibits.splice(index, 1)
    return { success: true, isFavorite: false }
  }
}

export async function isHallFavorite(hallId: string): Promise<boolean> {
  const favorites = await getUserFavorites()
  return favorites?.halls.includes(hallId) || false
}

export async function isExhibitFavorite(exhibitId: string): Promise<boolean> {
  const favorites = await getUserFavorites()
  return favorites?.exhibits.includes(exhibitId) || false
}
