import { LOAD_REQUEST, LOAD_SUCCESS, LOAD_ERROR } from './actionTypes.js'

const initialState = false

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_REQUEST:
    case LOAD_ERROR:
      return initialState
    case LOAD_SUCCESS:
      return true
    default:
      return state
  }
}
