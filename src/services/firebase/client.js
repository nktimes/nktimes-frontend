import firebaseClient from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

if (typeof window !== 'undefined' && !firebaseClient.apps.length) {
  firebaseClient.initializeApp({
    apiKey: "AIzaSyBWGTPw9MKNhChFklHh_1iQjoarvX_2VOI",
    authDomain: "nktimes.org",
    projectId: "nktimes-2903a",
    storageBucket: "nktimes-2903a.appspot.com",
    messagingSenderId: "383168472358",
    appId: "1:383168472358:web:3ba831a25d76e4c7094de7",
    measurementId: "G-HNWPYGPWG0"
  });
  firebaseClient.auth().setPersistence(firebaseClient.auth.Auth.Persistence.SESSION);
}

export { firebaseClient };
