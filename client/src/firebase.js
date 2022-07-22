import {initializeApp} from 'firebase/app'
import {getAuth, GoogleAuthProvider} from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_FIREBASE,
  authDomain: process.env.REACT_APP_DB_HOST,
  projectId: "yt-auth-test-aa532",
  storageBucket: "yt-auth-test-aa532.appspot.com",
  messagingSenderId: process.env.REACT_APP_APP_MESSEGNG_SENDER,
  appId: process.env.REACT_APP_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const Provider = new GoogleAuthProvider()


export default app;