

import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
 import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCojc17DMFkB6Rb2gWLe7WnS5CyGS3uriA",
  authDomain: "socialmedia-4550a.firebaseapp.com",
  projectId: "socialmedia-4550a",
  storageBucket: "socialmedia-4550a.firebasestorage.app",
  messagingSenderId: "648253481814",
  appId: "1:648253481814:web:0a417860ba666fe0e52cf7",
  measurementId: "G-D60YK77KK6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
const db = getFirestore(app)
export {auth,provider};
export default db;

