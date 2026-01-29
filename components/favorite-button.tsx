"use client"

import { useState } from "react"
import { Heart } from "lucide-react"
import { useRouter } from "next/navigation"
import { toggleFavoriteHall, toggleFavoriteExhibit } from "@/lib/auth"
import styles from "./favorite-button.module.css"

interface FavoriteButtonProps {
  type: "hall" | "exhibit"
  id: string
  isFavorite: boolean
  isAuthenticated: boolean
}

export function FavoriteButton({ type, id, isFavorite: initialFavorite, isAuthenticated }: FavoriteButtonProps) {
  const router = useRouter()
  const [isFavorite, setIsFavorite] = useState(initialFavorite)
  const [loading, setLoading] = useState(false)

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!isAuthenticated) {
      router.push("/signin")
      return
    }

    setLoading(true)
    try {
      const result = type === "hall" 
        ? await toggleFavoriteHall(id)
        : await toggleFavoriteExhibit(id)

      if (result.success) {
        setIsFavorite(result.isFavorite)
      }
    } catch (error) {
      console.error("Error toggling favorite:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleClick}
      className={`${styles.button} ${isFavorite ? styles.active : ""}`}
      disabled={loading}
      aria-label={isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
      title={isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
    >
      <Heart className={styles.icon} />
    </button>
  )
}
