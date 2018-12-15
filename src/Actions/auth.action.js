import axios from 'axios'
import md5 from 'md5'
import * as CONSTS from '../Constants'
import CONFIG from '../Config.json'

export const getNewAuthToken = () => {
  return (dispatch) => {
    const URI = `${CONFIG.API_VERSION}/user_auth`
    const body = {
      'data': {
        'credentials': md5(`${CONFIG.ACCOUNT_USERNAME}:${CONFIG.ACCOUNT_PASSWORD}`),
        'account_name': CONFIG.ACCOUNT_NAME
      }
    }
    axios.put(URI, body)
      .then((res) => {
        dispatch({ type: CONSTS.SET_SYSTEMMESSAGE, payload: "New token generated: " + res.data.auth_token})
        dispatch({ type: CONSTS.GET_NEW_TOKEN_SUCCESS, payload: res.data })
      })
      .catch((error) => {
        dispatch({ type: CONSTS.FAIL_API_REQUEST, payload: error })
      })
  }
}
