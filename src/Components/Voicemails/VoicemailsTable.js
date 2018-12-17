import React from 'react';
import './VoicemailsTable.css';
import Audioplayer from './Audioplayer';
import axios from 'axios';
import { parsePhoneNumber } from 'libphonenumber-js';
import CONFIG from '../../Config.json';

const Message = (props) => {
  let from = props.from;
  let to = props.to;
  let vmbox_id = props.vmbox_id;
  let media_id = props.media_id;
  let itemState = props.itemState;
  let auth_token = props.auth_token;
  let URL = `${CONFIG.API_URL}${CONFIG.API_VERSION}/accounts/${CONFIG.ACCOUNT_ID}/vmboxes/${vmbox_id}/messages/${media_id}/raw?auth_token=${auth_token}`
  return (
    <div className = {`tr-content row ${(props.playStatus.audioPlay && props.audioId !== props.playStatus.audioId)?'disabledbutton': ''}`}>
      <div className="col-md-2 row">
        <div className="col-md-3">
          { itemState.allItem || ((props.folder === "new" && itemState.newItem && !itemState.listenedItem) || (props.folder !== "new" && itemState.listenedItem && !itemState.newItem)) ? <input type='checkbox' className="checkbox" checked/>:<input type='checkbox' className="checkbox"/>}
        </div>
        <div className="col-md-9">
          {props.folder == "new" ? <span className="newstatus">New</span> : <span className="listenedstatus">Listened</span>}
        </div>
      </div>
      <div className="col-md-2">{getDateTime(props.timestamp).date}<br /><span className='grey'>{getDateTime(props.timestamp).time}</span></div>
      <div className="col-md-2">{props.caller_id_name}<br/><span className='grey'>{getPhoneNumber((from).split("@")[0])}</span></div>
      <div className="col-md-2">{getPhoneNumber((to).split("@")[0])}</div>
      <div className="col-md-4">
      { (props.playStatus.audioPlay && props.audioId === props.playStatus.audioId)?
        <div className="row">
          <div className="col-md-10"><Audioplayer props={props}/></div>
          <div className="col-md-2"><button className="audio-close" onClick={()=>props.audioPlayerEnd(props.audioId,vmbox_id,media_id)}>Close</button></div>
        </div> :
        <div className="row">
          <div className="col-md-6">{getDuration(props.length/1000)}</div>
          <div className="col-md-6">
            <div className="text-right pr-2">
              <button className="audioplay mr-3" onClick={()=>props.audioPlayer(props.audioId)}><img src='../../play.png' width="120%"/></button>
              <button className="audiodown"><a href={URL} target="_blank"><img src='../../download.png' width="120%" /></a></button>
            </div>
          </div>
        </div>
      }
      </div>
    </div>
  )
}

function getDateTime(timestamp){

  let stamp = new Date(timestamp * 1000);
  let year = stamp.getFullYear()-1970;
  let month = stamp.getMonth()+1;
  let date = "0"+ stamp.getDate();
  let hours = "0" + stamp.getHours();
  let minutes = "0" + stamp.getMinutes();
  let seconds = "0" + stamp.getSeconds();
  let formattedDate = month + "/" + date.substr(-2) + "/" + year;
  let formattedTime = hours.substr(-2) + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
  let dateTime = {"date": formattedDate, "time":formattedTime}
  return dateTime;
}
// convert senconds to HH-MM-SS format - customization
function getDuration (totalSeconds) {
  let hours   = Math.floor(totalSeconds / 3600);
  let minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
  let seconds = Math.floor(totalSeconds - (hours * 3600) - (minutes * 60));
  // round seconds
  seconds = Math.round(seconds * 100) / 100

  let result = "";
  if(hours != 0) {  // hour is 0 then don't display hour format
    (hours < 10 ? "0" + hours : hours) + ":";
  }
  result += (minutes < 10 ? "0" + minutes : minutes) + ":";
  result += (seconds  < 10 ? "0" + seconds : seconds);

  return result;
}
function getPhoneNumber(number){
  let phoneNumber = parsePhoneNumber("+"+number).formatInternational();
  let number_arr = phoneNumber.split(" ");
  var number = number_arr[0]+" "+number_arr[1]+"-"+number_arr[2]+"-"+number_arr[3];
  return number
}

class VoicemailsTable extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      allmessages: [],
      audioPlay: false,
      audioId: '',
      checkKey: '',
      checkState: false,
      messageRecords:""
    }
    //does whatever stuff
    this.audioPlayer = this.audioPlayer.bind(this);
    this.audioPlayerEnd = this.audioPlayerEnd.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.filtermailList = this.filtermailList.bind(this);
    this.getPhoneNumber = this.getPhoneNumber.bind(this);
  }

  componentDidUpdate(preProps) {
    const {allmessages} = this.props;
    if(allmessages != preProps.allmessages) {
      let perPage = this.props.perPage;
      let currentPage = this.props.currentPage;
      let messageRecords = this.filtermailList(allmessages, perPage, currentPage);
      this.setState({messageRecords: messageRecords})
    }
  }
  getPhoneNumber = (number) => {
    let phoneNumber = parsePhoneNumber("+"+number).formatInternational();
    let number_arr = phoneNumber.split(" ");
    var number = number_arr[0]+" "+number_arr[1]+"-"+number_arr[2]+"-"+number_arr[3];
    return number
  }
  filtermailList = (messageRecords, perPage, currentPage, search) => {
    let subMessageRecords = [];
    if (messageRecords && messageRecords.length > 0) {
      for (var index = perPage * currentPage; index < perPage * (currentPage + 1); index++) {
        if (messageRecords[index]) {
          if (!search) {
            subMessageRecords.push(messageRecords[index]);
          }else{
            let searchKey = search.trim();
            let from = this.getPhoneNumber(messageRecords[index].from.split("@")[0]);
            let to = this.getPhoneNumber(messageRecords[index].to.split("@")[0]);
            if(from.includes(searchKey)||to.includes(searchKey) || messageRecords[index].caller_id_name.includes(searchKey))
              subMessageRecords.push(messageRecords[index]);
          }
        }
      }
    }
    return subMessageRecords;
  }
  audioPlayer(key){
    this.setState({
      audioId: key,
      audioPlay: !this.state.audioPlay
    })
  }
  audioPlayerEnd(key,vmbox_id,media_id){
    let url = `${CONFIG.API_VERSION}/accounts/${CONFIG.ACCOUNT_ID}/vmboxes/${vmbox_id}/messages/${media_id}`;
    axios.post(url)
    .then((res) => {
      this.props.history.push("/voicemails/")
    })
    .catch((error) => {
      console.log(error)
    })
    this.setState({
      audioId: key,
      audioPlay: !this.state.audioPlay
    })
  }
  handleChange(key){
    this.setState({
      checkKey: key,
      checkState: !this.state.checkState
    })
  }
  render () {
    const {allmessages} = this.props;

    let perPage = this.props.perPage;
    let currentPage = this.props.currentPage;
    let searchKey = this.props.searchKey;
    let messageRecords = this.filtermailList(allmessages, perPage, currentPage, searchKey);
    console.log(this.props)
    return (
      <div className="row text-left">
        <div className='voicemailtable'>
          <div className="row1">
            <div className="col-md-2 row">
              <div className="col-md-3"> </div>
              <div className="col-md-6">STATUS</div>
            </div>
            <div className="col-md-2">DATE/TIME</div>
            <div className="col-md-2">FROM</div>
            <div className="col-md-2">TO</div>
            <div className="col-md-2">DURATION</div>
            <div className="col-md-2"></div>
          </div>
          { messageRecords && messageRecords.length > 0 ? messageRecords.map((message, index) =>
              <Message audioPlayer={this.audioPlayer}
                      audioPlayerEnd={this.audioPlayerEnd}
                      auth_token={this.props.auth_token}
                      itemState={this.props.itemState}
                      handleChange={this.props.handleChange}
                      vmbox_id={this.props.vmbox_id}
                      playStatus={this.state}
                      audioId = {index}
                      key={index} {...message}
                />
            ): null
            }
        </div>
      </div>
    )
  }
}

export default VoicemailsTable
