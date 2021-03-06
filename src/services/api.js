import { firebaseAdmin } from './firebase/admin';
import { firebase } from './firebase';

const db = (firebaseAdmin.firestore ?? firebase.firestore)()

export const getArticle = async (articleId) => {
  const article = await db
    .collection('articles')
    .doc(articleId)
    .get();
  if (article.exists) return article.data()
}

export const getArticles = async (page = 0) => {
  const articles = await db
    .collection('articles')
    .orderBy('time', 'desc')
    .select('url', 'site', 'time', 'title', 'summary', 'articleGraph')
    .get();
  return articles.docs.map(doc => ({ ...doc.data(), id: doc.id }))
}
