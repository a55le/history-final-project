import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { SectionHeader } from "@/components/section-header"
import { HallCard } from "@/components/hall-card"
import { ExhibitCard } from "@/components/exhibit-card"
import { Timeline } from "@/components/timeline"
import { getAllHalls, getAllExhibits, getExhibitsSortedByDate } from "@/lib/db"
import { getCurrentUser, getUserFavorites } from "@/lib/auth"
import styles from "./page.module.css"
import {numeralize, pluralize} from "numeralize-ru";

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default async function HomePage() {
  const halls = await getAllHalls()
  const exhibits = await getAllExhibits()
  const sortedExhibits = await getExhibitsSortedByDate()
  const currentUser = await getCurrentUser()
  const favorites = await getUserFavorites()
  const isAuthenticated = !!currentUser

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
              description={`${capitalizeFirstLetter(numeralize(halls.length))} тематических ${pluralize(halls.length, 'зал', 'зала', 'залов')}, охватывающих историю России от призвания варяг до космических достижений СССР`}
            />
            <div className={styles.hallsGrid}>
              {halls.map((hall) => (
                <HallCard 
                  key={hall.id} 
                  hall={hall} 
                  isFavorite={favorites?.halls.includes(hall.id) || false}
                  isAuthenticated={isAuthenticated}
                />
              ))}
            </div>
          </div>
        </section>

        <section id="exhibits" className={styles.exhibitsSection}>
          <div className={styles.container}>
            <SectionHeader
              title="Все экспонаты"
              description="Полная коллекция музея: документы, экспонаты и исторические свидетельства"
            />
            <div className={styles.exhibitsGrid}>
              {exhibits.map((exhibit) => (
                <ExhibitCard 
                  key={exhibit.id} 
                  exhibit={exhibit}
                  isFavorite={favorites?.exhibits.includes(exhibit.id) || false}
                  isAuthenticated={isAuthenticated}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
