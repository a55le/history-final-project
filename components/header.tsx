"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Landmark, Menu, X } from "lucide-react"
import { useState } from "react"
import styles from "./header.module.css"

const navigation = [
  { name: "Главная", href: "/" },
  { name: "Залы", href: "/#halls" },
  { name: "Экспонаты", href: "/#exhibits" },
  { name: "О нас", href: "/about" },
]

export function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>
          <div className={styles.logoIcon}>
            <Landmark />
          </div>
          <div className={styles.logoText}>
            <span className={styles.logoTitle}>Виртуальный музей</span>
            <span className={styles.logoSubtitle}>История России</span>
          </div>
        </Link>

        <ul className={styles.desktopNav}>
          {navigation.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`${styles.navLink} ${pathname === item.href ? styles.navLinkActive : ""}`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        <button className={styles.mobileMenuBtn} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className={styles.mobileNav}>
          <ul className={styles.mobileNavList}>
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`${styles.mobileNavLink} ${pathname === item.href ? styles.mobileNavLinkActive : ""}`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
