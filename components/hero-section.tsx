import { ArrowDown } from "lucide-react"
import Link from "next/link"
import styles from "./hero-section.module.css"

export function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.pattern}>
        <div className={styles.patternInner} />
      </div>

      <div className={styles.container}>
        <div className={styles.content}>
          <span className={styles.badge}>Итоговый проект по истории</span>
          <h1 className={styles.title}>Виртуальный музей истории России</h1>
          <p className={styles.description}>
            Путешествие сквозь века: от призвания варягов до покорения космоса. Исследуйте ключевые события и артефакты,
            определившие судьбу нашей страны.
          </p>
          <div className={styles.buttons}>
            <Link href="#halls" className={styles.primaryBtn}>
              Начать экскурсию
            </Link>
            <Link href="#timeline" className={styles.outlineBtn}>
              Лента времени
            </Link>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginTop: "64px" }}>
          <Link href="#halls" className={styles.scrollHint}>
            <span>Листайте вниз</span>
            <ArrowDown />
          </Link>
        </div>
      </div>
    </section>
  )
}
