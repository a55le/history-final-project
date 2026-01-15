import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SectionHeader } from "@/components/section-header"
import { ExhibitCard } from "@/components/exhibit-card"
import { getHallById, getExhibitsByHall, getAllHalls } from "@/lib/museum-data"
import { ChevronLeft, Clock, Archive } from "lucide-react"
import styles from "./page.module.css"

interface HallPageProps {
  params: Promise<{ hall: string }>
}

export async function generateStaticParams() {
  const halls = getAllHalls()
  return halls.map((hall) => ({
    hall: hall.id,
  }))
}

export async function generateMetadata({ params }: HallPageProps) {
  const { hall: hallId } = await params
  const hall = getHallById(hallId)
  if (!hall) return { title: "Зал не найден" }
  return {
    title: `${hall.title} | Виртуальный музей`,
    description: hall.description,
  }
}

export default async function HallPage({ params }: HallPageProps) {
  const { hall: hallId } = await params
  const hall = getHallById(hallId)

  if (!hall) {
    notFound()
  }

  const exhibits = getExhibitsByHall(hallId)

  return (
    <div className={styles.wrapper}>
      <Header />

      <main className={styles.main}>
        <section className={styles.heroSection}>
          <div className={styles.heroImage}>
            <Image
              src={hall.image || "/placeholder.svg"}
              alt={hall.title}
              fill
              className={styles.heroImageInner}
              priority
            />
            <div className={styles.heroOverlay} />
          </div>

          <div className={styles.heroContainer}>
            <Link href="/#halls" className={styles.backButton}>
              <ChevronLeft />
              <span>Все залы</span>
            </Link>

            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>{hall.title}</h1>
              <p className={styles.heroDescription}>{hall.description}</p>

              <div className={styles.heroMeta}>
                <div className={styles.heroMetaItem}>
                  <Archive />
                  <span>{hall.exhibitsCount} экспонатов</span>
                </div>
                <div className={styles.heroMetaItem}>
                  <Clock />
                  <span>~{hall.exhibitsCount * 5} минут на осмотр</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.exhibitsSection}>
          <div className={styles.container}>
            <SectionHeader title="Экспонаты зала" description={`Коллекция экспонатов раздела «${hall.title}»`} />

            {exhibits.length > 0 ? (
              <div className={styles.exhibitsGrid}>
                {exhibits.map((exhibit) => (
                  <ExhibitCard key={exhibit.id} exhibit={exhibit} showHallLink={false} />
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <p>В этом зале пока нет экспонатов</p>
              </div>
            )}
          </div>
        </section>

        <section className={styles.otherHallsSection}>
          <div className={styles.container}>
            <SectionHeader title="Другие залы" description="Продолжите путешествие по музею" />

            <div className={styles.otherHallsGrid}>
              {getAllHalls()
                .filter((h) => h.id !== hallId)
                .map((otherHall) => (
                  <Link key={otherHall.id} href={`/halls/${otherHall.id}`} className={styles.otherHallCard}>
                    <div className={styles.otherHallImage}>
                      <Image src={otherHall.image || "/placeholder.svg"} alt={otherHall.title} fill />
                    </div>
                    <div>
                      <h3 className={styles.otherHallTitle}>{otherHall.title}</h3>
                      <p className={styles.otherHallCount}>{otherHall.exhibitsCount} экспонатов</p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
