"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Landmark, Menu, X, User, LogIn } from "lucide-react"
import { useState, useEffect } from "react"
import { getCurrentUser } from "@/lib/auth"
import styles from "./header.module.css"

const navigation = [
  { name: "Главная", href: "/" },
  { name: "Залы", href: "/#halls" },
  { name: "Экспонаты", href: "/#exhibits" },
  { name: "О нас", href: "/about" },
]

interface UserData {
  id: string
  email: string
  firstName: string
  lastName: string
}

export function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [user, setUser] = useState<UserData | null>(null)

  useEffect(() => {
    getCurrentUser().then(setUser)
  }, [])

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

        <div className={styles.authSection}>
          {user ? (
            <Link href="/profile" className={styles.profileLink}>
              <div className={styles.profileAvatar}>
                {user.firstName[0]}{user.lastName[0]}
              </div>
              <span className={styles.profileName}>{user.firstName}</span>
            </Link>
          ) : (
            <Link href="/signin" className={styles.signInLink}>
              <LogIn />
              <span>Войти</span>
            </Link>
          )}
        </div>

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
            <li className={styles.mobileAuthItem}>
              {user ? (
                <Link
                  href="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className={styles.mobileNavLink}
                >
                  <User className={styles.mobileAuthIcon} />
                  Профиль
                </Link>
              ) : (
                <Link
                  href="/signin"
                  onClick={() => setMobileMenuOpen(false)}
                  className={styles.mobileNavLink}
                >
                  <LogIn className={styles.mobileAuthIcon} />
                  Войти
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
