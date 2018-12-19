import axios from 'axios';
import * as CONSTS from '../Constants';
import CONFIG from '../Config.json';
import _ from 'lodash';

export const getalldevices = () => {
  return (dispatch) => {

    dispatch({ type: CONSTS.SET_SYSTEMMESSAGE, payload: "Sending API request to get all data."})
    dispatch({ type: CONSTS.SENDING_API_REQUEST})

    let today = new Date();
    let year = today.getUTCFullYear() + 1970;
    let month = today.getUTCMonth();
    let date = today.getUTCDate();
    let day = today.getUTCDay();
    let	countDaysFromMonday = (day || 7) - 1;
    let today_from_timestamp = (new Date(year,month,date,0,0,0,0).getTime())/1000;
    let today_to_timestamp = (new Date(year,month,date,23,59,59,999).getTime())/1000;

    let pastweek = new Date();
    pastweek.setDate(pastweek.getUTCDate() - 7 - countDaysFromMonday);
    let pastyear = pastweek.getUTCFullYear() + 1970;
    let pastmonth = pastweek.getUTCMonth();
    let past_fromdate = pastweek.getUTCDate();
    let past_todate = pastweek.getUTCDate()+6;

    let lastweek_from_timestamp = (new Date(pastyear,pastmonth,past_fromdate,0,0,0,0).getTime())/1000;
    let lastweek_to_timestamp = (new Date(pastyear,pastmonth,past_todate,23,59,59,999).getTime())/1000;

    // const URI_stamp1 = `${CONFIG.API_VERSION}/accounts/${CONFIG.ACCOUNT_ID}/cdrs?created_from=${today_from_timestamp}&created_to=${today_to_timestamp}`;
    const URI_stamp1 = `${CONFIG.API_VERSION}/accounts/${CONFIG.ACCOUNT_ID}/users/${CONFIG.OWNER_ID}/cdrs?created_from=${today_from_timestamp}&created_to=${today_to_timestamp}`;
    // const URI_stamp3 = `${CONFIG.API_VERSION}/accounts/${CONFIG.ACCOUNT_ID}/cdrs?created_from=${lastweek_from_timestamp}&created_to=${lastweek_to_timestamp}`;
    const URI_stamp2 = `${CONFIG.API_VERSION}/accounts/${CONFIG.ACCOUNT_ID}/users/${CONFIG.OWNER_ID}/cdrs?created_from=${lastweek_from_timestamp}&created_to=${lastweek_to_timestamp}`;
    const URI = `${CONFIG.API_VERSION}/accounts/${CONFIG.ACCOUNT_ID}/users/${CONFIG.OWNER_ID}/devices`
    const URI1 = `${CONFIG.API_VERSION}/accounts/${CONFIG.ACCOUNT_ID}/callflows?filter_type=mainUserCallflow&filter_owner_id=${CONFIG.OWNER_ID}`
    const devive_state = `${CONFIG.API_VERSION}/accounts/${CONFIG.ACCOUNT_ID}/devices/status`


    axios.get(URI)
    .then((res) => {
      let alldevices = [];
      let devices = res.data.data;
      let device_nums;
      let today_data, pastweek_data, total_data, phone_num;

      axios.get(devive_state)
        .then((response) => {
          let regsiter = response.data.data;
          devices.forEach(element1 => {
            let flag = false;
            regsiter.forEach(element2 => {
              if(element1.id === element2.device_id){
                alldevices.push({"device_type":element1.device_type,
                                  "mac_address":element1.mac_address,
                                  "name":element1.name,
                                  "regsiter": true });
                flag = true;
                return;
              }
            });
            if(!flag) {
              alldevices.push({ "device_type":element1.device_type,
                                "mac_address":element1.mac_address,
                                "name":element1.name,
                                "regsiter": false });
            }
          });
          axios.get(URI1)
          .then((response1) => {
            axios.get(URI_stamp1)
            .then((res1) => {
              today_data = res1.data.data;
              axios.get(URI_stamp2)
              .then((res2) => {
                pastweek_data = res2.data.data;
                phone_num = response1.data.data;
                total_data={today_data, pastweek_data}
                device_nums = {alldevices, phone_num, total_data};
                dispatch({ type: CONSTS.GET_ALL_DEVICES_ON_AN_ACCOUNT_SUCCESS, payload: device_nums })
              })
              .catch((error) => {console.log(error)});
            })
            .catch((error) => {console.log(error)});
          })
          .catch((error) => {console.log(error)});
        })
        .catch((error) => {console.log(error)});
      })
      .catch((error) => {
        if(typeof error !== 'undefined' && typeof error.response !== 'undefined' && error.response.status == 401) {
          dispatch({ type: CONSTS.SET_SYSTEMMESSAGE, payload: "Authentication failed."})
          dispatch({ type:CONSTS.RESET_AUTH_TOKEN})
        }
      })
  }
}
