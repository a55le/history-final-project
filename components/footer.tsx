import Link from "next/link"
import { Landmark } from "lucide-react"
import styles from "./footer.module.css"

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>
              <Landmark />
            </div>
            <div className={styles.logoText}>
              <span className={styles.logoTitle}>Виртуальный музей</span>
              <span className={styles.logoSubtitle}>Итоговый проект по истории</span>
            </div>
          </div>

          <nav className={styles.nav}>
            <Link href="/" className={styles.navLink}>
              Главная
            </Link>
            <Link href="/#halls" className={styles.navLink}>
              Залы
            </Link>
            <Link href="/#exhibits" className={styles.navLink}>
              Экспонаты
            </Link>
            <Link href="/about" className={styles.navLink}>
              О нас
            </Link>
          </nav>

          <p className={styles.copyright}>© 2026 Виртуальный музей</p>
        </div>
      </div>
    </footer>
  )
}
