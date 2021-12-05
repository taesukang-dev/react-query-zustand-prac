import { doc, getDoc, updateDoc } from '@firebase/firestore'
import { memo, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import styled from 'styled-components'
import { Button, Grid, Text } from '../elements'
import { db } from '../firebase'

const ModifyWord = (props) => {
  let [word, setWord] = useState({})
  const { setPosts, posts } = props

  const fetchData = async () => {
    const docRef = doc(db, 'dictionary', props.id)
    const docSnap = await getDoc(docRef)
    setWord({ ...docSnap.data(), id: docSnap.id })
  }

  const { isLoading, error, data, isFetched } = useQuery('onePost', fetchData)

  const mutation = useMutation(async (payload) => {
    const docRef = doc(db, 'dictionary', payload.id)
    await updateDoc(docRef, {
      ...payload,
    })
    const newOne = posts.map((el, i) =>
      el.id === payload.id ? (posts[i] = payload) : el
    )
    setPosts(newOne)
  })

  return (
    <>
      <Grid height="100%" zIndex="10" background="white">
        <Grid padding="16px">
          <Text label="단어"></Text>
          <InputBox
            onChange={(e) =>
              setWord((prev) => ({ ...prev, word: e.target.value }))
            }
            value={word.word || ''}
          />
        </Grid>

        <Grid padding="16px">
          <Text label="설명"></Text>
          <InputBox
            onChange={(e) =>
              setWord((prev) => ({ ...prev, desc: e.target.value }))
            }
            value={word.desc || ''}
          />
        </Grid>

        <Grid padding="16px">
          <Text label="얘시"></Text>
          <InputBox
            onChange={(e) =>
              setWord((prev) => ({ ...prev, eg: e.target.value }))
            }
            value={word.eg || ''}
          />
        </Grid>
      </Grid>
      <Grid padding="16px" isFlex>
        <Button
          onClick={() => {
            props.setViewModify(false)
            mutation.mutate({ id: props.id, ...word })
          }}
        >
          수정하기
        </Button>
        <Button
          margin="0px 0px 0px 10px"
          onClick={() => {
            props.setViewModify(false)
          }}
        >
          닫기
        </Button>
      </Grid>
    </>
  )
}

const InputBox = styled.input`
  width: 100%;
  height: 50px;
`

export default memo(ModifyWord)
