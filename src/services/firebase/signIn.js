import { firebaseClient as firebase } from './client';

export const signIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
}
