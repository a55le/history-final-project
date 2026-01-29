"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getCurrentUser, updateProfile, signOut } from "@/lib/auth"
import { User, Mail, Save, LogOut, Loader2 } from "lucide-react"
import styles from "./page.module.css"

interface UserData {
  id: string
  email: string
  firstName: string
  lastName: string
  patronymic?: string
  createdAt: string
}

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<UserData | null>(null)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    patronymic: "",
    email: "",
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    const loadUser = async () => {
      const currentUser = await getCurrentUser()
      if (!currentUser) {
        router.push("/signin")
        return
      }
      setUser(currentUser)
      setFormData({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        patronymic: currentUser.patronymic || "",
        email: currentUser.email,
      })
      setLoading(false)
    }
    loadUser()
  }, [router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setSaving(true)

    try {
      const result = await updateProfile({
        firstName: formData.firstName,
        lastName: formData.lastName,
        patronymic: formData.patronymic || undefined,
        email: formData.email,
      })

      if (result.success && result.user) {
        setUser(result.user)
        setSuccess("Профиль успешно обновлен")
        setTimeout(() => setSuccess(""), 3000)
      } else {
        setError(result.error || "Ошибка обновления профиля")
      }
    } catch {
      setError("Произошла ошибка. Попробуйте снова.")
    } finally {
      setSaving(false)
    }
  }

  const handleSignOut = async () => {
    await signOut()
    router.push("/")
    router.refresh()
  }

  if (loading) {
    return (
      <div className={styles.wrapper}>
        <Header />
        <main className={styles.main}>
          <div className={styles.loading}>
            <Loader2 className={styles.loadingSpinner} />
            <p>Загрузка...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className={styles.wrapper}>
      <Header />

      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>Настройки профиля</h1>
            <p className={styles.subtitle}>Управляйте своими личными данными</p>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.avatar}>
                <span>
                  {user?.firstName?.[0]}
                  {user?.lastName?.[0]}
                </span>
              </div>
              <div className={styles.userInfo}>
                <h2 className={styles.userName}>
                  {user?.lastName} {user?.firstName} {user?.patronymic}
                </h2>
                <p className={styles.userEmail}>{user?.email}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              {error && <div className={styles.error}>{error}</div>}
              {success && <div className={styles.success}>{success}</div>}

              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor="lastName" className={styles.label}>
                    Фамилия
                  </label>
                  <div className={styles.inputWrapper}>
                    <User className={styles.inputIcon} />
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={styles.input}
                      required
                    />
                  </div>
                </div>

                <div className={styles.field}>
                  <label htmlFor="firstName" className={styles.label}>
                    Имя
                  </label>
                  <div className={styles.inputWrapper}>
                    <User className={styles.inputIcon} />
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={styles.input}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="patronymic" className={styles.label}>
                  Отчество <span className={styles.optional}>(необязательно)</span>
                </label>
                <div className={styles.inputWrapper}>
                  <User className={styles.inputIcon} />
                  <input
                    id="patronymic"
                    name="patronymic"
                    type="text"
                    value={formData.patronymic}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="email" className={styles.label}>
                  Email
                </label>
                <div className={styles.inputWrapper}>
                  <Mail className={styles.inputIcon} />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={styles.input}
                    required
                  />
                </div>
              </div>

              <div className={styles.actions}>
                <button type="submit" className={styles.saveButton} disabled={saving}>
                  {saving ? (
                    <>
                      <Loader2 className={styles.spinner} />
                      Сохранение...
                    </>
                  ) : (
                    <>
                      <Save />
                      Сохранить изменения
                    </>
                  )}
                </button>

                <button type="button" onClick={handleSignOut} className={styles.logoutButton}>
                  <LogOut />
                  Выйти из аккаунта
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
