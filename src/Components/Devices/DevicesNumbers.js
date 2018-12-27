import React from 'react';
import  Topbar  from '../Common/Topbar';
import { connect } from 'react-redux';
import './DevicesNumbers.css';
import './circle.css';
import { parsePhoneNumber } from 'libphonenumber-js';
import { getalldevices } from '../../Actions/devices.action';
import i18n from '../Common/i18n';
import _ from 'lodash';

class DevicesNumbers extends React.Component {
  constructor(props) {
    super(props);
    this.viewToday = this.viewToday.bind(this);
    this.viewPastweek = this.viewPastweek.bind(this);
    this.state = {
      callData:'',
      callState: '',
      user_name: ''
    }
  }
  componentWillMount () {
    this.props.getalldevices();
  }
  componentDidMount () {
    !this.props.loading ? this.props.getalldevices() : null;
  }
  componentDidUpdate(preProps) {
    let all_devices_numbers  = _.defaults(this.props.devicereducer.all_devices_numbers);
    if(all_devices_numbers !== _.defaults(preProps.devicereducer.all_devices_numbers)) {
      let numbers = all_devices_numbers.phone_num;
      let user_name = all_devices_numbers.full_name;
      let today_data = _.defaults(all_devices_numbers.total_data).today_data;
      let pastweek_data = _.defaults(all_devices_numbers.total_data).pastweek_data;
      let callData =[];
      let callState = [];
      let phoneNumber, today_count, today_total, pastweek_count, pastweek_total;
      numbers && numbers.map((element, index) => {

        phoneNumber = this.getPhoneNumber(element)? this.getPhoneNumber(element):element;
        today_count = 0;
        today_total = today_data.length;
        if(today_data.length === 0){
          today_total = 1;
        }
        pastweek_count = 0;
        pastweek_total = pastweek_data.length;

        if(pastweek_data.length === 0){
          pastweek_total = 1;
        }
        today_data && today_data.map((value, index) => {
          if(value.dialed_number === element || value.caller_id_number === element)
            today_count++;
        })
        pastweek_data && pastweek_data.map((value, index) => {
          if(value.dialed_number === element || value.caller_id_number === element)
            pastweek_count++;
        })

        callData.push({ phoneNumber, today_count, today_total, pastweek_count, pastweek_total})
        callState.push({phone: phoneNumber, today:true, week:false})
        this.setState({callData:callData});
        this.setState({callState:callState});
        this.setState({user_name: user_name})
      })
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
  viewToday = (value) => {
    if(this.state.callState){
      let data = []
      this.state.callState.map((element, index)=>{
        if(value === element.phone){
          data.push({phone:value,today:true,week:false})
        }
        else{
          data.push({phone:element.phone, today:element.today, week:element.week})
        }
      })
      this.setState({callState:data})
    }
  }
  viewPastweek = (value) => {
    if(this.state.callState){
      let data = []
      this.state.callState.map((element, index)=>{
        if(value === element.phone){
          data.push({phone:value,today:false,week:true})
        }
        else{
          data.push({phone:element.phone, today:element.today, week:element.week})
        }
      })
      this.setState({callState:data})
    }
  }
  render () {
    let all_devices_numbers  = _.defaults(this.props.devicereducer.all_devices_numbers);
    let devices = all_devices_numbers.alldevices;
    let {lng} = this.props.language;
    return (
      <div className="main">
        { this.props.devicereducer.loading &&
          <div className="loader_container">
            <div className="loader"></div>
          </div>
        }
        <Topbar title={i18n.t('devices.label', { lng })+" "+i18n.t('numbers.label', { lng })} user_name={this.state.user_name} />
        <div className="content">
          <div className="row">
            <div className="col-md-12 text-left">
              <span className="mt-4">{i18n.t('devices.label', { lng })}</span>
              <div className="row mt-3">
                { devices && devices.map((device,index) => {
                  return (
                    <div className="col-md-3" key={index}>
                      <div className={`devices-top ${!device.regsiter?"devices-top-wrap-red":""}`} >
                        { device.device_type === "sip_device" && <div>
                            <img className="corner" src={device.regsiter ? "desk-avatar.png":"desk-avatar-red.png"} alt="device"/>
                            <img src="desk.png" alt="device"/>
                          </div>
                        }
                        { device.device_type === "cellphone" && <div>
                            <img className="corner" src={device.regsiter ? "iphone.png":"iphone-red.png" } alt="device"/>
                            <img src="cell.png" alt="device"/>
                          </div>
                        }
                        {device.device_type === "softphone" && <div>
                            <img className="corner" src={device.regsiter ? "soft.png":"soft-red.png"} alt="device"/>
                            <img src="device-soft.png" alt="device"/>
                          </div>
                        }
                        <p>{device.name}</p>
                        <span className="grey">{device.mac_address}</span>
                      </div>
                    </div>
                  );
                  })
                }
              </div>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-md-12 text-left">
              <span className="mt-4">{i18n.t('numbers.label', { lng })}</span>
              <div className="row mt-3">
                { this.state.callData && this.state.callData.map((element, index) => {
                  return(
                    <div className="col-md-3" key={index}>
                      <div className="devices-top">
                        { element.phoneNumber } <img src="usa.png" className="ml-1" alt="flag"/>
                        <p className="mt-3 grey">
                          { element.phoneNumber === this.state.callState[index].phone && this.state.callState[index].today ?
                            <span className="mr-3 active_line" onClick={() => this.viewToday(index)}>{i18n.t('today.label', { lng })}</span>
                            :<span className="mr-3" onClick={() => this.viewToday(element.phoneNumber)}>{i18n.t('today.label', { lng })}</span>
                          }
                          {element.phoneNumber === this.state.callState[index].phone && this.state.callState[index].week ?
                            <span className="active_line" onClick={() => this.viewPastweek(index)}>{i18n.t('past_week.label', { lng })}</span>
                            :<span className="" onClick={() => this.viewPastweek(element.phoneNumber)}>{i18n.t('past_week.label', { lng })}</span>
                          }
                        </p>
                        <hr />
                        { element.phoneNumber === this.state.callState[index].phone && this.state.callState[index].today ?
                          <div className="row">
                            <div className="col-md-6 text-right">
                              <div className="numbers-wrap">
                                <h2 className="grey mt-3">{(element.today_count * 100)/element.today_total}%</h2>
                                <span className="grey mb-5">
                                  {i18n.t('all.label', { lng })+" "+i18n.t('callcount.label', { lng })}
                                </span>
                              </div>
                            </div>
                            <div className="col-md-6 text-left">
                              <div className="donut">
                                <div className={`c100 p${(element.today_count * 100)/element.today_total}`}>
                                  <div className="slice">
                                      <div className="bar"></div>
                                      <div className="fill"></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          :( element.phoneNumber === this.state.callState[index].phone && this.state.callState[index].week ?
                            <div className="row">
                              <div className="col-md-6 text-right">
                                <div className="numbers-wrap">
                                  <h2 className="grey mt-3">{(element.pastweek_count * 100)/element.pastweek_total}%</h2>
                                  <span className="grey mb-5">
                                    {i18n.t('all.label', { lng })+" "+i18n.t('callcount.label', { lng })}
                                  </span>
                                </div>
                              </div>
                              <div className="col-md-6 text-left">
                                <div className="donut">
                                  <div className={`c100 p${(element.pastweek_count * 100)/element.pastweek_total}`}>
                                    <div className="slice">
                                        <div className="bar"></div>
                                        <div className="fill"></div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            : ""
                          )
                        }
                      </div>
                    </div>
                    );
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({devicereducer: state.devicereducer, language: state.language})
const mapDispatchToProps = (dispatch) => ({
  getalldevices: () => dispatch(getalldevices())
})

export default connect(mapStateToProps, mapDispatchToProps)(DevicesNumbers)
