import { Grid, Text } from '../elements'
import AddWordForm from './AddWordForm'

const AddWord = (props) => {
  return (
    <>
      <Grid
        height="100%"
        padding="16px"
        zIndex="10"
        position="fixedz"
        background="white"
      >
        <Text size="30px">단어 추가하기</Text>

        <AddWordForm setView={props.setView} />
      </Grid>
    </>
  )
}

export default AddWord
