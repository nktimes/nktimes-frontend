import firebaseAdmin from 'firebase-admin';
import serviceAccount from './serviceAccount';

if (typeof window === 'undefined' && !firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      privateKey: serviceAccount.private_key,
      clientEmail: serviceAccount.client_email,
      projectId: serviceAccount.project_id,
    }),
    databaseURL: 'https://nktimes-2903a.firebaseio.com',
  });
}

export { firebaseAdmin };
