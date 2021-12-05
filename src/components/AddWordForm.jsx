import { addDoc, collection } from '@firebase/firestore'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import styled from 'styled-components'
import { Button, Grid, Text } from '../elements'
import { db } from '../firebase'
import useZustand from './zustand'

const AddWordForm = (props) => {
  const setViewAdd = useZustand((state) => state.setViewAdd)
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()

  const add = useMutation(async (data) => {
    await addDoc(collection(db, 'dictionary'), {
      word: data.wordRef,
      desc: data.descRef,
      eg: data.egRef,
    })
  })
  const _onSubmit = useCallback(
    async (data) => {
      await add.mutate(data)
      setViewAdd()
    },
    [add, setViewAdd]
  )

  return (
    <>
      <form onSubmit={handleSubmit(_onSubmit)}>
        <Grid>
          <Grid padding="16px">
            <Text label="단어"></Text>
            <InputBox
              {...register('wordRef', {
                minLength: 3,
                required: true,
              })}
            />
            {errors.wordRef?.type === 'minLength' && (
              <Text color="red">3글자를 넘겨야 해요!</Text>
            )}
            {errors.wordRef?.type === 'required' && (
              <Text color="red">3글자를 넘겨야 해요!</Text>
            )}
          </Grid>

          <Grid padding="16px">
            <Text label="설명"></Text>
            <InputBox
              {...register('descRef', { minLength: 3, required: true })}
            />
          </Grid>
          {errors.descRef?.type === 'minLength' && (
            <Text color="red">3글자를 넘겨야 해요!</Text>
          )}
          {errors.descRef?.type === 'required' && (
            <Text color="red">3글자를 넘겨야 해요!</Text>
          )}

          <Grid padding="16px">
            <Text label="얘시"></Text>
            <InputBox
              {...register('egRef', { minLength: 3, required: true })}
            />
          </Grid>
        </Grid>
        {errors.egRef?.type === 'minLength' && (
          <Text color="red">3글자를 넘겨야 해요!</Text>
        )}
        {errors.egRef?.type === 'required' && (
          <Text color="red">3글자를 넘겨야 해요!</Text>
        )}

        <Grid padding="16px" isFlex>
          <Button margin="0px 0px 0px 10px" type="submit" />
          <Button margin="0px 0px 0px 10px" onClick={setViewAdd}>
            닫기
          </Button>
        </Grid>
      </form>
    </>
  )
}

const InputBox = styled.input`
  width: 100%;
  height: 50px;
`

export default AddWordForm
