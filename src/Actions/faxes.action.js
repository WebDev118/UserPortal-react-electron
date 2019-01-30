import axios from 'axios'
import * as CONSTS from '../Constants'
import CONFIG from '../Config.json'

export const getallfaxes = (from, to) => {
  return (dispatch) => {
    dispatch({ type: CONSTS.SET_SYSTEMMESSAGE, payload: "Sending API request to get all data."});
    dispatch({ type: CONSTS.SENDING_API_REQUEST});

    let fromDate = new Date(from);
    let from_year = fromDate.getFullYear() + 1970;
    let from_month = fromDate.getMonth();
    let from_date = fromDate.getDate();
    let from_timestamp = Math.round(new Date(from_year,from_month,from_date,0,0,0,0).getTime())/1000;

    let toDate = new Date(to);
    let to_year = toDate.getFullYear() + 1970;
    let to_month = toDate.getMonth();
    let to_date = toDate.getDate();
    let to_timestamp = Math.round(new Date(to_year,to_month,to_date,23,59,59,999).getTime())/1000;
    const username = `${CONFIG.API_VERSION}/accounts/${CONFIG.ACCOUNT_ID}/users/${CONFIG.OWNER_ID}`;
    const URI = `${CONFIG.API_VERSION}/accounts/${CONFIG.ACCOUNT_ID}/faxboxes?filter_owner_id=${CONFIG.OWNER_ID}`;
    axios.get(URI)
      .then((res) => {
        let faxbox_id = res.data.data[0].id;
        let faxbox_name = res.data.data[0].name;
        let caller_name = res.data.data[0].caller_name;
        let faxbox = {faxbox_id, faxbox_name, caller_name};

        let url = `${CONFIG.API_VERSION}/accounts/${CONFIG.ACCOUNT_ID}/faxes/inbox?created_from=${from_timestamp}&created_to=${to_timestamp}`;
        axios.get(username).then((res2) => {
          let full_name = res2.data.data.first_name +" "+ res2.data.data.last_name;
          axios.get(url)
          .then((res1) => {
            let faxes = res1.data.data;
            let allfaxes = {faxbox, faxes, full_name};
            dispatch({type: CONSTS.GET_ALL_FAXES_ON_AN_ACCOUNT_SUCCESS, payload: allfaxes});

          })
        })
      })
      .catch((error) => {
        if(typeof error !== 'undefined' && typeof error.response !== 'undefined' && error.response.status === 401) {
          dispatch({ type: CONSTS.SET_SYSTEMMESSAGE, payload: "Authentication failed."});
          dispatch({ type:CONSTS.RESET_AUTH_TOKEN});
        }
      })
  }
}

