import Link from "next/link"
import Image from "next/image"
import type { Hall } from "@/lib/db"
import { ArrowRight } from "lucide-react"
import { FavoriteButton } from "./favorite-button"
import styles from "./hall-card.module.css"

interface HallCardProps {
  hall: Hall
  isFavorite?: boolean
  isAuthenticated?: boolean
}

export function HallCard({ hall, isFavorite = false, isAuthenticated = false }: HallCardProps) {
  return (
    <Link href={`/halls/${hall.id}`} className={styles.link}>
      <article className={styles.card}>
        <div className={styles.imageWrapper}>
          <Image src={hall.image || "/placeholder.svg"} alt={hall.title} fill className={styles.image} />
          <div className={styles.imageOverlay} />
          <div className={styles.badge}>
            <span className={styles.badgeText}>{hall.exhibitsCount} экспонатов</span>
          </div>
          <div className={styles.favoriteWrapper}>
            <FavoriteButton type="hall" id={hall.id} isFavorite={isFavorite} isAuthenticated={isAuthenticated} />
          </div>
        </div>
        <div className={styles.content}>
          <h3 className={styles.title}>{hall.title}</h3>
          <p className={styles.description}>{hall.description}</p>
          <div className={styles.action}>
            <span>Перейти в зал</span>
            <ArrowRight />
          </div>
        </div>
      </article>
    </Link>
  )
}
