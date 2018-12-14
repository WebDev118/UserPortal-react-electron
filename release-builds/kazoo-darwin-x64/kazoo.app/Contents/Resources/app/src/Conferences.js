import React from 'react';
import './Conferences.css';

export class Conferences extends React.Component {
  render() {
    return(
      <div id="conferences">
        <h4>Conferences</h4>
        <table class="table-striped">
          <thead>
            <tr>
              <th><span id="num">3</span>Total</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <img id="lightning" src="lightning.png" />
                <div>
                  <span class="blue">Josh's SPBX Conference</span>
                </div>
                <br/>
                <div>
                  mod: <span class="blue">2600</span> | participant: <span class="blue">2601</span>
                </div>
              </td>
              <td>
                +1 415-374-3871 <img src="usa.png"></img>
              </td>
              <td>
                <img src="eye.png"></img>
              </td>
            </tr>
            <tr>
              <td>
                Design Hangout
              </td>
              <td>
                +1 415-374-3871 <img src="usa.png"></img>
              </td>
              <td>
              </td>
            </tr>
            <tr>
              <td>
                TEST-conference_01 
              </td>
              <td>
                +1 415-374-3871 <img src="usa.png"></img>
              </td>
              <td>
              </td>
            </tr>
          </tbody>
        </table>
        <a class="view-all">View All</a>
      </div>
    );
  }
}