import React from 'react';
import './VoicemailsTable.css';

export class VoicemailsTable extends React.Component {
	render() {
		return(
			<table class="voicemails table-striped">
        <thead>
          <tr>
            <th></th>
            <th>STATUS</th>
            <th>DATE/TIME</th>
            <th>FROM</th>
            <th>TO</th>
            <th>DURATION</th>
            <th></th>
          </tr>
     		</thead>
        <tbody>
          <tr>
            <td><input type="checkbox" /></td>
            <td><img src="new.png"></img></td>
            <td>11/14/2018<br/><span class="grey">10:40:24</span></td>
            <td>Stella Cummings<br/><span class="grey">+1 415-287-3493</span></td>
            <td>+1 495-393-1933</td>
            <td>1:30</td>
            <td>
              <img src="play.png"></img>
              <img src="download.png"></img>
            </td>
          </tr>
          <tr>
            <td><input type="checkbox" /></td>
            <td><img src="new.png"></img></td>
            <td>11/14/2018<br/><span class="grey">10:40:24</span></td>
            <td>Stella Cummings<br/><span class="grey">+1 415-287-3493</span></td>
            <td>+1 495-393-1933</td>
            <td>1:30</td>
            <td>
              <img src="play.png"></img>
              <img src="download.png"></img>
            </td>
          </tr>
          <tr>
            <td><input type="checkbox" /></td>
            <td><img src="listened.png"></img></td>
            <td>11/14/2018<br/><span class="grey">10:40:24</span></td>
            <td>Stella Cummings<br/><span class="grey">+1 415-287-3493</span></td>
            <td>+1 495-393-1933</td>
            <td>1:30</td>
            <td>
              <img src="play.png"></img>
              <img src="download.png"></img>
            </td>
          </tr>
          <tr>
            <td><input type="checkbox" /></td>
            <td><img src="listened.png"></img></td>
            <td>11/14/2018<br/><span class="grey">10:40:24</span></td>
            <td>Stella Cummings<br/><span class="grey">+1 415-287-3493</span></td>
            <td>+1 495-393-1933</td>
            <td>1:30</td>
            <td>
              <img src="play.png"></img>
              <img src="download.png"></img>
            </td>
          </tr>
          <tr>
            <td><input type="checkbox" /></td>
            <td><img src="listened.png"></img></td>
            <td>11/14/2018<br/><span class="grey">10:40:24</span></td>
            <td>Stella Cummings<br/><span class="grey">+1 415-287-3493</span></td>
            <td>+1 495-393-1933</td>
            <td>1:30</td>
            <td>
              <img src="play.png"></img>
              <img src="download.png"></img>
            </td>
          </tr>
        </tbody>
      </table>
		);
  }
}