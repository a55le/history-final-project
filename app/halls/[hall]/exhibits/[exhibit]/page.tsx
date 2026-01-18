import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getExhibitById, getHallById, getExhibitsByHall, getAllExhibits } from "@/lib/db"
import { ChevronLeft, ChevronRight, Calendar, Archive, MapPin } from "lucide-react"
import styles from "./page.module.css"

interface ExhibitPageProps {
  params: Promise<{ hall: string; exhibit: string }>
}

export async function generateStaticParams() {
  const exhibits = await getAllExhibits()
  return exhibits.map((exhibit) => ({
    hall: exhibit.hallId,
    exhibit: exhibit.id,
  }))
}

export async function generateMetadata({ params }: ExhibitPageProps) {
  const { hall: hallId, exhibit: exhibitId } = await params
  const exhibit = await getExhibitById(exhibitId)
  if (!exhibit) return { title: "Экспонат не найден" }
  return {
    title: `${exhibit.title} | Виртуальный музей`,
    description: exhibit.description,
  }
}

export default async function ExhibitPage({ params }: ExhibitPageProps) {
  const { hall: hallId, exhibit: exhibitId } = await params
  const exhibit = await getExhibitById(exhibitId)
  const hall = await getHallById(hallId)

  if (!exhibit || !hall) {
    notFound()
  }

  const hallExhibits = await getExhibitsByHall(hallId)
  const currentIndex = hallExhibits.findIndex((e) => e.id === exhibitId)
  const prevExhibit = currentIndex > 0 ? hallExhibits[currentIndex - 1] : null
  const nextExhibit = currentIndex < hallExhibits.length - 1 ? hallExhibits[currentIndex + 1] : null

  return (
    <div className={styles.wrapper}>
      <Header />

      <main className={styles.main}>
        <div className={styles.breadcrumb}>
          <div className={styles.breadcrumbContainer}>
            <nav className={styles.breadcrumbNav}>
              <Link href="/" className={styles.breadcrumbLink}>
                Главная
              </Link>
              <span>/</span>
              <Link href={`/halls/${hall.id}`} className={styles.breadcrumbLink}>
                {hall.title}
              </Link>
              <span>/</span>
              <span className={styles.breadcrumbCurrent}>{exhibit.title}</span>
            </nav>
          </div>
        </div>

        <article className={styles.article}>
          <div className={styles.articleContainer}>
            <div className={styles.articleGrid}>
              <div className={styles.imageColumn}>
                <div className={styles.imageSticky}>
                  <div className={styles.imageWrapper}>
                    <Image src={exhibit.image || "/placeholder.svg"} alt={exhibit.title} fill priority />
                  </div>

                  {exhibit.artifacts && exhibit.artifacts.length > 0 && (
                    <div className={styles.artifactsCard}>
                      <h3 className={styles.artifactsTitle}>
                        <Archive />
                        Связанные темы
                      </h3>
                      <ul className={styles.artifactsList}>
                        {exhibit.artifacts.map((artifact, index) => (
                          <li key={index} className={styles.artifactsItem}>
                            <div className={styles.artifactsDot} />
                            {artifact}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.contentColumn}>
                <div className={styles.metaRow}>
                  <div className={styles.dateBadge}>
                    <Calendar />
                    <span>{exhibit.startDate === exhibit.endDate ? exhibit.startDate : exhibit.endDate}</span>
                  </div>
                  <div className={styles.hallBadge}>
                    <MapPin />
                    <span>{hall.title}</span>
                  </div>
                </div>

                <h1 className={styles.exhibitTitle}>{exhibit.title}</h1>
                <p className={styles.exhibitDescription}>{exhibit.description}</p>

                <div className={styles.divider} />

                <div className={styles.fullDescription}>
                  {exhibit.fullDescription.split("\n\n").map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>

                <div className={styles.navigation}>
                  {prevExhibit ? (
                    <Link href={`/halls/${hallId}/exhibits/${prevExhibit.id}`} className={styles.navCard}>
                      <div className={`${styles.navCardIcon} ${styles.navCardIconPrev}`}>
                        <ChevronLeft />
                      </div>
                      <div className={styles.navCardText}>
                        <span className={styles.navCardLabel}>Предыдущий</span>
                        <p className={styles.navCardTitle}>{prevExhibit.title}</p>
                      </div>
                    </Link>
                  ) : (
                    <div />
                  )}

                  {nextExhibit ? (
                    <Link
                      href={`/halls/${hallId}/exhibits/${nextExhibit.id}`}
                      className={`${styles.navCard} ${styles.navCardNext}`}
                    >
                      <div className={`${styles.navCardText} ${styles.navCardTextRight}`}>
                        <span className={styles.navCardLabel}>Следующий</span>
                        <p className={styles.navCardTitle}>{nextExhibit.title}</p>
                      </div>
                      <div className={`${styles.navCardIcon} ${styles.navCardIconNext}`}>
                        <ChevronRight />
                      </div>
                    </Link>
                  ) : (
                    <div />
                  )}
                </div>
              </div>
            </div>
          </div>
        </article>

        <section className={styles.backSection}>
          <div className={styles.backSectionContainer}>
            <p className={styles.backText}>Вернуться к списку экспонатов</p>
            <Link href={`/halls/${hall.id}`} className={styles.backButton}>
              <ChevronLeft />
              {hall.title}
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
