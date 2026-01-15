import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { SectionHeader } from "@/components/section-header"
import { HallCard } from "@/components/hall-card"
import { ExhibitCard } from "@/components/exhibit-card"
import { Timeline } from "@/components/timeline"
import { getAllHalls, getAllExhibits, getExhibitsSortedByDate } from "@/lib/museum-data"
import styles from "./page.module.css"

export default function HomePage() {
  const halls = getAllHalls()
  const exhibits = getAllExhibits()
  const sortedExhibits = getExhibitsSortedByDate()

  return (
    <div className={styles.wrapper}>
      <Header />

      <main className={styles.main}>
        <HeroSection />

        <section id="timeline" className={styles.timelineSection}>
          <div className={styles.container}>
            <SectionHeader title="Лента времени" description="Хронология ключевых событий российской истории" />
            <Timeline exhibits={sortedExhibits} />
          </div>
        </section>

        <section id="halls" className={styles.hallsSection}>
          <div className={styles.container}>
            <SectionHeader
              title="Залы музея"
              description="Четыре тематических зала, охватывающих историю России от древности до современности"
            />
            <div className={styles.hallsGrid}>
              {halls.map((hall) => (
                <HallCard key={hall.id} hall={hall} />
              ))}
            </div>
          </div>
        </section>

        <section id="exhibits" className={styles.exhibitsSection}>
          <div className={styles.container}>
            <SectionHeader
              title="Все экспонаты"
              description="Полная коллекция музея: документы, артефакты и исторические свидетельства"
            />
            <div className={styles.exhibitsGrid}>
              {exhibits.map((exhibit) => (
                <ExhibitCard key={exhibit.id} exhibit={exhibit} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
