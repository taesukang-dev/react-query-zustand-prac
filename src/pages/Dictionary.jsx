import { collection, getDocs, query } from '@firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import Post from '../components/Post'
import useZustand from '../components/zustand'
import { Grid, Plus, Text } from '../elements'
import { db } from '../firebase'

const Dictionary = (props) => {
  const setViewAdd = useZustand((state) => state.setViewAdd)
  const [posts, setPosts] = useState([])
  const fetch = async () => {
    const _word_data = collection(db, 'dictionary')
    let newArr = query(_word_data)
    const wordSnap = await getDocs(newArr)
    let temp = []
    wordSnap.forEach((el) => {
      temp.push({ ...el.data(), id: el.id })
    })
    setPosts([...temp])
    return temp
  }
  const { data } = useQuery('post', fetch, { refetchInterval: posts })

  return (
    <React.Fragment>
      <Grid background="royalblue" padding="16px">
        <Text size="30px"> MY DICTIONARY</Text>
        <Grid isFlex style={{ flexDirection: 'column' }}>
          {posts.map((el, i) => {
            return (
              <Post {...el} i={i} key={i} setPosts={setPosts} posts={posts} />
            )
          })}
        </Grid>
        <Plus onClick={setViewAdd} />
      </Grid>
    </React.Fragment>
  )
}

Dictionary.defaultProps = {}

export default Dictionary
