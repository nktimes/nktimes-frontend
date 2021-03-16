const fs = require('fs');
const readline = require('readline');

import { firebaseAdmin } from './admin';

export const loadSimpleWiki = async () => {
  const db = firebaseAdmin.firestore();

  const fileStream = fs.createReadStream('~/Downloads/simple-wiki.json');
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let count = 0;
  let batch = db.batch();
  const terms = new Set();
  for await (const line of rl) {
    let term = JSON.parse(line);
    terms.add(term.title.toLowerCase().replace(/[,.\-:/"()']+/g, ''));
    const ref = db.collection('terms').doc(term.title.toLowerCase().replace(/[,.\-:/"()']+/g, ''));
    batch.set(ref, term);
    count++;
    if (count % 100 === 0) {
      console.log(count);
      await batch.commit();
      batch = db.batch();
    }
  }
  await batch.commit();
  fs.writeFile('public/terms.json', Array.from(terms).sort((a, b) => b.length - a.length).join('\n'), () => {})
};
