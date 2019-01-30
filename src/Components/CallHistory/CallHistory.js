import React from 'react'
import { parsePhoneNumber } from 'libphonenumber-js'
import i18n from '../Common/i18n';
import moment from 'moment';
export default class CallHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      start: 0,
      end: 0
    });
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
    let formattedDate =  year + "-"+ month + "-" + date.substr(-2) ;
    let formattedTime = hours.substr(-2) + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    let dateTime1 = formattedDate+" "+ formattedTime;
    let gmtDateTime = moment.utc(dateTime1, "YYYY-MM-DD HH:mm:ss");
    let local = gmtDateTime.local().format('MM/DD/YYYY HH:mm:ss');
    let dateTime = {"date": local.split(" ")[0], "time":local.split(" ")[1]};
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
              <th width="4%"></th>
              <th width="23%">{i18n.t('from.label', { lng })}</th>
              <th width="23%">{i18n.t('to.label', { lng })}</th>
              <th width="23%">{i18n.t('date_time.label', { lng })}</th>
              <th width="23%" className="text-right">{i18n.t('duration.label', { lng })}</th>
              <th width="2%"></th>
            </tr>
          </thead>
          <tbody>
            { this.props.calldata && this.props.calldata.length > 0 ? this.props.calldata.map((call, index) => {
              while(index<3){
                return(
                  <tr key={index}>
                    <td className="first-child"></td>
                    <td className="second-child ">
                    { call.direction === 'inbound' ? (
                        <img src='outgoing.png' className="ml-1" alt="outgoing"/>
                      ):(call.hangup_cause === 'USER_BUSY' ?
                        <img src='incoming.png' className="ml-1" alt="incoming"/> :<img src='missed.png' className="ml-1" alt="missed"/>
                      )
                    }
                    </td>
                    <td>
                      <div>
                        <span className='name text-left'>{call.caller_id_name}</span>
                        <br />
                        <span className='number text-left'>
                          {this.getPhoneNumber(call.caller_id_number)}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div>
                        <span className='name text-left'>{call.callee_id_name}</span>
                        <br />
                        <span className='number text-left'>
                          {this.getPhoneNumber(call.callee_id_number)}
                        </span>
                      </div>
                    </td>
                    <td><span className='date text-left'>{this.getDateTime(call.timestamp).date} - {this.getDateTime(call.timestamp).time}</span></td>
                    <td className='duration text-right'>{this.formatDuration(call.duration_seconds)}</td>
                    <td className="last-child"></td>
                  </tr>
                )
              }
            })
            : <tr className="text-center">
                <td colSpan="7">
                  <h2>{i18n.t('no.label', { lng })+" "+i18n.t('results.label', { lng })}!</h2>
                </td>
              </tr>
            }
          </tbody>
        </table>
        <div className="view-all mr-2" onClick={()=>this.props.history.push("/history")}>{i18n.t('viewall.label', { lng })}</div>
      </div>
    )
  }
}