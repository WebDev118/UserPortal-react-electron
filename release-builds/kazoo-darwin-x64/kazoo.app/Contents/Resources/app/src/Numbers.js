import React from 'react';
import './Numbers.css';

export class Numbers extends React.Component {
  render() {
    return(
      <div id="numbers">
        <h4>Numbers</h4>
        <table>
          <thead>
            <tr>
              <th><span id="num">3</span>Total</th>
              <th>Usage Today</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <select>
                  <option>+1 415-886-2600<img src="usa.png"></img></option>
                </select>
              </td>
              <td><img src="donut.png"></img><div class="float-right"><h1>80%</h1><br/><br/>8 calls</div></td>
            </tr>
          </tbody>
        </table>
        <a class="view-all">View All</a>
      </div>
    );
  }
}