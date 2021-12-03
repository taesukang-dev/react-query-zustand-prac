import { addDoc, collection } from '@firebase/firestore'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { Button, Grid, Text } from '../elements'
import { db } from '../firebase'
import { addPost } from '../redux/modules/postReducer'
import useZustand from './zustand'

const AddWordForm = (props) => {
  const setViewAdd = useZustand((state) => state.setViewAdd)
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()
  const dispatch = useDispatch()

  const add = useMutation(async (data) => {
    const docRef = await addDoc(collection(db, 'dictionary'), {
      word: data.wordRef,
      desc: data.descRef,
      eg: data.egRef,
    })

    const newObject = {
      id: docRef.id,
      word: data.wordRef,
      desc: data.descRef,
      eg: data.egRef,
    }

    dispatch(addPost(newObject))
  })
  // e.preventDefault 해줄 필요 없구나!!
  // 공식문서에서 json.stringify 해서 헤맸음...
  const _onSubmit = useCallback(
    async (data) => {
      await add.mutate(data)
      setViewAdd()
    },
    [add, setViewAdd]
  )

  return (
    <>
      {/* refactored */}
      <form onSubmit={handleSubmit(_onSubmit)}>
        <Grid>
          <Grid padding="16px">
            <Text label="단어"></Text>
            <InputBox
              {...register('wordRef', { minLength: 3, maxLength: 20 })}
            />
            {errors.wordRef?.type === 'minLength' && (
              <Text color="red">3글자를 넘겨야 해요!</Text>
            )}
            {errors.wordRef?.type === 'maxLength' && (
              <Text color="red">20글자를 넘길 수 없어요!</Text>
            )}
          </Grid>

          <Grid padding="16px">
            <Text label="설명"></Text>
            <InputBox {...register('descRef')} />
          </Grid>

          <Grid padding="16px">
            <Text label="얘시"></Text>
            <InputBox {...register('egRef')} />
          </Grid>
        </Grid>

        <Grid padding="16px" isFlex>
          <Button margin="0px 0px 0px 10px" type="submit" />
          <Button margin="0px 0px 0px 10px" onClick={setViewAdd}>
            닫기
          </Button>
        </Grid>
      </form>

      {/* <Grid>
        <Grid padding="16px">
          <Text label="단어"></Text>
          <InputBox ref={wordRef} />
        </Grid>

        <Grid padding="16px">
          <Text label="설명"></Text>
          <InputBox ref={descRef} />
        </Grid>

        <Grid padding="16px">
          <Text label="얘시"></Text>
          <InputBox ref={egRef} />
        </Grid>
      </Grid>

      <Grid padding="16px" isFlex>
        <Button
          onClick={() => {
            props.setView(false)
            dispatch(
              addFB({
                word: wordRef.current.value,
                desc: descRef.current.value,
                eg: egRef.current.value,
              })
            )
          }}
        />
        <Button
          margin="0px 0px 0px 10px"
          onClick={() => {
            props.setView(false)
          }}
        >
          닫기
        </Button>
      </Grid> */}
    </>
  )
}

const InputBox = styled.input`
  width: 100%;
  height: 50px;
`

export default AddWordForm
