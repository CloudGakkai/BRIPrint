import { call, put } from 'redux-saga/effects'
import SettingsActions from '../Redux/SettingsRedux'

export function * getSettings (api, action) {
  const { data } = action
  const response = yield call(api.getsettings, data)

  if (response.ok) {
    yield put(SettingsActions.settingsSuccess(response.data))
  } else {
    yield put(SettingsActions.settingsFailure())
  }
}
