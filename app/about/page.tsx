import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SectionHeader } from "@/components/section-header"
import { getDevelopers } from "@/lib/db"
import { Landmark, BookOpen, Users, Globe } from "lucide-react"
import styles from "./page.module.css"

export const metadata = {
  title: "О нас | Виртуальный музей",
  description: "Команда разработчиков виртуального музея истории России",
}

export default function AboutPage() {
  const developers = getDevelopers()

  return (
    <div className={styles.wrapper}>
      <Header />

      <main className={styles.main}>
        <section className={styles.heroSection}>
          <div className={styles.container}>
            <div className={styles.heroContent}>
              <span className={styles.badge}>О проекте</span>
              <h1 className={styles.heroTitle}>Виртуальный музей истории России</h1>
              <p className={styles.heroDescription}>
                Этот проект был создан в рамках итоговой работы по истории. Наша цель — сделать изучение истории России
                интересным и доступным для всех.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.statsSection}>
          <div className={styles.container}>
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>
                  <Landmark />
                </div>
                <h3 className={styles.statTitle}>4 зала</h3>
                <p className={styles.statDescription}>Тематические разделы охватывают всю историю России</p>
              </div>

              <div className={styles.statCard}>
                <div className={styles.statIcon}>
                  <BookOpen />
                </div>
                <h3 className={styles.statTitle}>14 экспонатов</h3>
                <p className={styles.statDescription}>Подробные материалы о ключевых событиях</p>
              </div>

              <div className={styles.statCard}>
                <div className={styles.statIcon}>
                  <Users />
                </div>
                <h3 className={styles.statTitle}>4 автора</h3>
                <p className={styles.statDescription}>Команда увлечённых историей разработчиков</p>
              </div>

              <div className={styles.statCard}>
                <div className={styles.statIcon}>
                  <Globe />
                </div>
                <h3 className={styles.statTitle}>1000+ лет</h3>
                <p className={styles.statDescription}>Истории от Древней Руси до наших дней</p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.teamSection}>
          <div className={styles.container}>
            <SectionHeader title="Наша команда" description="Люди, которые работали над созданием виртуального музея" />

            <div className={styles.teamGrid}>
              {developers.map((dev) => (
                <div key={dev.name} className={styles.teamCard}>
                  <div className={styles.teamAvatar}>
                    <Image src={dev.avatar || "/placeholder.svg"} alt={dev.name} fill />
                  </div>
                  <div className={styles.teamContent}>
                    <h3 className={styles.teamName}>{dev.name}</h3>
                    <span className={styles.teamRole}>{dev.role}</span>
                    <p className={styles.teamDescription}>{dev.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.aboutSection}>
          <div className={styles.container}>
            <div className={styles.aboutCard}>
              <h2 className={styles.aboutTitle}>О проекте</h2>
              <div className={styles.aboutText}>
                <p>
                  Виртуальный музей — это образовательный продукт, созданный в рамках итогового проекта по курсу "История России". Мы собрали информацию о ключевых событиях российской истории и представили её в удобном
                  интерактивном формате.
                </p>
                <p>
                  Наш продукт охватывает период более чем в тысячу лет: от призвания варягов в 862 году до космических
                  достижений СССР. Каждый экспонат содержит подробное описание и его значения для истории страны.
                </p>
                <p>
                  Мы надеемся, что этот музей поможет Вам лучше узнать историю России и вдохновит на дальнейшее изучение
                  нашего прошлого.
                </p>
              </div>

              <div className={styles.projectInfo}>
                <h3 className={styles.projectInfoTitle}>Итоговый проект по истории</h3>
                <p className={styles.projectInfoYear}>2025-2026 учебный год</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
