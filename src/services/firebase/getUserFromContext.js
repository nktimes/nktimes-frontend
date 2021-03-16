import { firebaseAdmin } from './admin';

export const getUserFromContext = async (ctx) => {
  const cookies = nookies.get(ctx);
  try {
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    return token;
  } catch (err) {
    return null;
  }
}
