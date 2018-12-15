import { combineReducers } from 'redux'
import vmreducer from './voicemails.reducer'
import devicereducer from './devices.reducer'
import faxreducer from './faxes.reducer'
import auth from './auth.reducer'
import systemmessage from './systemmessage.reducer'

export default combineReducers({
  vmreducer,
  devicereducer,
  faxreducer,
  auth,
  systemmessage
})
