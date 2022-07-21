import {initializeApp} from 'firebase/app'
import {getAuth, GoogleAuthProvider} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyD3hR3t4br0NPpn-3b2EjvbtnteS8T3sCw",
    authDomain: "yt-auth-test-aa532.firebaseapp.com",
    projectId: "yt-auth-test-aa532",
    storageBucket: "yt-auth-test-aa532.appspot.com",
    messagingSenderId: "838628464714",
    appId: "1:838628464714:web:b9d5aff707c0326c6c6eb3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const Provider = new GoogleAuthProvider()


export default  app;