import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAWZg555SHXG0gu3GRQYHZ0Nw9CseFqboM',
  authDomain: 'test-bca35.firebaseapp.com',
  projectId: 'test-bca35',
  storageBucket: 'test-bca35.appspot.com',
  messagingSenderId: '128387613966',
  appId: '1:128387613966:web:c49cf5330eb5b5f2ea835f',
  measurementId: 'G-MRLRJ4XM9D',
}

initializeApp(firebaseConfig)

export const db = getFirestore()
