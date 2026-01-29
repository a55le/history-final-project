"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { signIn } from "@/lib/auth"
import { Landmark, Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react"
import styles from "./page.module.css"

export default function SignInPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const result = await signIn(email, password)
      if (result.success) {
        router.push("/")
        router.refresh()
      } else {
        setError(result.error || "Ошибка входа")
      }
    } catch {
      setError("Произошла ошибка. Попробуйте снова.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.wrapper}>
      <Header />

      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.card}>
            <div className={styles.header}>
              <div className={styles.logoIcon}>
                <Landmark />
              </div>
              <h1 className={styles.title}>Вход в аккаунт</h1>
              <p className={styles.subtitle}>Войдите, чтобы сохранять избранные экспонаты</p>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              {error && <div className={styles.error}>{error}</div>}

              <div className={styles.field}>
                <label htmlFor="email" className={styles.label}>
                  Email
                </label>
                <div className={styles.inputWrapper}>
                  <Mail className={styles.inputIcon} />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@museum.ru"
                    className={styles.input}
                    required
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="password" className={styles.label}>
                  Пароль
                </label>
                <div className={styles.inputWrapper}>
                  <Lock className={styles.inputIcon} />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Введите пароль"
                    className={styles.input}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={styles.togglePassword}
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

              <button type="submit" className={styles.submitButton} disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className={styles.spinner} />
                    Вход...
                  </>
                ) : (
                  "Войти"
                )}
              </button>
            </form>

            <div className={styles.footer}>
              <p>
                Нет аккаунта?{" "}
                <Link href="/signup" className={styles.link}>
                  Зарегистрироваться
                </Link>
              </p>
            </div>

            <div className={styles.demo}>
              <p className={styles.demoTitle}>Тестовые данные:</p>
              <p className={styles.demoText}>Email: admin@museum.ru</p>
              <p className={styles.demoText}>Пароль: admin123</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
