import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "ivqprep.firebaseapp.com",
  projectId: "ivqprep",
  storageBucket: "ivqprep.firebasestorage.app",
  messagingSenderId: "443746577080",
  appId: "1:443746577080:web:feb331af5099520005a24d",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export { auth, provider };
