import React from 'react'
import './Faxes.css'
import CONFIG from '../../Config.json';
import { parsePhoneNumber } from 'libphonenumber-js';
import i18n from '../Common/i18n';
import moment from 'moment';
import _ from 'lodash';
export class Faxes extends React.Component {
  getPhoneNumber = (number) => {
    if(!number.includes( "+" )) number = "+"+number;
    let phoneNumber = parsePhoneNumber(number).formatInternational();
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
    let faxesdata= _.orderBy([...this.props.faxes_inbox_data, ...this.props.faxes_outbox_data],'created', 'desc');
    return (
      <div  id ="call-history" className="text-left faxes-box">
        <div className="fax-title">
          {i18n.t('faxes.label', { lng })}
          {/* <div className="faxes-view-all" onClick={()=>this.props.history.push("/faxes")}>{i18n.t('viewall.label', { lng })}</div> */}
        </div>
        <div className="rencent-faxes">
          <table className="none-border table-striped">
            <thead className="calltable-thead">
              <tr>
                <th width="37%">{i18n.t('from.label', { lng })}</th>
                <th width="33%">{i18n.t('to.label', { lng })}</th>
                <th width="26%" >{i18n.t('date_time.label', { lng })}</th>
                <th width="4%" className="text-right"></th>
              </tr>
            </thead>
            <tbody>
              { faxesdata && faxesdata.map((fax, index) => {
                let URL = `${CONFIG.API_URL}${CONFIG.API_VERSION}/accounts/${CONFIG.ACCOUNT_ID}/faxes/inbox/${fax.id}/attachment?auth_token=${this.props.auth_token}`
                if(fax.folder === "inbox"){
                  return(
                    <tr key={index}>
                      <td className="first-child ml-3">
                        <svg className="fax-icon">
                          <use href="telicon-2.1.0.svg#download"/>
                        </svg>
                        <div className="ml-3">
                          <div className='name text-left'>{fax.from}</div>
                          <div className='number text-left'>
                            {this.getPhoneNumber(fax.from_number)}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className='name text-left'>{ this.props.faxbox.caller_name}</div>
                        <div className='number text-left'>
                          {this.props.faxbox.faxbox_name}
                        </div>
                      </td>
                      <td >
                        <div className='name text-left'>{this.getDateTime(fax.created).date}</div>
                        <div className='number text-left'>
                          {this.getDateTime(fax.created).time}
                        </div>
                      </td>
                      <td className="text-right">
                        <a href={URL} target="_blank">
                          <svg className="fax-icon">
                            <use href="telicon-2.1.0.svg#download-cloud"/>
                          </svg>
                        </a>
                      </td>
                    </tr>
                  )
                }
                if(fax.folder === "outbox"){
                  return(
                    <tr key={index}>
                      <td className="first-child ml-3">
                        <svg className="fax-icon">
                          <use href="telicon-2.1.0.svg#upload"/>
                        </svg>
                        <div className="ml-3">
                          <div className='name text-left'>{fax.from_name}</div>
                          <div className='number text-left'>
                            {this.props.faxbox.faxbox_name}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className='name text-left'>{fax.to_name}</div>
                        <div className='number text-left'>
                          {this.getPhoneNumber(fax.to_number)}
                        </div>
                      </td>
                      <td >
                        <div className='name text-left'>{this.getDateTime(fax.created).date}</div>
                        <div className='number text-left'>
                          {this.getDateTime(fax.created).time}
                        </div>
                      </td>
                      <td className="text-right">
                        <a href={URL} target="_blank">
                          <svg className="fax-icon">
                            <use href="telicon-2.1.0.svg#download-cloud"/>
                          </svg>
                        </a>
                      </td>
                    </tr>
                  )
                }
              })}
              { faxesdata.length<1 &&
                <tr className="text-center">
                  <td colSpan="7">
                    <h2>{i18n.t('no.label', { lng })+" "+i18n.t('results.label', { lng })}!</h2>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
