import { useState } from 'react';

import { recordQuizResponse } from '@/services/api'
import styles from '@/styles/Quiz.module.css';

const question = 'Is this a news report or an opinion article?';

export default function Quiz({ articleId, uid, isNewsReport=true }) {
  const [answer, setAnswer] = useState()
  const isCorrectAnswer = answer === isNewsReport

  const submit = async (answerIsNewsReport) => {
    if (answer !== undefined) return
    const isCorrect = isNewsReport === answerIsNewsReport
    setAnswer(answerIsNewsReport)
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
      <span className={styles.finish}>Quiz: ${question}</span>
      <a
        href="#"
        onClick={() => submit(true)}
        className={`${styles.option} ${answer === true && (isCorrectAnswer ? styles.correct : styles.wrong)}`}
      >
        News report
      </a>
      <a
        href="#"
        onClick={() => submit(false)}
        className={`${styles.option} ${answer === false && (isCorrectAnswer ? styles.correct : styles.wrong)}`}
      >
        Opinion article
      </a>
    </div>
  )
}
