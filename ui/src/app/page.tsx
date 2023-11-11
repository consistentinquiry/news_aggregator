import Image from 'next/image'
import styles from './styles/page.module.css'
import HeadlineGrid from './components/HeadlineGrid'

export default function Home() {
  return (
    <>
    <main className={styles.main}>
      <div className={styles.description}>
        <HeadlineGrid>
          
        </HeadlineGrid>
      </div>
    </main>
    </>
  )
}
