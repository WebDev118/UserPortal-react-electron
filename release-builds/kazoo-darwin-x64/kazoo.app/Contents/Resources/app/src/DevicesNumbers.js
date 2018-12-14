import React from 'react';
import { Topbar } from './Topbar';
import './DevicesNumbers.css';

export class DevicesNumbers extends React.Component {
  render() {
    return(
      <div className="main devices">
        <Topbar title="Devices & Numbers" />
        <br/><br/>
        <div>
            Devices
            <div class="devices-top-wrap">
              <div class="devices-top">
                <img class="corner" src="desk-avatar.png"></img>
                <img src="desk.png"></img>
                <p>Desk Yealink</p>
                <span class="grey">
                  00:04:f2:80:09:69
                </span>
              </div>
              <div class="devices-top">
                <img class="corner" src="iphone.png"></img>
                <img src="cell.png"></img>
                <p>Work iPhone</p>
                <span class="grey">
                  00:04:f2:80:09:69
                </span>
              </div>
            </div> 
           <br/><br/>
            Numbers
            <div class="devices-top-wrap">
              <div class="devices-top">
                + 1 415-249-6694 <img src="usa.png"></img>
                <p><span id="today">Today</span> | Past Week</p>
                <hr></hr>
                <div class="numbers-wrap">
                  <h2>85%</h2>
                  <span class="grey">
                    All Calls
                  </span>
                </div>
                <img id="donut" src="donut.png"></img>
              </div>
              <div class="devices-top">
                + 1 415-249-6694 <img src="usa.png"></img>
                <p><span id="today">Today</span> | Past Week</p>
                <hr></hr>
                <div class="numbers-wrap">
                  <h2>85%</h2>
                  <span class="grey">
                    All Calls
                  </span>
                </div>
                <img id="donut" src="donut.png"></img>
              </div>
              <div class="devices-top">
                + 1 415-249-6694 <img src="usa.png"></img>
                <p><span id="today">Today</span> | Past Week</p>
                <hr></hr>
                <div class="numbers-wrap">
                  <h2>85%</h2>
                  <span class="grey">
                    All Calls
                  </span>
                </div>
                <img id="donut" src="donut.png"></img>
              </div>
              <div class="devices-top">
                + 1 415-249-6694 <img src="usa.png"></img>
                <p><span id="today">Today</span> | Past Week</p>
                <hr></hr>
                <div class="numbers-wrap">
                  <h2>85%</h2>
                  <span class="grey">
                    All Calls
                  </span>
                </div>
                <img id="donut" src="donut.png"></img>
              </div>
            </div>
          </div>
      </div>
    );
  }
}

              
