import React from 'react'
import './Faxes.css'
import CONFIG from '../../Config.json';
import { parsePhoneNumber } from 'libphonenumber-js';
import i18n from '../Common/i18n';
import moment from 'moment';
export class Faxes extends React.Component {
  getPhoneNumber = (number) => {
    let phoneNumber = parsePhoneNumber("+"+number).formatInternational();
    let number_arr = phoneNumber.split(" ");
    var finalnumber = number_arr[0]+" "+number_arr[1]+"-"+number_arr[2]+"-"+number_arr[3];
    return finalnumber
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
  render () {
    let lng = this.props.lng;
    return (
      <div  id ="call-history" className="text-left missed-call-box">
        <div className="call-title">
          <h5>{i18n.t('faxes.label', { lng })}</h5>
        </div>
        <table className="none-border">
          <thead className="calltable-thead">
            <tr>
              <th width="2%"></th>
              <th width="4%"></th>
              <th width="25%">{i18n.t('from.label', { lng })}</th>
              <th width="30%">{i18n.t('to.label', { lng })}</th>
              <th width="30%">{i18n.t('date_time.label', { lng })}</th>
              <th width="7%"></th>
              <th width="2%"></th>
            </tr>
          </thead>
          <tbody>
          { this.props.faxesdata && this.props.faxesdata.map((fax, index) => {
            let URL = `${CONFIG.API_URL}${CONFIG.API_VERSION}/accounts/${CONFIG.ACCOUNT_ID}/faxes/inbox/${fax.id}/attachment?auth_token=${this.props.auth_token}`;
            while(index<3){
              return(
                <tr key={index}>
                  <td className="first-child"></td>
                  <td className="second-child ">
                    <img src='fax-sidebar.png'  alt="icon"/>
                  </td>
                  <td>
                    {fax.from}<br/>
                    <span className='grey'>
                      { this.getPhoneNumber(fax.from_number)}
                    </span>
                  </td>
                  <td>
                    {this.props.faxbox.faxbox_name}<br/>
                    <span className='grey'>
                      { this.props.faxbox.caller_name}
                    </span>
                  </td>
                  <td>
                    <span className='date text-left'>{this.getDateTime(fax.timestamp).date}</span> - {this.getDateTime(fax.timestamp).time}
                  </td>
                  <td className="text-right">
                    <button className="faxdownload">
                      <a href={URL} target="_blank">
                        <img src='download.png'  alt="download" width="120%" />
                      </a>
                    </button>
                  </td>
                  <td className="last-child"></td>
                </tr>
              )}
            }
          )}
          { !this.props.faxesdata &&
            <tr className="text-center">
              <td colSpan="7">
                <h2>{i18n.t('no.label', { lng })+" "+i18n.t('results.label', { lng })}!</h2>
              </td>
            </tr>
          }
        </tbody>
       </table>
        <div className="view-all mr-2" onClick={()=>this.props.history.push("/faxes")}>{i18n.t('viewall.label', { lng })}</div>
      </div>
    )
  }
}
