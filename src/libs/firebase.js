// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBaUCqU7oE4iPF_tUAncbMWh_-URuFpQ90',
  authDomain: 'next-bucks.firebaseapp.com',
  projectId: 'next-bucks',
  storageBucket: 'next-bucks.appspot.com',
  messagingSenderId: '449494505367',
  appId: '1:449494505367:web:32a67e0b8416d271f896d2',
  measurementId: 'G-EG0CYS9RXC',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db }
