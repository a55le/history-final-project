import Link from "next/link"
import Image from "next/image"
import type { Exhibit } from "@/lib/museum-data"
import { Calendar, ArrowRight } from "lucide-react"
import styles from "./exhibit-card.module.css"

interface ExhibitCardProps {
  exhibit: Exhibit
  showHallLink?: boolean
}

export function ExhibitCard({ exhibit, showHallLink = true }: ExhibitCardProps) {
  return (
    <Link href={`/halls/${exhibit.hallId}/exhibits/${exhibit.id}`} className={styles.link}>
      <article className={styles.card}>
        <div className={styles.imageWrapper}>
          <Image src={exhibit.image || "/placeholder.svg"} alt={exhibit.title} fill className={styles.image} />
          <div className={styles.imageOverlay} />
        </div>
        <div className={styles.content}>
          <div className={styles.date}>
            <Calendar />
            <span>{exhibit.date}</span>
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
