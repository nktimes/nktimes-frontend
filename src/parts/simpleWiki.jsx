import { useState, useEffect } from 'react';
import ReactTooltip from 'react-tooltip';
import Loader from "react-loader-spinner";

import { firebase } from '@/services/firebase';
import styles from '@/styles/SimpleWiki.module.css';

export default function SimpleWiki({ term }) {
  const [wiki, setWiki] = useState(null);

  const getWiki = async () => {
    setWiki(null)
    if (term === null || term.length === 0) return
    const db = firebase.firestore().collection('terms')
    const row = await db.doc(term).get()
    if (row.exists) {
      setWiki(row.data())
      ReactTooltip.rebuild()
    }
  }

  useEffect(getWiki, [term])

  if (!wiki) return (
    <div className={styles.loader}>
      <Loader
        type="Grid"
        color="#00ADB5"
        height={48}
        width={48}
      />
    </div>
  )

  const explanation = wiki.text.slice(wiki.title.length).trim()
  let words = explanation.split(' ')
  if (words.length > 80) {
    words = words.slice(0, 80)
    words.push('. . .')
  }
  return (
    <div className={styles.container}>
      <h2>{wiki.title}</h2>
      <span>{words.join(' ')}</span>
      <p>Click to read more</p>
    </div>
  )
}
