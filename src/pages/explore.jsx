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
        <div className={`${styles.card} ${styles.politics}`}>
          <img src="/march.png" alt="A march" />
          <p>Politics</p>
        </div>
        <div className={`${styles.card} ${styles.art}`}>
          <img src="/art.png" alt="Art" />
          <p>Art</p>
        </div>
        <div className={`${styles.card} ${styles.view}`}>
          <img src="/globe.png" alt="The World" />
          <p>View</p>
        </div>
      </div>
    </div>
  )
}
