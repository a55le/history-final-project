import styles from "./section-header.module.css"

interface SectionHeaderProps {
  title: string
  description?: string
  id?: string
}

export function SectionHeader({ title, description, id }: SectionHeaderProps) {
  return (
    <div id={id} className={styles.header}>
      <h2 className={styles.title}>{title}</h2>
      {description && <p className={styles.description}>{description}</p>}
      <div className={styles.line} />
    </div>
  )
}