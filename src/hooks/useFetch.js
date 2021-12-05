import {
  collection,
  doc,
  getDocs,
  limit,
  query,
  startAt,
} from '@firebase/firestore'
import { orderBy } from 'lodash'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { db } from '../firebase'

const useFetch = (start = null, size = 3) => {
  const paging = useSelector((state) => state.postReducer.paging)
  const fetch = async () => {
    if (paging.start && !paging.next) {
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
    let new_paging = {
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
    return word_list
  }

  const result = useQuery('loadposts', fetch)

  return result
}
export default useFetch
