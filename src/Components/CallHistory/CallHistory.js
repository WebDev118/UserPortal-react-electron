import React from 'react'
import { parsePhoneNumber } from 'libphonenumber-js'
import i18n from '../Common/i18n';
export default class CallHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      start: 0,
      end: 0
    });
  }
  getName = (call) => {
    let name = '';
    if (call.direction === "inbound") {
      if (call.caller_id_name) {
        name = call.caller_id_name;
      } else {
        name = call.caller_id_number;
      }
    } else if (call.direction === "outbound") {
      if (call.callee_id_name) {
        name = call.callee_id_name;
      } else {
        name = call.callee_id_number;
      }
    }

    return name;
  }
  getPhoneNumber = (number) => {
    let phone_number = "";
    var phoneNumber;
    if(!number.includes( "+" )) {
      if (number.length === 11) {
        phone_number = parsePhoneNumber("+" + number)
        let phone_num = phone_number.formatInternational();
        let number_arr = phone_num.split(" ");
        phoneNumber = number_arr[0] + " " + number_arr[1] + "-" + number_arr[2] + "-" + number_arr[3];
        return phoneNumber;
      } else if (number.length === 10) {
        phone_number = parsePhoneNumber("+1" + number);
        let phone_num = phone_number.formatInternational();
        let number_arr = phone_num.split(" ");
        phoneNumber = number_arr[0] + " " + number_arr[1] + "-" + number_arr[2] + "-" + number_arr[3];
        return phoneNumber;
      } else {
        return number;
      }
    }
    else{
      phone_number = parsePhoneNumber(number)
      let phone_num = phone_number.formatInternational();
      let number_arr = phone_num.split(" ");
      phoneNumber = number_arr[0] + " " + number_arr[1] + "-" + number_arr[2] + "-" + number_arr[3];
      return phoneNumber;
    }
  }

  getDateTime = (timestamp) => {
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

  formatDuration = (sec) => {
    var date = new Date(null);
    date.setSeconds(sec); // specify value for SECONDS here
    var timeString = date.toISOString().substr(11, 8);
    timeString = timeString.split(':')[1] + ":" + timeString.split(':')[2];
    return timeString;
  }

  render () {
    let lng = this.props.lng;
    return (
      <div id='call-history' className="text-left missed-call-box">
        <div className="call-title">
          <h5>{i18n.t('callhistory.label', { lng })}</h5>
        </div>
        <table className="none-border">
          <thead className="calltable-thead">
            <tr>
              <th width="2%"></th>
              <th width="3%"></th>
              <th width="25%">{i18n.t('from.label', { lng })}</th>
              <th width="25%">{i18n.t('to.label', { lng })}</th>
              <th width="25%">{i18n.t('date_time.label', { lng })}</th>
              <th width="20%" className="text-right">{i18n.t('duration.label', { lng })}</th>
              <th width="5%"></th>
            </tr>
          </thead>
          <tbody>
            { this.props.calldata && this.props.calldata.length > 0 ? this.props.calldata.map((call, index) =>
              { while(index < 3)
                return(
                  <tr key={index}>
                    <td className="first-child"></td>
                    <td className="second-child ">
                    { call.direction === 'inbound' ? (
                        <img src='outgoing.png' className="ml-3" alt="outgoing"/>
                      ):(call.hangup_cause === 'USER_BUSY' ?
                        <img src='incoming.png' className="ml-3" alt="incoming"/> :<img src='missed.png' alt="missed"/>
                      )
                    }
                    </td>
                    <td>
                      <div>
                        <img id='avatar' className="text-left" src='avatar.png' alt="avatar"/>
                      </div>
                      <div>
                        <span className='name text-left'>{this.getName(call)}</span>
                        <br />
                        <span className='number text-left'>
                        {call.direction === 'outbound' ? (
                          this.getPhoneNumber(call.caller_id_number)
                        ) : (
                          this.getPhoneNumber(call.callee_id_number)
                        )}
                        </span>
                      </div>
                    </td>
                    <td>
                    {call.direction === 'inbound' ? (
                      this.getPhoneNumber(call.callee_id_number)
                    ) : (
                      this.getPhoneNumber(call.caller_id_number)
                    )}
                    </td>
                    <td><span className='date text-left'>{this.getDateTime(call.timestamp).date}</span><br /><span className='time'>{this.getDateTime(call.timestamp).time}</span></td>
                    <td className='duration text-right'>{this.formatDuration(call.duration_seconds)}</td>
                    <td className="last-child"></td>
                  </tr>
                )}
            ) : null }
          </tbody>
        </table>
        <div className="view-all mr-2" onClick={()=>this.props.history.push("/history")}>{i18n.t('viewall.label', { lng })}</div>
      </div>
    )
  }
}