import React from 'react';
import { parsePhoneNumber } from 'libphonenumber-js';
import i18n from '../Common/i18n';
import moment from 'moment';
export class HistoryTable extends React.Component {

  constructor(props) {
    super(props);

    this.filterCallList = this.filterCallList.bind(this);
    this.getPhoneNumber = this.getPhoneNumber.bind(this);
    this.formatDuration = this.formatDuration.bind(this);
  }

  filterCallList = (callRecords, perPage, currentPage, filter) => {
    let subCallRecords = [];
    if (callRecords && callRecords.length > 0) {
      for (var index = perPage * currentPage; index < perPage * (currentPage + 1); index++) {
        if (callRecords[index]) {
          if (!filter) {
            subCallRecords.push(callRecords[index]);
          } else {
            if ((this.getPhoneNumber(callRecords[index].callee_id_number).indexOf(filter) >= 0)
            || (this.getPhoneNumber(callRecords[index].caller_id_number).indexOf(filter) >= 0)
            || (this.getPhoneNumber(callRecords[index].callee_id_name).indexOf(filter) >= 0)
            || (this.getPhoneNumber(callRecords[index].caller_id_name).indexOf(filter) >= 0)) {
              subCallRecords.push(callRecords[index]);
            }
          }
        }
      }
    }
    return subCallRecords;
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
    let callRecords = this.props.list;
    let perPage = this.props.perPage;
    let currentPage = this.props.currentPage;
    let filter = this.props.filter;
    callRecords = this.filterCallList(callRecords, perPage, currentPage, filter);
    let lng = this.props.lng;
    return (
      <div id='call-history'>
        <table>
          <thead>
            <tr>
              <th width="1%"></th>
              <th width="3%"></th>
              <th width="24%">{i18n.t('from.label', { lng })}</th>
              <th width="24%">{i18n.t('to.label', { lng })}</th>
              <th width="24%">{i18n.t('date_time.label', { lng })}</th>
              <th width="23%">{i18n.t('duration.label', { lng })}</th>
              <th width="1%"></th>
            </tr>
          </thead>
          <tbody>
            { callRecords && callRecords.length > 0 ? callRecords.map((call, index) =>
              <tr key={index}>
                <td className="first-child"></td>
                <td className="second-child">
                { call.direction === 'inbound' ? (
                    <img src='outgoing.png' alt="outgoing"/>
                  ):(call.hangup_cause === 'USER_BUSY' ?
                    <img src='incoming.png' alt="incoming"/> :<img src='missed.png' alt="missed"/>
                  )
                }
                </td>
                <td>
                  <div className="avatar">
                    <img className='img-avatar' src='avatar.png' alt="avatar"/>
                  </div>
                  <div>
                    <span className='name text-left'>{call.caller_id_name}</span><br />
                    <span className='number text-left'>
                      {this.getPhoneNumber(call.caller_id_number)}
                    </span>
                  </div>
                </td>
                <td>
                  <span className='name text-left'>
                    {this.getPhoneNumber(call.callee_id_number)}
                  </span>
                </td>
                <td>
                  <span className='date'>{this.getDateTime(call.timestamp).date}</span><br />
                  <span className='time'>{this.getDateTime(call.timestamp).time}</span>
                </td>
                <td className='duration'>{this.formatDuration(call.duration_seconds)}</td>
                <td className="last-child"></td>
              </tr>
            )
              :<tr className="text-center">
                <td colSpan="7">
                  <h2>{i18n.t('no.label', { lng })+" "+i18n.t('results.label', { lng })}!</h2>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    )
  }
}
