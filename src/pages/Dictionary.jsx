import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import InfiScroll from '../components/InfiScroll'
import Post from '../components/Post'
import useZustand from '../components/zustand'
import { Grid, Plus, Text } from '../elements'
import { loadWordsFB } from '../redux/modules/postReducer'

const Dictionary = (props) => {
  const dispatch = useDispatch()
  const setViewAdd = useZustand((state) => state.setViewAdd)
  const state = useSelector((state) => state.postReducer.list)
  const paging = useSelector((state) => state.postReducer.paging)
  useEffect(() => {
    if (state.length === 0) {
      dispatch(loadWordsFB())
    }
  }, [])
  return (
    <React.Fragment>
      <InfiScroll
        callNext={() => {
          dispatch(loadWordsFB(paging.next))
        }}
        is_next={paging.next ? true : false}
      >
        <Grid background="royalblue" padding="16px">
          <Text size="30px"> MY DICTIONARY</Text>
          <Grid isFlex style={{ flexDirection: 'column' }}>
            {state.map((el, i) => {
              return <Post {...el} i={i} key={i} />
            })}
          </Grid>
          <Plus onClick={setViewAdd} />
        </Grid>
      </InfiScroll>
    </React.Fragment>
  )
}

Dictionary.defaultProps = {}

export default Dictionary
