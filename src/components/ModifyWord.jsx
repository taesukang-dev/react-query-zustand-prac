import { doc, getDoc, updateDoc } from '@firebase/firestore'
import { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { Button, Grid, Text } from '../elements'
import { db } from '../firebase'
import { modifyPost } from '../redux/modules/postReducer'

const ModifyWord = (props) => {
  const dispatch = useDispatch()
  let [word, setWord] = useState({})

  const { isLoading, error, data } = useQuery(
    ['onePost', new Date().getTime()],
    async () => {
      const docRef = doc(db, 'dictionary', props.id)
      const docSnap = await getDoc(docRef)
      setWord(docSnap.data())

      return docSnap.data()
    }
  )

  const mutation = useMutation(async (payload) => {
    const docRef = doc(db, 'dictionary', payload.id)
    await updateDoc(docRef, {
      ...payload,
    })
    await getDoc(docRef).then((doc) => dispatch(modifyPost(doc.data())))
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

export default ModifyWord
