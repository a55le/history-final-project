"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import type { Exhibit } from "@/lib/db"
import { ChevronLeft, ChevronRight } from "lucide-react"
import styles from "./timeline.module.css"

interface TimelineProps {
  exhibits: Exhibit[]
}

export function Timeline({ exhibits }: TimelineProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    checkScroll()
    window.addEventListener("resize", checkScroll)
    return () => window.removeEventListener("resize", checkScroll)
  }, [])

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 350
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
      setTimeout(checkScroll, 300)
    }
  }

  return (
    <div className={styles.wrapper}>
      <button
        className={`${styles.navButton} ${styles.navButtonLeft}`}
        onClick={() => scroll("left")}
        disabled={!canScrollLeft}
      >
        <ChevronLeft />
      </button>
      <button
        className={`${styles.navButton} ${styles.navButtonRight}`}
        onClick={() => scroll("right")}
        disabled={!canScrollRight}
      >
        <ChevronRight />
      </button>

      <div ref={scrollRef} onScroll={checkScroll} className={styles.container}>
        {exhibits.map((exhibit) => (
          <Link key={exhibit.id} href={`/halls/${exhibit.hallId}/exhibits/${exhibit.id}`} className={styles.item}>
            <div className={styles.itemContent}>
              <div className={styles.year}>
                <span className={styles.yearText}>{exhibit.startDate === exhibit.endDate ? exhibit.startDate : `${exhibit.startDate}-${exhibit.endDate}`}</span>
              </div>

              <div className={styles.lineWrapper}>
                <div className={styles.line} />
                <div className={styles.dot} />
              </div>

              <div className={styles.card}>
                <h4 className={styles.cardTitle}>{exhibit.title}</h4>
                <p className={styles.cardDescription}>{exhibit.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
