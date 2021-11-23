import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyB-ledLZqDRD3Rg56uMgfqFs_pXYlfF19E',
  authDomain: 'sparta-react-advanced-c8d25.firebaseapp.com',
  projectId: 'sparta-react-advanced-c8d25',
  storageBucket: 'sparta-react-advanced-c8d25.appspot.com',
  messagingSenderId: '370795710408',
  appId: '1:370795710408:web:8314ef19861a5e080c22fd',
  measurementId: 'G-T7H04P36M7',
}

initializeApp(firebaseConfig)

export const db = getFirestore()
