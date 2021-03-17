import Link from 'next/link';

import { getArticles } from '@/services/api';
import Header from '@/parts/header';
import styles from '@/styles/Home.module.css';

const sites = {
  nyt: 'The New York Times',
  cbckids: 'CBC Kids News',
  wapo: 'The Washington Post',
  wpkids: 'KidsPost',
}

const Article = ({ article }) => (
  <Link href={`/article/${article.id}`}>
    <div className={styles.article}>
      <h2>{article.title}</h2>
      <span>{sites[article.site]}&nbsp;&nbsp;|&nbsp;&nbsp;{new Date(article.time).toLocaleString()}</span>
      {article.summary && <p>{article.summary}</p>}
    </div>
  </Link>
)

export default function Home({ articles }) {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.articles}>
        {articles.map(article => <Article article={article} key={article.id} />)}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const articles = await getArticles();
  return {
    props: { articles }
  }
}
