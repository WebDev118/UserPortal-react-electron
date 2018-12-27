import axios from 'axios';
import * as CONSTS from '../Constants';
import CONFIG from '../Config.json';

export const getallnotification = () => {
  return (dispatch) => {
    dispatch({ type: CONSTS.SET_SYSTEMMESSAGE, payload: "Sending API request to get all data." });
    dispatch({ type: CONSTS.SENDING_API_REQUEST });

    let today = new Date();
    let notifications;
    let year = today.getUTCFullYear() + 1970;
    let month = today.getUTCMonth();
    let date = today.getUTCDate();

    let today_from_timestamp = (new Date(year,month,date,0,0,0,0).getTime())/1000;
    let today_to_timestamp = (new Date(year,month,date,23,59,59,999).getTime())/1000;

    const URI_stamp1 = `${CONFIG.API_VERSION}/accounts/${CONFIG.ACCOUNT_ID}/users/${CONFIG.OWNER_ID}/cdrs?created_from=${today_from_timestamp}&created_to=${today_to_timestamp}`;
    const devices = `${CONFIG.API_VERSION}/accounts/${CONFIG.ACCOUNT_ID}/users/${CONFIG.OWNER_ID}/devices`
    const device_num = `${CONFIG.API_VERSION}/accounts/${CONFIG.ACCOUNT_ID}/callflows?filter_type=mainUserCallflow&filter_owner_id=${CONFIG.OWNER_ID}`
    const devive_state = `${CONFIG.API_VERSION}/accounts/${CONFIG.ACCOUNT_ID}/devices/status`

    const missedcall = `${CONFIG.API_VERSION}/accounts/${CONFIG.ACCOUNT_ID}/users/${CONFIG.OWNER_ID}/cdrs`;
    const faxes =`${CONFIG.API_VERSION}/accounts/${CONFIG.ACCOUNT_ID}/faxes/inbox`;
    const faxesbox = `${CONFIG.API_VERSION}/accounts/${CONFIG.ACCOUNT_ID}/faxboxes?filter_owner_id=${CONFIG.OWNER_ID}`;
    const vmbox = `${CONFIG.API_VERSION}/accounts/${CONFIG.ACCOUNT_ID}/vmboxes?filter_owner_id=${CONFIG.OWNER_ID}`;
    const username = `${CONFIG.API_VERSION}/accounts/${CONFIG.ACCOUNT_ID}/users/${CONFIG.OWNER_ID}`;

    axios.get(missedcall).then((res1) => {
      let missedcount = 0;
      let allfaxescount = 0;
      let newmailscount = 0;
      let calldata;
      let faxesdata;
      let faxbox;
      let full_name = '';
      if(res1.data.data && res1.data.data.length > 0){
        res1.data.data.map((call, index) => {
          if(call.direction === 'outbound' && call.hangup_cause !== 'USER_BUSY'){
            missedcount ++;
          }
        });
      }
      calldata = res1.data.data;
      axios.get(faxesbox)
      .then((res8) => {
        let faxbox_name = res8.data.data[0].name;
        let caller_name = res8.data.data[0].caller_name;
        faxbox = {faxbox_name, caller_name};
        axios.get(faxes)
        .then((res2) => {
          faxesdata = res2.data.data;
          allfaxescount = faxesdata.length;
          axios.get(vmbox)
          .then((res3) => {
            let promises = []
            const vmboxes = res3.data.data
            vmboxes.forEach(function(vmbox) {
              let url = `${CONFIG.API_VERSION}/accounts/${CONFIG.ACCOUNT_ID}/vmboxes/${vmbox.id}/messages`
              promises.push(axios.get(url))
            });
            let newmails = [];
            axios.all(promises).then(function(promise) {
              promise.forEach(function(res4) {
                let messages = res4.data.data;
                let newmsgs  = messages.filter(message => message.folder === "new");
                let newmessagecount = newmsgs ? newmsgs.length : 0
                newmails.push({newmessagecount})
              })
              if(newmails){
                newmails.map((message, index)=>{
                  newmailscount+= message.newmessagecount;
                })
              }
              axios.get(username).then((res5) => {
                let userdata = res5.data.data;
                full_name = res5.data.data.first_name +" "+ res5.data.data.last_name;

                axios.get(devices)
                .then((res6) => {
                  let alldevices = [];
                  let devices = res6.data.data;
                  let today_data, phone_num;
                  axios.get(devive_state)
                    .then((response) => {
                      let regsiter = response.data.data;
                      devices.forEach(element1 => {
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
                      axios.get(device_num)
                      .then((response1) => {

                        phone_num = response1.data.data[0].numbers;
                        axios.get(URI_stamp1)
                        .then((res7) => {
                          today_data = res7.data.data;
                          notifications = {missedcount, allfaxescount, faxesdata, faxbox, newmailscount, full_name, calldata, userdata, alldevices, phone_num, today_data};
                          dispatch({type: CONSTS.GET_ALL_NOTIFICATION, payload: notifications})
                        })
                        .catch((error) => {console.log(error)});
                      })
                      .catch((error) => {console.log(error)});
                    })
                    .catch((error) => {console.log(error)});
                  })
              })
            });
          })
        })
      })
    })
  }
}
