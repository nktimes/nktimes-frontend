import React, { useEffect, useState } from 'react';
import ReactTooltip from 'react-tooltip';
import { useRouter } from 'next/router';

import Header from '@/parts/header';
import SimpleWiki from '@/parts/simpleWiki';
import LargeIFrame from '@/parts/largeIFrame';
import Progress from '@/parts/progress';
import { getArticle } from '@/services/api';
import { firebase } from '@/services/firebase';
import styles from '@/styles/Article.module.css';

const logos = {
  nyt: ['/nyt.svg', 28],
  cbckids: ['/cbckids.svg', 40],
  wpkids: ['/wapo.svg', 28],
  timeForKids: ['/time-for-kids.png', 20]
}

function Article({ article }) {
  const router = useRouter();
  const [showTooltip, setShowTooltip] = useState(false);
  const [showIFrame, setShowIFrame] = useState(false);
  const [iframeUrl, setIframeUrl] = useState();
  const [iframeTerm, setIframeTerm] = useState();
  const [loading, setLoading] = useState(false);
  const articleId = router.query.id;

  useEffect(() => {
    if (typeof window === 'undefined') return
    setShowTooltip(true)
  }, [])

  const handleHintClick = async (term) => {
    if (term === iframeTerm) {
      setShowIFrame(!showIFrame);
      return;
    }

    if (loading) return;
    setLoading(true);
    const db = firebase.firestore().collection('terms')
    const row = await db.doc(term).get()
    setLoading(false);
    if (!row.exists) return
    setIframeTerm(term)
    setIframeUrl(row.data().url)
    setShowIFrame(true)
    ReactTooltip.rebuild()
    document.body.style.cursor = '';
  }

  const Paragraph = ({ block }) => {
    if (!block.content || block.content.length === 0) return null;
    let items = block.content.map((item, i) => {
      if (item.type === 'simple-wiki') {
        return (
          <span
            className={styles.hint}
            key={i}
            data-for="hint"
            data-tip={item.term}
            onClick={() => handleHintClick(item.term)}
          >
            {item.content}
          </span>
        );
      } else if (item.content === 'Advertisement') return;
      return <span key={i}>{item.content}</span>
    }).filter(item => item)
    for (let i = items.length - 1; i >= 1; i--) {
      items = [...items.slice(0, i), <span key={`space-${i}`}> </span>, ...items.slice(i)]
    }
    
    return (
      <p className={styles.paragraph}>
        {items}
      </p>
    );
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
    <div className={`${styles.container} ${loading && styles.loading}`}>
      <Header />
      <div className={`${styles.article} ${showIFrame && styles.shiftLeft}`}>
        {article.site && logos[article.site] && (
          <a href={article.url} target="_blank">
            <img className={styles.siteIcon} src={logos[article.site][0]} height={logos[article.site][1]} />
          </a>
        )}
        <h1>{article.title}</h1>
        {article.summary && <span className={styles.summary}>{article.summary}</span>}
        {article.time && article.length && <span>{new Date(article.time).toLocaleString()}</span>}
        {article.parts.map((block, i) => <Block block={block} key={`block-${i}`} />)}
        <Progress articleId={articleId} isNewsReport={!article.url.includes('/opinion/')} />
      </div>
      {showTooltip && <ReactTooltip
        id="hint"
        getContent={tip => <SimpleWiki term={tip} />}
        effect="solid"
        type="light"
        place="bottom"
        className="wiki-tooltip"
      />}
      <LargeIFrame url={iframeUrl} visible={showIFrame} onClose={() => {
        setShowIFrame(false);
        setTimeout(() => ReactTooltip.rebuild(), 100);
      }} />
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
