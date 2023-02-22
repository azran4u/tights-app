import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "tights-app.firebaseapp.com",
  projectId: "tights-app",
  storageBucket: "tights-app.appspot.com",
  messagingSenderId: "133108001267",
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestoreDatabase = getFirestore(app);
