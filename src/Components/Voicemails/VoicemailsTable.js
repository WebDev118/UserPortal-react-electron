import React from 'react';
import {connect} from 'react-redux';
import './VoicemailsTable.css';
import Audioplayer from './Audioplayer';
import moment from 'moment';
import { parsePhoneNumber } from 'libphonenumber-js';
import CONFIG from '../../Config.json';

const Message = (props) => {
  let from = props.from;
  let to = props.to;
  let vmbox_id = props.vmbox_id;
  let media_id = props.media_id;
  let auth_token = props.auth_token;
  let URL = `${CONFIG.API_URL}${CONFIG.API_VERSION}/accounts/${CONFIG.ACCOUNT_ID}/vmboxes/${vmbox_id}/messages/${media_id}/raw?auth_token=${auth_token}`
  return (
    <div className = {`tr-content row ${(props.playStatus.audioPlay && props.audioId !== props.playStatus.audioId)?'disabledbutton': ''}`}>
      <div className="col-md-2 row">
        <div className="col-md-3">
          <input type='checkbox' className="checkbox"/>
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
          <div className="col-md-2"><button className="audio-close" onClick={()=>props.audioPlayer(props.audioId)}>Close</button></div>
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
  // console.log(number_arr[0]);
  // console.log(number_arr[3]+" "+number_arr[2])
  var number = number_arr[0]+" "+number_arr[1]+"-"+number_arr[2]+"-"+number_arr[3];
  return number
}

class VoicemailsTable extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      allmessages: [],
      audioPlay: false,
      audioId: ''
    }
    //does whatever stuff
    this.audioPlayer = this.audioPlayer.bind(this);

  }

  componentDidUpdate(preProps, preState) {

  }
  audioPlayer(key){
    this.setState({
      audioId: key,
      audioPlay: !this.state.audioPlay
    })
  }
  render () {
    const {allmessages} = this.props;

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
          { allmessages && allmessages.length > 0 ? allmessages.map((message, index) => <Message audioPlayer={this.audioPlayer} auth_token={this.props.auth_token} vmbox_id={this.props.vmbox_id} playStatus={this.state} audioId = {index} key={index} {...message}/>) : null }
        </div>
      </div>
    )
  }
}

export default VoicemailsTable
