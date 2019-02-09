import axios from 'axios';
import * as CONSTS from '../Constants';
import CONFIG from '../Config.json';

export const getallnotification = () => {
  return (dispatch) => {
    dispatch({ type: CONSTS.SET_SYSTEMMESSAGE, payload: "Sending API request to get all data." });
    dispatch({ type: CONSTS.SENDING_API_REQUEST });

    let today = new Date();
    let notifications;
    let year = today.getFullYear() + 1970;
    let month = today.getMonth();
    let date = today.getDate();

    let today_from_timestamp = Math.round(new Date(year,month,date,0,0,0,0).getTime())/1000;
    let today_to_timestamp = Math.round(new Date(year,month,date,23,59,59,999).getTime())/1000;

    const today_call_count = `${CONFIG.API_VERSION}/accounts/${CONFIG.ACCOUNT_ID}/users/${CONFIG.OWNER_ID}/cdrs?created_from=${today_from_timestamp}&created_to=${today_to_timestamp}`;
    const devices = `${CONFIG.API_VERSION}/accounts/${CONFIG.ACCOUNT_ID}/users/${CONFIG.OWNER_ID}/devices`
    const device_num = `${CONFIG.API_VERSION}/accounts/${CONFIG.ACCOUNT_ID}/callflows?filter_type=mainUserCallflow&filter_owner_id=${CONFIG.OWNER_ID}`
    const devive_state = `${CONFIG.API_VERSION}/accounts/${CONFIG.ACCOUNT_ID}/devices/status`
    const missedcall = `${CONFIG.API_VERSION}/accounts/${CONFIG.ACCOUNT_ID}/users/${CONFIG.OWNER_ID}/cdrs`;
    const faxes_inbox = `${CONFIG.API_VERSION}/accounts/${CONFIG.ACCOUNT_ID}/faxes/inbox`;
    const faxes_outbox = `${CONFIG.API_VERSION}/accounts/${CONFIG.ACCOUNT_ID}/faxes/outbox`;
    const faxesbox = `${CONFIG.API_VERSION}/accounts/${CONFIG.ACCOUNT_ID}/faxboxes?filter_owner_id=${CONFIG.OWNER_ID}`;
    const vmbox = `${CONFIG.API_VERSION}/accounts/${CONFIG.ACCOUNT_ID}/vmboxes?filter_owner_id=${CONFIG.OWNER_ID}`;
    const username = `${CONFIG.API_VERSION}/accounts/${CONFIG.ACCOUNT_ID}/users/${CONFIG.OWNER_ID}`;
    axios.all([
      axios.get(today_call_count),
      axios.get(devices),
      axios.get(device_num),
      axios.get(devive_state),
      axios.get(missedcall),
      axios.get(faxes_inbox),
      axios.get(faxes_outbox),
      axios.get(faxesbox),
      axios.get(vmbox),
      axios.get(username),
    ])
    .then(axios.spread((today_call_count, devices, device_num, devive_state, missedcall, faxes_inbox, faxes_outbox,faxesbox, vmbox, username) => {
      let newvoicemails = [];
      let alldevices = [];
      let promises = [];
      let today_data = today_call_count.data.data;
      console.log(today_data)
      let calldata = missedcall.data.data;
      let faxes_inbox_data = faxes_inbox.data.data;
      let faxes_outbox_data  = faxes_outbox.data.data;
      let full_name = username.data.data.first_name +" "+ username.data.data.last_name;
      let userdata = username.data.data;
      let phone_num = device_num.data.data[0].numbers;
      let devices_data = devices.data.data;
      let regsiter = devive_state.data.data;
      let vmboxes = vmbox.data.data;
      let faxbox_name = faxesbox.data.data[0].name;
      let caller_name = faxesbox.data.data[0].caller_name;
      let faxbox = {faxbox_name, caller_name}
      devices_data.forEach(element1 => {
        let flag = false;
        regsiter.forEach(element2 => {
          if(element1.id === element2.device_id){
            alldevices.push({ "id": element1.id,
                              "device_type":element1.device_type,
                              "mac_address":element1.mac_address,
                              "name":element1.name,
                              "regsiter": true });
            flag = true;
            return;
          }
        });
        if(!flag) {
          alldevices.push({ "id": element1.id,
                            "device_type":element1.device_type,
                            "mac_address":element1.mac_address,
                            "name":element1.name,
                            "regsiter": false });
        }
      });

      vmboxes.forEach(function(vmbox) {
        let url = `${CONFIG.API_VERSION}/accounts/${CONFIG.ACCOUNT_ID}/vmboxes/${vmbox.id}/messages`
        promises.push(axios.get(url))
      });
      axios.all(promises).then(function(promise) {
        promise.forEach(function(res4) {
          let messages = res4.data.data;
          let newmsgs  = messages.filter(message => message.folder === "new");
          let newmessagecount = newmsgs ? newmsgs.length : 0
          newvoicemails.push({newmessagecount})
        })
        let notifications = { faxes_inbox_data, faxes_outbox_data, faxbox, newvoicemails, full_name, calldata, userdata, alldevices, phone_num, today_data};
        dispatch({type: CONSTS.GET_ALL_NOTIFICATION, payload: notifications});
      })
    }))
    .catch((error) => {
      if (typeof error !== 'undefined' && typeof error.response !== 'undefined' && error.response.status === 401) {
        dispatch({ type: CONSTS.SET_SYSTEMMESSAGE, payload: "Authentication failed." })
        dispatch({ type: CONSTS.RESET_AUTH_TOKEN })
      }
    })
  }
}
