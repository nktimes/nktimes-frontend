import Header from '@/parts/header';
import styles from '@/styles/Explore.module.css';
import { useAuth } from '@/services/firebase';

export default function Explore() {
  const { user } = useAuth();

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.cards}>
        <div className={`${styles.card} ${styles.tech}`}>
          <img src="/drone.png" alt="A drone" />
          <p>Technology</p>
        </div>
        {/** TODO: Add the other three cards */}
        <div className={`${styles.card} ${styles.politics}`}>
          <img src="/march.png" alt="A march" />
          <p>Politics</p>
        </div>
        <div className={`${styles.card} ${styles.art}`}>
          <img src="/art.png" alt="Art" />
          <p>ART</p>
        </div>
        <div className={`${styles.card} ${styles.view}`}>
          <img src="/globe.png" alt="The World" />
          <p>View</p>
        </div>
      </div>
    </div>
  )
}
