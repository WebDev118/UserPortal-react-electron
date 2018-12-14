import React from 'react';
import { Topbar } from './Topbar';
import './Faxes.css';

export class FaxesPage extends React.Component {
  render() {
    return(
      <div className="main">
        <Topbar title="Faxes" />
        <div>
          <div class="voicemail-top-wrap">
            <div class="voicemails-top">
              <h1>0</h1>
              New
            </div>
            <div class="voicemails-top">
              <h1>3</h1>
              Total
            </div>
          </div> 
          <div class="fax-search">
            <div class="checkbox-wrap">
              <input type="checkbox" />&#9660;
            </div>
            <div>
              <div>
                <label for="start-date">Start Date</label>
                <input id="start-date" class="calendar" type="text"></input>
              </div>
              <div>
                <label for="end-date">End Date</label>
                <input id="end-date" class="calendar" type="text"></input>
              </div>
              <button>Filter</button>
              <input id="fax-search" type="text" placeholder="Search"></input>
            </div>
          </div>
          <table class="voicemails table-striped">
            <thead>
              <tr>
                <th></th>
                <th>STATUS</th>
                <th>FROM</th>
                <th>TO</th>
                <th>DATE/TIME</th>
                <th>PAGES</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><input type="checkbox" /></td>
                <td><img src="viewed.png"></img></td>
                <td>11/14/2018<br/><span class="grey">10:40:24</span></td>
                <td>Stella Cummings<br/><span class="grey">+1 415-287-3493</span></td>
                <td>+1 495-393-1933</td>
                <td>2</td>
                <td>
                  <img src="download.png"></img>
                </td>
              </tr>
              <tr>
                <td><input type="checkbox" /></td>
                <td><img src="viewed.png"></img></td>
                <td>11/14/2018<br/><span class="grey">10:40:24</span></td>
                <td>Stella Cummings<br/><span class="grey">+1 415-287-3493</span></td>
                <td>+1 495-393-1933</td>
                <td>2</td>
                <td>
                  <img src="download.png"></img>
                </td>
              </tr>
              <tr>
                <td><input type="checkbox" /></td>
                <td><img src="viewed.png"></img></td>
                <td>11/14/2018<br/><span class="grey">10:40:24</span></td>
                <td>Stella Cummings<br/><span class="grey">+1 415-287-3493</span></td>
                <td>+1 495-393-1933</td>
                <td>2</td>
                <td>
                  <img src="download.png"></img>
                </td>
              </tr>
              <tr>
                <td><input type="checkbox" /></td>
                <td><img src="viewed.png"></img></td>
                <td>11/14/2018<br/><span class="grey">10:40:24</span></td>
                <td>Stella Cummings<br/><span class="grey">+1 415-287-3493</span></td>
                <td>+1 495-393-1933</td>
                <td>2</td>
                <td>
                  <img src="download.png"></img>
                </td>
              </tr>
              <tr>
                <td><input type="checkbox" /></td>
                <td><img src="viewed.png"></img></td>
                <td>11/14/2018<br/><span class="grey">10:40:24</span></td>
                <td>Stella Cummings<br/><span class="grey">+1 415-287-3493</span></td>
                <td>+1 495-393-1933</td>
                <td>2</td>
                <td>
                  <img src="download.png"></img>
                </td>
              </tr>
            </tbody>
          </table>
          <nav class="bottom-nav">
            <select id="view-per-page">
              <option>View 10 per page</option>
            </select>
            <span id="page-num">1-10 of 18</span>
            <button>First</button>
            <button>&#60;</button>
            <button>1</button>
            <button>2</button>
            <button>&#62;</button>
            <button>Last</button>
          </nav>
        </div>
      </div>
    );
  }
}