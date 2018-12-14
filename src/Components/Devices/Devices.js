import React from 'react'
import './Devices.css'

export class Devices extends React.Component {
  render () {
    return (
      <div id='devices'>
        <h4>Devices</h4>
        <table>
          <thead>
            <tr>
              <th><span id='num'>3</span>Total<span id='num'>2</span>Registered</th>
              <th>Usage Today</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><img src='iphone.png' /><div>Desk Yealink<br /><span id='device-id'>00:04:f2:80:09:69</span></div></td>
              <td><div>70%</div><div><img src='bar.png' /><br />7 calls</div></td>
            </tr>
            <tr>
              <td><img src='iphone.png' /><div>Desk Yealink<br /><span id='device-id'>00:04:f2:80:09:69</span></div></td>
              <td><div>70%</div><div><img src='bar.png' /><br />7 calls</div></td>
            </tr>
            <tr>
              <td><img src='iphone.png' /><div>Desk Yealink<br /><span id='device-id'>00:04:f2:80:09:69</span></div></td>
              <td><div>70%</div><div><img src='bar.png' /><br />7 calls</div></td>
            </tr>
          </tbody>
        </table>
        <a className='view-all'>View All</a>
      </div>
    )
  }
}
