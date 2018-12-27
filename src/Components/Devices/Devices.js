import React from 'react';
import i18n from '../Common/i18n';
import './Devices.css';
import { Progress } from 'reactstrap';
export default class Devices extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deviceData: []
    }
  }
  componentDidUpdate(preProps) {
    let calldata  = this.props.calldata;
    let devices = this.props.alldevices;
    let deviceData = [];
    if(calldata !== preProps.calldata || devices !== preProps.alldevices) {
      let totalcount = calldata.length>0 ? calldata.length : 1;
      let devicecall;
      devices.map((device, index)=>{
        devicecall = 0;
        calldata.map((data, index)=>{
          if(device.id === data.authorizing_id){
            devicecall ++;
          }
        })
        deviceData.push({
          id:device.id,
          name: device.name,
          device_type:device.device_type,
          mac_address: device.mac_address,
          regsiter: device.regsiter,
          callcount: devicecall,
          totalcount: totalcount
        });
      })
      this.setState({deviceData:deviceData});
    }
  }
  render () {
    let devices = this.props.alldevices;
    let total = devices.length;
    let regsiter = 0;
    if(devices){
      devices.map((device,index) => {
        if(device.regsiter)
          regsiter ++;
      })
    }
    let lng = this.props.lng;
    return (
      <div id='devices' className="text-left devices-box">
        <div className="call-title"><h4>{i18n.t('devices.label', { lng })}</h4></div>
        <table>
          <thead>
            <tr>
              <th>
                <span id='num'>{total}</span>{i18n.t('total.label', { lng })}
                <span id='num'>{regsiter}</span>{i18n.t('registered.label', { lng })}
              </th>
              <th>{i18n.t('usage.label', { lng })+" "+i18n.t('today.label', { lng })}</th>
            </tr>
          </thead>
          <tbody>
            { this.state.deviceData && this.state.deviceData.map((device,index) => {
              return (
                <tr key={index}>
                  <td>
                    <div className="row">
                      <div className="col-md-2 text-right">
                        { device.device_type === "sip_device" &&
                          <img src={device.regsiter ? "desk-avatar.png":"desk-avatar-red.png"} alt="icon" />
                        }
                        { device.device_type === "cellphone" &&
                            <img src={device.regsiter ? "iphone.png":"iphone-red.png" } alt="icon"/>
                        }
                        { device.device_type === "softphone" &&
                          <img  src={device.regsiter ? "soft.png":"soft-red.png"} alt="icon"/>
                        }
                      </div>
                      <div className="col-md-10">
                        <div>{device.name}<br />
                          <span id='device-id'>{device.mac_address}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="row">
                      <div className="col-md-2 text-right">
                        {(device.callcount*100)/device.totalcount}%
                      </div>
                       <div className="col-md-8 mt-2">
                        <Progress value={(device.callcount*100)/device.totalcount} />
                        <span className="grey">{device.callcount}{" "+i18n.t('callcount.label', { lng })}</span>
                      </div>
                    </div>
                  </td>
                </tr>
                );
              })
            }
          </tbody>
        </table>
        <div className="view-all" onClick={()=>this.props.history.push("/devices")}>{i18n.t('viewall.label', { lng })}</div>
      </div>
    )
  }
}
