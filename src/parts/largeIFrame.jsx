import { useState, useEffect } from 'react'
import Loader from "react-loader-spinner";

import styles from '@/styles/LargeIFrame.module.css';

export default function LargeIFrame({ url, visible, onClose = () => {} }) {
  const [showFrame, setShowFrame] = useState(false);
  
  useEffect(() => {
    setShowFrame(false);
  }, [url])

  const buttonClick = (e) => {
    e.preventDefault();
    onClose();
  }

  return (
    <div className={`${styles.container} ${visible && styles.show}`}>
      <Loader
        className={`${styles.loader} ${showFrame && styles.hide}`}
        type="Grid"
        color="#00ADB5"
        height={48}
        width={48}
      />
      <iframe className={showFrame || styles.hide} src={url} onLoad={() => setShowFrame(true)} />
      <a href="#" onClick={buttonClick} className={styles.close}>✕</a>
    </div>
  )
}
