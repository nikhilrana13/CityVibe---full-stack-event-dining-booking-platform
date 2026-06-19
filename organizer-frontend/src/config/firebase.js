import { initializeApp,getApps } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
 apiKey:"AIzaSyAQGw3qdiJQVO_K61xQ5nSbm4Td0kM5s0o",
  authDomain:"cityvibe-998ac.firebaseapp.com",
  projectId:"cityvibe-998ac",
  storageBucket:"cityvibe-998ac.firebasestorage.app",
  messagingSenderId:400252429657,
  appId:"1:400252429657:web:71940f4b9adcbfe9a41848",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0]

export const auth = getAuth(app);
/* ---------- Login with google ---------- */
export const GoogleProvider = new GoogleAuthProvider();
GoogleProvider.setCustomParameters({
  prompt:"select_account"
})


