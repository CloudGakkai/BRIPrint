import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  saveSetting: ['data']
})

export const SettingsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  setting: {}
})

export const saveSetting = (state, { data }) => 
  state.merge({ ...state, setting: { ...state.setting, data } })

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SAVE_SETTING]: saveSetting
})
