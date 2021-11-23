import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from '@firebase/firestore'
import { db } from '../../firebase'

const initialState = []

// actions
const ADD = 'post/ADD'
const LOAD = 'post/LOAD'

export function loadPost(post_list) {
  return { type: LOAD, post_list }
}

export function addPost(post_list) {
  return { type: ADD, post_list }
}

// middlewares
export const loadWordsFB = () => {
  return async function (dispatch) {
    const word_data = await getDocs(collection(db, 'dictionary'))
    let word_list = []

    word_data.forEach((el) => {
      word_list.push({ id: el.id, ...el.data() })
    })
    dispatch(loadPost(word_list))
  }
}

export const loadOneWordFB = (id) => {
  return async function (dispatch) {
    const docRef = doc(db, 'dictionary', id)
    const docSnap = await getDoc(docRef)
    return docSnap.data()
  }
}

export const addFB = (payload) => {
  return async function (dispatch) {
    const docRef = await addDoc(collection(db, 'dictionary'), {
      word: payload.word,
      desc: payload.desc,
      eg: payload.eg,
    })

    const newObject = {
      id: docRef.id,
      word: payload.word,
      desc: payload.desc,
      eg: payload.eg,
    }

    dispatch(addPost(newObject))
  }
}

export const modifyFB = (payload) => {
  return async function (dispatch, getState) {
    const docRef = doc(db, 'dictionary', payload.id)
    await updateDoc(docRef, {
      ...payload,
    })
  }
}

// reducer
const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD:
      state = action.post_list
      return state
    case ADD:
      let newState = [
        ...state,
        {
          id: action.post_list.id,
          word: action.post_list.word,
          desc: action.post_list.desc,
          eg: action.post_list.eg,
        },
      ]

      return newState
    default:
      return state
  }
}

export default postReducer
