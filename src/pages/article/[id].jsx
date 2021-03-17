import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '@/parts/header';
import { getArticle } from '@/services/api';
import styles from '@/styles/Article.module.css';
import { firebase, useAuth } from '@/services/firebase';

const logos = {
  nyt: ['/nyt.svg', 28],
  cbckids: ['/cbckids.svg', 40],
  wpkids: ['/wapo.svg', 28],
}

function Article({ article }) {
  const router = useRouter();
  const { user } = useAuth();
  const [recorded, setRecorded] = useState(false);
  const articleId = router.query.id;

  useEffect(async () => {
    if (recorded) return
    if (typeof window === 'undefined') return
    if (!user) return;
    const db = firebase.firestore()
    db.collection('records').doc(user.uid).collection('read').doc().set({
      articleId,
      createdAt: new Date().toISOString(),
    })
    setRecorded(true)
  }, [user])

  const Paragraph = ({ block }) => {
    if (!block.content || block.content === 'Advertisement') return null;
    return <p className={styles.paragraph}>{block.content}</p>;
  };

  const Image = ({ block }) => {
    if (!block.src) return null;
    let caption = null;
    if (block.caption) {
      if (block.credit) {
        caption = <figcaption className={styles.caption}>{block.caption.trim()} <span className={styles.credit}>{block.credit}</span></figcaption>
      } else {
        caption = <figcaption className={styles.caption}>{block.caption.trim()}</figcaption>
      }
    }
    return (
      <figure className={styles.figure}>
        <img src={block.src} className={styles.img} />
        {caption}
      </figure>
    );
  };

  const Block = ({ block }) => {
    switch (block.type) {
    case 'text': return <Paragraph block={block} />;
    case 'img': return <Image block={block} />;
    default:
      console.error('Unrecognized block type.', block)
      return null
    }
  }

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.article}>
        {article.site && logos[article.site] && (
          <a href={article.url} target="_blank">
            <img className={styles.siteIcon} src={logos[article.site][0]} height={logos[article.site][1]} />
          </a>
        )}
        <h1>{article.title}</h1>
        {article.summary && <span className={styles.summary}>{article.summary}</span>}
        {article.time && article.length && <span>{new Date(article.time).toLocaleString()}</span>}
        {article.articleBody.map((block, i) => <Block block={block} key={`block-${i}`} />)}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const article = await getArticle(context.params.id);
  if (!article) return { notFound: true };
  return {
    props: { article }
  };
}

export default Article;
