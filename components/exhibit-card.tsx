import Link from "next/link"
import Image from "next/image"
import type { Exhibit } from "@/lib/db"
import { Calendar, ArrowRight } from "lucide-react"
import { FavoriteButton } from "./favorite-button"
import styles from "./exhibit-card.module.css"

interface ExhibitCardProps {
  exhibit: Exhibit
  showHallLink?: boolean
  isFavorite?: boolean
  isAuthenticated?: boolean
}

export function ExhibitCard({ exhibit, showHallLink = true, isFavorite = false, isAuthenticated = false }: ExhibitCardProps) {
  return (
    <Link href={`/halls/${exhibit.hallId}/exhibits/${exhibit.id}`} className={styles.link}>
      <article className={styles.card}>
        <div className={styles.imageWrapper}>
          <Image src={exhibit.image || "/placeholder.svg"} alt={exhibit.title} fill className={styles.image} />
          <div className={styles.imageOverlay} />
          <div className={styles.favoriteWrapper}>
            <FavoriteButton type="exhibit" id={exhibit.id} isFavorite={isFavorite} isAuthenticated={isAuthenticated} />
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.date}>
            <Calendar />
            <span>{exhibit.startDate === exhibit.endDate ? exhibit.startDate : `${exhibit.startDate}-${exhibit.endDate}`}</span>
          </div>
          <h3 className={styles.title}>{exhibit.title}</h3>
          <p className={styles.description}>{exhibit.description}</p>
          <div className={styles.action}>
            <span>Подробнее</span>
            <ArrowRight />
          </div>
        </div>
      </article>
    </Link>
  )
}
