import Header from '@/parts/header';
import styles from '@/styles/Explore.module.css';

export default function Explore() {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.cards}>
        <div className={`${styles.card} ${styles.tech}`}>
          <img src="/drone.png" alt="A drone" />
          <p>Technology</p>
        </div>

        {/** TODO: Add the other three cards */}
      </div>
    </div>
  )
}
