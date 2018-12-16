import React from 'react'
import { parsePhoneNumber } from 'libphonenumber-js'

export class HistoryTable extends React.Component {

  constructor(props) {
    super(props);

    this.filterCallList = this.filterCallList.bind(this);
    this.getName = this.getName.bind(this);
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
    if(!number.includes( "+" )) {

      if (number.length === 11) {
        phone_number = parsePhoneNumber("+" + number)
        let phone_num = phone_number.formatInternational();
        let number_arr = phone_num.split(" ");
        var phoneNumber = number_arr[0] + " " + number_arr[1] + "-" + number_arr[2] + "-" + number_arr[3];
        return phoneNumber;
      } else if (number.length === 10) {
        phone_number = parsePhoneNumber("+1" + number);
        let phone_num = phone_number.formatInternational();
        let number_arr = phone_num.split(" ");
        var phoneNumber = number_arr[0] + " " + number_arr[1] + "-" + number_arr[2] + "-" + number_arr[3];
        return phoneNumber;
      } else {
        return number;
      }
    }
    else{
      phone_number = parsePhoneNumber(number)
      let phone_num = phone_number.formatInternational();
      let number_arr = phone_num.split(" ");
      var phoneNumber = number_arr[0] + " " + number_arr[1] + "-" + number_arr[2] + "-" + number_arr[3];
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
    let callRecords = this.props.list;
    let perPage = this.props.perPage;
    let currentPage = this.props.currentPage;
    let filter = this.props.filter;
    callRecords = this.filterCallList(callRecords, perPage, currentPage, filter);

    return (
      <div id='call-history'>
        <table>
          <thead>
            <tr>
              <th width="1%"></th>
              <th width="3%"></th>
              <th width="24%">FROM</th>
              <th width="24%">TO</th>
              <th width="24%">DATE/TIME</th>
              <th width="23%">DURATION</th>
              <th width="1%"></th>
            </tr>
          </thead>
          <tbody>
            { callRecords && callRecords.length > 0 ? callRecords.map((call, index) =>
              <tr key={index}>
                <td className="first-child"></td>
                <td className="second-child">
                { call.direction === 'inbound' ? (
                    <img src='outgoing.png' />
                  ) : (
                    <img src='incoming.png' />
                  )
                }
                </td>
                <td>
                  <div>
                    <img id='avatar' src='../../avatar.png' />
                  </div>
                  <div>
                    <span className='name'>{this.getName(call)}</span>
                    <br />
                    <span className='number'>
                    {call.direction === 'inbound' ? (
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
                <td><span className='date'>{this.getDateTime(call.timestamp).date}</span><br /><span className='time'>{this.getDateTime(call.timestamp).time}</span></td>
                <td className='duration'>{this.formatDuration(call.duration_seconds)}</td>
                <td className="last-child"></td>
              </tr>
            ) : null }
          </tbody>
        </table>
      </div>
    )
  }
}
