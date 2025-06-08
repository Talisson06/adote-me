import { initializeApp } from "firebase/app";


import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBlcjLCnMovwd81VuBLzvDenvN2lhuwJ_E",
  authDomain: "adote-me-5a0fd.firebaseapp.com",
  projectId: "adote-me-5a0fd",
  storageBucket: "adote-me-5a0fd.firebasestorage.app",
  messagingSenderId: "854676337734",
  appId: "1:854676337734:web:3273834661f73decfdc647",
  measurementId: "G-0Q724PG172"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export {db, auth, storage}