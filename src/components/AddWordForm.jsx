import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { Button, Grid, Text } from '../elements'
import { addFB } from '../redux/modules/postReducer'

const AddWordForm = (props) => {
  const { register, handleSubmit } = useForm()
  const dispatch = useDispatch()
  // let wordRef = useRef()
  // let descRef = useRef()
  // let egRef = useRef()

  // e.preventDefault 해줄 필요 없구나!!
  // 공식문서에서 json.stringify 해서 헤맸음...
  const _onSubmit = (data) => {
    dispatch(addFB(data)).then(() => props.setView(false))
  }

  return (
    <>
      {/* refactored */}
      <form onSubmit={handleSubmit(_onSubmit)}>
        <Grid>
          <Grid padding="16px">
            <Text label="단어"></Text>
            <InputBox {...register('wordRef')} />
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
          <Button
            margin="0px 0px 0px 10px"
            onClick={() => {
              props.setView(false)
            }}
          >
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
