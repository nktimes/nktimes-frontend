import { useState, useEffect } from 'react';

import { recordQuizResponse } from '@/services/clientApi'
import styles from '@/styles/Quiz.module.css';

const question = 'Is this a news report or an opinion article?';

export default function Quiz({ articleId, uid, isNewsReport = true, onFinish = () => {} }) {
  const [answer, setAnswer] = useState()
  const isCorrectAnswer = answer === isNewsReport

  useEffect(() => {
    setAnswer();
  }, [articleId])

  const submit = async (answerIsNewsReport) => {
    if (answer !== undefined) return
    const isCorrect = isNewsReport === answerIsNewsReport
    setAnswer(answerIsNewsReport)
    onFinish()
    await recordQuizResponse(
      uid,
      articleId,
      question,
      answerIsNewsReport ? 'News report' : 'Opinion article',
      isCorrect,
    )
  }

  return (
    <div className={styles.quiz}>
      <h2 className={styles.finish}>Quiz: {question}</h2>
      <a
        href="#"
        onClick={(e) => { e.preventDefault(); submit(true) }}
        className={`${styles.option} ${answer === true && (isCorrectAnswer ? styles.correct : styles.wrong)}`}
      >
        News report
      </a>
      <a
        href="#"
        onClick={(e) => { e.preventDefault(); submit(false) }}
        className={`${styles.option} ${answer === false && (isCorrectAnswer ? styles.correct : styles.wrong)}`}
      >
        Opinion article
      </a>
      {answer !== undefined && <p>News reports attempt to provide information on a current event, while opinion articles attempt to persuade readers to adopt a particular position on that event.</p>}
    </div>
  )
}
