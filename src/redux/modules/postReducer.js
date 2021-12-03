import { createAction, handleActions } from 'redux-actions'
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  updateDoc,
  orderBy,
  startAt,
} from '@firebase/firestore'
import { db } from '../../firebase'
import produce from 'immer'

const initialState = {
  list: [],
  paging: { start: null, next: null, size: 3 },
  is_loading: false,
}

// actions
const ADD = 'post/ADD'
const LOAD = 'post/LOAD'
const MODIFY = 'post/MODIFY'

export const loadPost = createAction(LOAD, (post_list, paging) => ({
  post_list,
  paging,
}))
export const addPost = createAction(ADD, (post_list) => ({ post_list }))
export const modifyPost = createAction(MODIFY, (post) => ({ post }))

// middlewares
export const loadWordsFB = (start = null, size = 3) => {
  return async function (dispatch, getState) {
    let _paging = getState().postReducer.paging
    if (_paging.start && !_paging.next) {
      return
    }

    const _word_data = collection(db, 'dictionary')
    let newArr
    if (start) {
      newArr = query(
        _word_data,
        orderBy('word', 'desc'),
        startAt(start),
        limit(size + 1)
      )
    } else {
      newArr = query(_word_data, orderBy('word', 'desc'), limit(size + 1))
    }
    const wordSnap = await getDocs(newArr)
    let paging = {
      start: wordSnap.docs[0],
      next:
        wordSnap.docs.length === size + 1
          ? wordSnap.docs[wordSnap.docs.length - 1]
          : null,
      size: size,
    }

    let word_list = []
    wordSnap.forEach((el) => {
      word_list.push({ id: el.id, ...el.data() })
    })
    word_list.pop()
    dispatch(loadPost(word_list, paging))
  }
}

// export const addFB = (payload) => {
//   return async function (dispatch) {
//     const docRef = await addDoc(collection(db, 'dictionary'), {
//       word: payload.wordRef,
//       desc: payload.descRef,
//       eg: payload.egRef,
//     })

//     const newObject = {
//       id: docRef.id,
//       word: payload.wordRef,
//       desc: payload.descRef,
//       eg: payload.egRef,
//     }

//     dispatch(addPost(newObject))
//   }
// }

// export const loadOneWordFB = (id) => {
//   return async function (dispatch) {
//     const docRef = doc(db, 'dictionary', id)
//     const docSnap = await getDoc(docRef)
//     return docSnap.data()
//   }
// }

// export const modifyFB = (payload) => {
//   return async function (dispatch, getState) {
//     const docRef = doc(db, 'dictionary', payload.id)
//     await updateDoc(docRef, {
//       ...payload,
//     })
//     await getDoc(docRef).then((doc) => dispatch(modifyPost(doc.data())))
//   }
// }

export default handleActions(
  {
    [LOAD]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push(...action.payload.post_list)
        draft.paging = action.payload.paging
      }),
    [ADD]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push({
          id: action.payload.post_list.id,
          word: action.payload.post_list.word,
          desc: action.payload.post_list.desc,
          eg: action.payload.post_list.eg,
        })
      }),
    [MODIFY]: (state, action) =>
      produce(state, (draft) => {
        draft.list = draft.list.map((el) =>
          el.id === action.payload.post.id ? (el = action.payload.post) : el
        )
      }),
  },
  initialState
)
