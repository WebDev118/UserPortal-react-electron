import axios from 'axios'
import * as CONSTS from '../Constants'
import CONFIG from '../Config.json'
import _ from 'lodash'

export const getCallFlow = (start, end) => {

  let startDate = new Date(start);
  let endDate = new Date(end);

  let start_year = startDate.getUTCFullYear() + 1970;
  let start_month = startDate.getUTCMonth();
  let start_date = startDate.getUTCDate();

  let end_year = endDate.getUTCFullYear() + 1970;
  let end_month = endDate.getUTCMonth();
  let end_date = endDate.getUTCDate();

  let start_timestamp = (new Date(start_year, start_month, start_date, 0, 0, 0, 0).getTime()) / 1000;
  let end_timestamp = (new Date(end_year, end_month, end_date, 23, 59, 59, 999).getTime()) / 1000;

  return (dispatch) => {

    dispatch({ type: CONSTS.SET_SYSTEMMESSAGE, payload: "Sending API request to get all data." })
    dispatch({ type: CONSTS.SENDING_API_REQUEST })

    const CALL_URI = `${CONFIG.API_VERSION}/accounts/${CONFIG.ACCOUNT_ID}/users/${CONFIG.OWNER_ID}/cdrs?&created_from=${start_timestamp}&created_to=${end_timestamp}`;
    axios.get(CALL_URI)
      .then((res) => {
        console.log(res.data.data)
        dispatch({ type: CONSTS.GET_ALL_CALL_FLOW_ON_AN_ACCOUNT_SUCCESS, payload: res.data.data });
      })
      .catch((error) => {
        if (typeof error !== 'undefined' && typeof error.response !== 'undefined' && error.response.status == 401) {
          dispatch({ type: CONSTS.SET_SYSTEMMESSAGE, payload: "Authentication failed." })
          dispatch({ type: CONSTS.RESET_AUTH_TOKEN })
        }
      })
  }
}
