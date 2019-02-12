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
    const faxes_inbox = `${CONFIG.API_VERSION}/accounts/${CONFIG.ACCOUNT_ID}/faxes/inbox?created_from=${from_timestamp}&created_to=${to_timestamp}&paginate=false`;
    const faxes_outbox = `${CONFIG.API_VERSION}/accounts/${CONFIG.ACCOUNT_ID}/faxes/outbox?created_from=${from_timestamp}&created_to=${to_timestamp}&paginate=false`;
    const faxesbox = `${CONFIG.API_VERSION}/accounts/${CONFIG.ACCOUNT_ID}/faxboxes?filter_owner_id=${CONFIG.OWNER_ID}`;
    axios.all([
      axios.get(faxes_inbox),
      axios.get(faxes_outbox),
      axios.get(faxesbox),
      axios.get(username)
    ])
    .then(axios.spread((faxes_inbox, faxes_outbox,faxesbox,username) => {
      let faxbox_id = faxesbox.data.data[0].id;
      let faxbox_name = faxesbox.data.data[0].name;
      let caller_name = faxesbox.data.data[0].caller_name;
      let faxbox = {faxbox_id, faxbox_name, caller_name};
      let full_name = username.data.data.first_name +" "+ username.data.data.last_name;
      let faxes_inbox_data = faxes_inbox.data.data;
      let faxes_outbox_data  = faxes_outbox.data.data;
      let allfaxes = {faxbox, faxes_inbox_data, faxes_outbox_data, full_name};
      dispatch({type: CONSTS.GET_ALL_FAXES_ON_AN_ACCOUNT_SUCCESS, payload: allfaxes});

    }))
    .catch((error) => {
      if(typeof error !== 'undefined' && typeof error.response !== 'undefined' && error.response.status === 401) {
        dispatch({ type: CONSTS.SET_SYSTEMMESSAGE, payload: "Authentication failed."});
        dispatch({ type:CONSTS.RESET_AUTH_TOKEN});
      }
    })
  }
}

