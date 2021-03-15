import { MOCK_ARTICLES } from './MOCK_DATA';

export const getArticle = async (articleId) => {
  return MOCK_ARTICLES[Math.floor(Math.random() * MOCK_ARTICLES.length)];
}
