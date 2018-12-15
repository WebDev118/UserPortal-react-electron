import axios from 'axios'
import * as CONSTS from '../Constants'
import CONFIG from '../Config.json'
import {getNewAuthToken} from './auth.action'
import _ from 'lodash'

export const getallfaxes = (from, to) => {
  return (dispatch) => {
    dispatch({ type: CONSTS.SET_SYSTEMMESSAGE, payload: "Sending API request to get all data."});
    dispatch({ type: CONSTS.SENDING_API_REQUEST});

    let fromDate = new Date(from);
    let from_year = fromDate.getUTCFullYear() + 1970;
    let from_month = fromDate.getUTCMonth();
    let from_date = fromDate.getUTCDate();
    let from_timestamp = (new Date(from_year,from_month,from_date,0,0,0,0).getTime())/1000;

    let toDate = new Date(to);
    let to_year = toDate.getUTCFullYear() + 1970;
    let to_month = toDate.getUTCMonth();
    let to_date = toDate.getUTCDate();
    let to_timestamp = (new Date(to_year,to_month,to_date,23,59,59,999).getTime())/1000;

    const URI = `${CONFIG.API_VERSION}/accounts/${CONFIG.ACCOUNT_ID}/faxboxes?filter_owner_id=${CONFIG.OWNER_ID}`;

    axios.get(URI)
      .then((res) => {
        let faxbox_id = res.data.data[0].id;
        let faxbox_name = res.data.data[0].name;
        let caller_name = res.data.data[0].caller_name;
        let faxbox = {faxbox_id, faxbox_name, caller_name};

        let url = `${CONFIG.API_VERSION}/accounts/${CONFIG.ACCOUNT_ID}/faxes/inbox?created_from=${from_timestamp}&created_to=${to_timestamp}`;

        axios.get(url)
        .then((res1) => {
          let faxes = res1.data.data;
          let allfaxes = {faxbox, faxes};
          dispatch({type: CONSTS.GET_ALL_FAXES_ON_AN_ACCOUNT_SUCCESS, payload: allfaxes});
        })
      })
      .catch((error) => {

        if(typeof error !== 'undefined' && typeof error.response !== 'undefined' && error.response.status == 401) {
          dispatch({ type: CONSTS.SET_SYSTEMMESSAGE, payload: "Authentication failed."});
          dispatch({ type:CONSTS.RESET_AUTH_TOKEN});
        }
      })
  }
}

