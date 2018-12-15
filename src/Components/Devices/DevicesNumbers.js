import React from 'react';
import { Topbar } from '../Common/Topbar';
import { connect } from 'react-redux';
import './DevicesNumbers.css';
import './circle.css';
import { parsePhoneNumber } from 'libphonenumber-js';
import { getalldevices } from '../../Actions/devices.action';
import _ from 'lodash';

class DevicesNumbers extends React.Component {
  constructor(props) {
    super(props);
    this.viewToday = this.viewToday.bind(this);
    this.viewPastweek = this.viewPastweek.bind(this);
    this.state = {
      number_id: '',
      sort: "today"
    }
  }
  componentWillMount () {
   this.props.getalldevices();
 }
  componentDidMount () {

    !this.props.loading ? this.props.getalldevices() : null;
  }
  componentDidUpdate(preProps) {

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
    this.setState({
      number_id: value,
      sort: "today"
    })
  }
  viewPastweek = (value) => {
    this.setState({
      number_id: value,
      sort: "pastweek"
    })
  }
  render () {
    let all_devices_numbers  = _.defaults(this.props.all_devices_numbers);
    let devices = all_devices_numbers.alldevices;
    let numbers = all_devices_numbers.phone_num;
    let today_data = _.defaults(all_devices_numbers.total_data).today_data;
    let pastweek_data = _.defaults(all_devices_numbers.total_data).pastweek_data;

    return (
      <div className="main">
        <Topbar title="Devices & Numbers" />
        <div className="content">
          <div className="row">
            <div className="col-sm-12 text-left">
              <span className="mt-4">Devices</span>
              <div className="row mt-3">
                { devices && devices.map((device,index) => {
                  return (
                    <div className="col-sm-3" key={index}>
                      <div className={`devices-top ${!device.regsiter?"devices-top-wrap-red":""}`} >
                        { device.device_type === "sip_device" && <div>
                            <img className="corner" src={device.regsiter ? "desk-avatar.png":"desk-avatar-red.png"} />
                            <img src="desk.png" />
                          </div>
                        }
                        { device.device_type === "cellphone" && <div>
                            <img className="corner" src={device.regsiter ? "iphone.png":"iphone-red.png" } />
                            <img src="cell.png" />
                          </div>
                        }
                        {device.device_type === "softphone" && <div>
                            <img className="corner" src={device.regsiter ? "soft.png":"soft-red.png"} />
                            <img src="device-soft.png" />
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
            <div className="col-sm-12 text-left">
              <span className="mt-4">Numbers</span>
              <div className="row mt-3">
                { numbers && numbers.map((element, index) => {
                  var phoneNumber = this.getPhoneNumber(element.numbers[1]);
                  let today_total = today_data.total_count1;
                  let today_value = today_data.user_data1;
                  let today_count = 0;
                  today_value && today_value.map((value, index) => {
                    if(value.dialed_number === element.numbers[0])
                      today_count++;
                  })
                  let pastweek_total = pastweek_data.total_count2;
                  let pastweek_value = pastweek_data.user_data2;
                  let pastweek_count = 0;
                  pastweek_value && pastweek_value.map((value, index) => {
                    if(value.dialed_number === element.numbers[0])
                      pastweek_count++;
                  })
                  return(
                    <div className="col-md-3" key={index}>
                      <div className="devices-top">
                        { phoneNumber } <img src="usa.png" className="ml-1"/>
                        <p className="mt-3 grey">
                          <span className={`mr-3 ${this.state.sort === "today"?"active_line":""}`} onClick={() => this.viewToday(index)}>Today</span>
                          <span className={`${this.state.sort === "pastweek"?"active_line":""}`} onClick={() => this.viewPastweek(index)}>Past Week</span>
                        </p>
                        <hr />
                        { ((this.state.number_id === '' || index === this.state.number_id) && this.state.sort === "today") ?
                          <div className="row">
                            <div className="col-sm-6 text-right">
                              <div className="numbers-wrap">
                                <h2 className="grey mt-3">{(today_count * 100)/today_total}%</h2>
                                <span className="grey mb-5">
                                    All Calls
                                </span>
                              </div>
                            </div>
                            <div className="col-sm-6 text-left">
                              <div className="donut">
                                <div className={`c100 p${(today_count * 100)/today_total}`}>
                                  <div className="slice">
                                      <div className="bar"></div>
                                      <div className="fill"></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                            :
                          <div className="row">
                            <div className="col-sm-6 text-right">
                              <div className="numbers-wrap">
                                <h2 className="grey mt-3">{(pastweek_count * 100)/pastweek_total}%</h2>
                                <span className="grey mb-5">
                                    All Calls
                                </span>
                              </div>
                            </div>
                            <div className="col-sm-6 text-left">
                              <div className="donut">
                                <div className={`c100 p${(pastweek_count * 100)/pastweek_total}`}>
                                  <div className="slice">
                                      <div className="bar"></div>
                                      <div className="fill"></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        }
                      </div>
                    </div>
                  );}
                )}
              </div>
            </div>
          </div>
        </div>


      </div>
    )
  }
}
const mapStateToProps = state => state.devicereducer
const mapDispatchToProps = (dispatch) => ({
  getalldevices: () => dispatch(getalldevices())
})

export default connect(mapStateToProps, mapDispatchToProps)(DevicesNumbers)
