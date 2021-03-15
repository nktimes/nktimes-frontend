import { useRouter } from 'next/router';

import { getArticle } from '@/services/api';
import styles from '@/styles/Article.module.css';

function Article({ article }) {
  const router = useRouter();
  const articleId = router.query.id;

  const Paragraph = ({ block }) => (
    // TODO: Implement the Paragraph component
    <p>This is a paragraph.</p>
  );

  const Image = ({ block }) => {
    if (!block.src) return null;
    let caption = null;
    if (block.caption) {
      if (block.caption.indexOf('Credit...') >= 0) {
        const description = block.caption.slice(0, block.caption.indexOf('Credit...')).trim();
        const credit = block.caption.slice(block.caption.indexOf('Credit...') + 9).trim();
        caption = <figcaption className={styles.caption}>{description} <span className={styles.credit}>{credit}</span></figcaption>
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
    default: return <span>Unrecognized block type.</span>;
    }
  }

  // TODO: Add Header to this page. (Note: Look at explore.jsx)
  return (
    <div className={styles.container}>
      <div className={styles.article}>
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
