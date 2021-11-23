import { useSelector } from 'react-redux'
import Post from '../components/Post'
import { Grid, Plus, Text } from '../elements'

const Dictionary = (props) => {
  let state = useSelector((state) => state.postReducer)
  return (
    <>
      <Grid background="royalblue" padding="16px">
        <Text size="30px"> MY DICTIONARY</Text>
        <Grid isFlex style={{ flexDirection: 'column' }}>
          {state.map((el, i) => {
            return <Post {...el} i={i} key={i} />
          })}
        </Grid>
        <Plus onClick={() => props.setView(true)} />
      </Grid>
    </>
  )
}

Dictionary.defaultProps = {}

export default Dictionary
