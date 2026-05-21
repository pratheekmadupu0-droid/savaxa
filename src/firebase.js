import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBFXvSwZSrMbYHQkrge6UyZOv2uxU0VkPA",
  authDomain: "emergency-qr-b0adf.firebaseapp.com",
  databaseURL: "https://emergency-qr-b0adf-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "emergency-qr-b0adf",
  storageBucket: "emergency-qr-b0adf.firebasestorage.app",
  messagingSenderId: "326186798135",
  appId: "1:326186798135:web:21b57be22dff85849303b2",
  measurementId: "G-SPGK1149TH"
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
