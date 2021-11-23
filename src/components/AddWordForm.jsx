import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { Button, Grid, Text } from '../elements'
import { addFB } from '../redux/modules/postReducer'

const AddWordForm = (props) => {
  const dispatch = useDispatch()
  let wordRef = useRef()
  let descRef = useRef()
  let egRef = useRef()
  return (
    <>
      <Grid>
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
      </Grid>
    </>
  )
}

const InputBox = styled.input`
  width: 100%;
  height: 50px;
`

export default AddWordForm
