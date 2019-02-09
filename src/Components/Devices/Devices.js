import React from 'react';
import i18n from '../Common/i18n';
import './Devices.css';
import { Progress } from 'reactstrap';
import $ from 'jquery';
export default class Devices extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deviceData: [],
      unregsiter: 0
    }
    this.scroll = this.scroll.bind(this)
  }
  scroll(direction){
    let far = $( '.device-container' ).width()/2*direction;
    let pos = $('.device-container').scrollLeft() + far;
    $('.device-container').animate( { scrollLeft: pos }, 1000)
  }
  componentDidUpdate(preProps) {
    let devices = this.props.alldevices;
    let unregsiter = 0;
    if(devices !== preProps.alldevices) {
      this.setState({deviceData:devices});
      devices.map((device,index) => {
        if(!device.regsiter)
          unregsiter ++;
      })
      this.setState({unregsiter: unregsiter})
    }
  }
  render () {
    let devices = this.props.alldevices;
    let total = devices.length;
    let lng = this.props.lng;
    return (
      <div id='devices' className="text-left devices-box">
        <div className="divice-title">
          {i18n.t('devices.label', { lng })}
        </div>
        <div>
          <span id='num'>{total}</span><span className="num-title mr-4">{i18n.t('total.label', { lng })}</span>
          <span id='num' className="color-red">{this.state.unregsiter}</span><span className="num-title">{i18n.t('unregistered.label', { lng })}</span>
        </div>
        <div className="device-scroll" >
          <a className="prev" onClick={this.scroll.bind(null,-1)}>&#10094;</a>
          <div className="device-container">
            { this.state.deviceData && this.state.deviceData.map((device,index) => {
              return (
                  <div className={`devices ${!device.regsiter?"devices-top-wrap-red":""}`} key={index}>
                    { device.device_type === "sip_device" &&
                      <div>
                        <svg className={`corner corner-icon ${device.regsiter?"color-green":"color-red"}`}>
                          <use href="telicon-2.1.0.svg#device-voip-phone"/>
                        </svg>
                        <img src="desk.png" alt="device"/>
                      </div>
                    }
                    { device.device_type === "cellphone" &&
                      <div>
                        <svg className={`corner corner-icon ${device.regsiter?"color-green":"color-red"}`}>
                          <use href="telicon-2.1.0.svg#device-mobile"/>
                        </svg>
                        <img src="cell.png" alt="device"/>
                      </div>
                    }
                    { device.device_type === "softphone" &&
                      <div>
                        <svg className={`corner corner-icon ${device.regsiter?"color-green":"color-red"}`}>
                          <use href="telicon-2.1.0.svg#device-soft-phone"/>
                        </svg>
                        <img src="device-soft.png" alt="device"/>
                      </div>
                    }
                    <div className="mt-2 name">{device.name}</div>
                    <div className="number">{device.mac_address}</div>
                  </div>
                );
              })
            }
          </div>

          <a className="next" onClick={this.scroll.bind(null,1)}>&#10095;</a>
        </div>

        {/* <div className="view-all" onClick={()=>this.props.history.push("/devices")}>{i18n.t('viewall.label', { lng })}</div> */}
      </div>
    )
  }
}
