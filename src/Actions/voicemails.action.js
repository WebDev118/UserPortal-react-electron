import axios from 'axios'
import * as CONSTS from '../Constants'
import CONFIG from '../Config.json'
import {getNewAuthToken} from './auth.action'
import _ from 'lodash'

export const getallvmboxes = () => {
  return (dispatch) => {

    dispatch({ type: CONSTS.SET_SYSTEMMESSAGE, payload: "Sending API request to get all data."})
    dispatch({ type: CONSTS.SENDING_API_REQUEST})

    const URI = `${CONFIG.API_VERSION}/accounts/${CONFIG.ACCOUNT_ID}/vmboxes?filter_owner_id=${CONFIG.OWNER_ID}`
    axios.get(URI)
      .then((res) => {
        let promises = []
        const vmboxes = res.data.data

        vmboxes.forEach(function(vmbox) {
          let url = `${CONFIG.API_VERSION}/accounts/${CONFIG.ACCOUNT_ID}/vmboxes/${vmbox.id}/messages`
          promises.push(axios.get(url))

        });
        let allmessages = []
        axios.all(promises).then(function(promise) {

          dispatch({ type: CONSTS.SET_SYSTEMMESSAGE, payload: "We have fresh messages now."})
          promise.forEach(function(res) {
            let messages = res.data.data;
            let newmsgs  = messages.filter(message => message.folder === "new");
            let vmbox_id = res.request.responseURL.split("/")[7];
            let vmbox =  _.find(vmboxes, box => box.id === vmbox_id);
            vmbox.newcount = newmsgs ? newmsgs.length : 0
            vmbox.messages = messages.length
            allmessages.push({vmbox, messages})

          })

          if(vmboxes.length == 0) {
            allmessages.push({vmbox: {newcount:0, messages:0}, messages: []})
          }

          dispatch({type: CONSTS.GET_ALL_MESSAGES_ON_AN_ACCOUNT_SUCCESS, payload: allmessages})
        })
      })
      .catch((error) => {
        if(typeof error !== 'undefined' && typeof error.response !== 'undefined' && error.response.status == 401) {
          dispatch({ type: CONSTS.SET_SYSTEMMESSAGE, payload: "Authentication failed."})
          dispatch({ type:CONSTS.RESET_AUTH_TOKEN})
        }
      })
  }
}
