import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { Button, Grid, Text } from '../elements'
import { loadOneWordFB, modifyFB } from '../redux/modules/postReducer'

const ModifyWord = (props) => {
  let [word, setWord] = useState({})
  let dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadOneWordFB(props.id)).then((res) => setWord(res))
  }, [dispatch, props.id])

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
            dispatch(modifyFB({ id: props.id, ...word }))
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
