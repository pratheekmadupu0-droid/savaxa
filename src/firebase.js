import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC1r0rZbS42_JdiPndZXDjsJVoGOWSek9g",
  authDomain: "savaxa-850c6.firebaseapp.com",
  projectId: "savaxa-850c6",
  storageBucket: "savaxa-850c6.firebasestorage.app",
  messagingSenderId: "883575359557",
  appId: "1:883575359557:web:b478df5635a352331b3b2c",
  measurementId: "G-55DPMCJ721"
};

let app, auth, db, storage, analytics;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
  if (typeof window !== "undefined") {
    analytics = getAnalytics(app);
  }
} catch (error) {
  console.warn("Firebase config is incomplete or invalid. Please update src/firebase.js", error);
}

export const googleProvider = new GoogleAuthProvider();
export { auth, db, storage, analytics, signInWithPopup, signOut };
