
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAN9orUl1jt0ix911xJNDkv9XWlA0OWHVo",
  authDomain: "ecommerce-app-44abf.firebaseapp.com",
  projectId: "ecommerce-app-44abf",
  storageBucket: "ecommerce-app-44abf.appspot.com",
  messagingSenderId: "987561263725",
  appId: "1:987561263725:web:243161425ea68c6ad3b564",
  measurementId: "G-STVKWSTPJV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);