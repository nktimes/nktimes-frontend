import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import Quiz from './quiz'
import { useAuth, signIn, firebase } from '@/services/firebase';
import styles from '@/styles/Progress.module.css';

export default function Progress({ articleId, isNewsReport = true }) {
  const { user } = useAuth();
  const router = useRouter();
  const [articleIds, setArticleIds] = useState([]);
  const [showQuiz, setShowQuiz] = useState(false);

  const updateArticleIds = async () => {
    if (!user) return;
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    const records = await firebase
      .firestore()
      .collection('records')
      .doc(user.uid)
      .collection('read')
      .where('timestamp', '>=', date.getTime())
      .get()
    const newArticleIds = [...articleIds];
    for (const record of records.docs) {
      const id = record.data().articleId
      if (!newArticleIds.includes(id)) {
        newArticleIds.push(id)
      }
    }
    setArticleIds(newArticleIds)
    if (newArticleIds.includes(articleId)) {
      setShowQuiz(true)
    }
  }

  useEffect(updateArticleIds, [user])
  useEffect(() => {
    setShowQuiz(false)
  }, [articleId])

  const loginHandle = (e) => {
    e.preventDefault();
    signIn();
  }

  if (!user) return (
    <div className={styles.progress}>
      <a href="#" onClick={loginHandle} className={styles.finish}>Log in to set up your reading goal</a>
    </div>
  )

  const handleClick = (e) => {
    e.preventDefault();
    setShowQuiz(true);
  }

  const finish = async () => {
    const db = firebase.firestore()
    await db.collection('records').doc(user.uid).collection('read').doc().set({
      articleId,
      timestamp: Date.now(),
    })
    await updateArticleIds()
  }

  const next = async (e) => {
    e.preventDefault();
    const db = firebase.firestore()
    const article = await db
      .collection('articles')
      .where(firebase.firestore.FieldPath.documentId(), 'not-in', articleIds)
      .limit(1)
      .get();
    if (article.empty) return router.push('/')
    router.push(`/article/${article.docs[0].id}`)
  }

  const haveReadThisArticle = articleIds.includes(articleId)
  const remainingCount = (3 - articleIds.length) >= 0 ? (3 - articleIds.length) : 0;

  return (
    <div className={styles.progress}>
      {haveReadThisArticle || <a href="#" onClick={handleClick} className={styles.finish}>Finish reading</a>}
      {haveReadThisArticle && <a href="#" onClick={next} className={styles.finish}>Next article</a>}
      <div className={styles.ring}>
        <CircularProgressbar
          value={articleIds.length}
          maxValue={3}
          text={`${articleIds.length} / 3`}
          className={styles.progressBar}
          background
          backgroundPadding={6}
          styles={buildStyles({
            backgroundColor: '#00ADB5',
            textColor: '#fff',
            pathColor: '#fff',
            trailColor: 'transparent',
            textSize: '28px'
          })}
        />
        {remainingCount > 0 && <span>Read {remainingCount} more article{remainingCount > 1 && 's'} to achieve your daily goal</span>}
        {remainingCount === 0 && <span>You have achieved today’s reading goal!</span>}
      </div>
      {showQuiz && (
        <Quiz
          uid={user.uid}
          articleId={articleId}
          isNewsReport={isNewsReport}
          onFinish={finish}
        />
      )}
    </div>
  )
}
