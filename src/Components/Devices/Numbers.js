import React from 'react'
import './Numbers.css'
import './circle.css';
import i18n from '../Common/i18n';
import { parsePhoneNumber } from 'libphonenumber-js';

export class Numbers extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      callData: '',
      selected_num: ''
    });
    this.onChageNumber = this.onChageNumber.bind(this);
  }
  componentDidUpdate(preProps) {
    const today_data = this.props.today_data;
    const numbers = this.props.phone_num;
    if(today_data !== preProps.today_data) {
      let today_count, today_total, phoneNumber;
      let callData =[];
      numbers && numbers.map((element, index) => {
        phoneNumber = this.getPhoneNumber(element)? this.getPhoneNumber(element):element;
        today_count = 0;
        today_total = today_data.length;
        if(today_data.length === 0){
          today_total = 1;
        }
        today_data && today_data.map((value, index) => {
          if(value.dialed_number === element || value.caller_id_number === element)
            today_count++;
        })
        callData.push({ phoneNumber, today_count, today_total})
        this.setState({callData:callData});
      })
      this.setState({selected_num: callData[0].phoneNumber?callData[0].phoneNumber:""})
    }
  }
  getPhoneNumber = (number) =>{
    let phone_number = "";
    if(!number.includes("+")) {
      return phone_number;
    }
    else{
      phone_number = parsePhoneNumber(number)
      let phone_num = phone_number.formatInternational();
      let number_arr = phone_num.split(" ");
      var phoneNumber = number_arr[0]+" "+number_arr[1]+"-"+number_arr[2]+"-"+number_arr[3];
      return phoneNumber;
    }
  }
  onChageNumber = (e) =>{
    this.setState({selected_num: e.target.value})
  }
  render () {
    let lng = this.props.lng;
    return (
      <div id='numbers' className="text-left common-box">
        <div className="call-title"><h4>{i18n.t('numbers.label', { lng })}</h4></div>
        <table>
          <thead>
            <tr>
              <td>
                <span id='num' className="mr-3">{this.props.phone_num.length}</span>
                <span className="font-grey">{i18n.t('total.label', { lng })}</span>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <select className="browser-default custom-select" onChange={this.onChageNumber}>
                {this.state.callData.length>0 && this.state.callData.map((element, index) => {
                  return(
                    <option value={element.phoneNumber} key={index}>{element.phoneNumber}</option>
                  )
                  })
                }
                </select>
              </td>
            </tr>
            <tr>
              <td>
                {this.state.callData.length>0 && this.state.callData.map((element, index) => {
                  if(element.phoneNumber === this.state.selected_num) {
                    return (
                      <div key={index}>
                        <div className='float-left' >
                          <div className="mb-4"><h5>{i18n.t('usage.label', { lng })+" "+i18n.t('today.label', { lng })}</h5></div>
                          <div>
                            <h1 className="mb-0">{element.today_count*100/element.today_total}%</h1>
                          </div>
                          <div>
                            <span className="grey">{element.today_count} {i18n.t('callcount.label', { lng })}</span>
                          </div>
                        </div>
                        <div className='float-right'>
                          <div className={`c100 p${(element.today_count * 100)/element.today_total}`}>
                            <div className="slice">
                                <div className="bar"></div>
                                <div className="fill"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  })
                }
              </td>
            </tr>
          </tbody>
        </table>
        <div className="view-all" onClick={()=>this.props.history.push("/devices")}>{i18n.t('viewall.label', { lng })}</div>
      </div>
    )
  }
}
