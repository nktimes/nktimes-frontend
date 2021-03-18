import { firebase } from './firebase';

export const recordQuizResponse = async (uid, articleId, question, answer, isCorrect) => {
  await firebase
    .firestore()
    .collection('records')
    .doc(uid)
    .collection('quizzes')
    .doc()
    .set({
      articleId,
      question,
      answer,
      isCorrect,
      timestamp: Date.now()
    })
}
