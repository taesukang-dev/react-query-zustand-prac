import { createAction, handleActions } from 'redux-actions'
import produce from 'immer'

const initialState = {
  list: [],
}

// actions

export default handleActions({}, initialState)
