import { useState } from 'react'
import { Button, Grid, Text } from '../elements'
import ModifyWord from './ModifyWord'

const Post = (props) => {
  let [viewModify, setViewModify] = useState(false)
  const { word, desc, eg, id } = props

  return (
    <>
      <Grid background="#fff" margin="20px" width="80vw">
        <Grid margin="15px 0px 0px 0px">
          <Text label="단어" bold>
            {word}
          </Text>
        </Grid>
        <Grid margin="15px 0px 0px 0px">
          <Text label="설명">{desc}</Text>
        </Grid>
        <Grid margin="15px 0px 15px 0px">
          <Text label="예시" color="blue">
            {eg}
          </Text>
        </Grid>
        {viewModify && <ModifyWord id={id} setViewModify={setViewModify} />}
        {viewModify === false && (
          <Button onClick={() => setViewModify(true)}>수정하기</Button>
        )}
      </Grid>
    </>
  )
}

export default Post
