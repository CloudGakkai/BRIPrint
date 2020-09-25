import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  saveDataPrint: ['data']
})

export const PrintTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: {}
})

export const saveDataPrint = (state, { data }) =>
  state.merge({ ...state, data })

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SAVE_DATA_PRINT]: saveDataPrint,
})
