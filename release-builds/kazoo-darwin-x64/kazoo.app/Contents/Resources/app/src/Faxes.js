import React from 'react';
import './Faxes.css';

export class Faxes extends React.Component {
  render() {
    return(
      <div id="faxes">
        <h4>Faxes</h4>
        <table class="table-striped">
          <thead>
            <tr>
              <th>FROM</th>
              <th>TO</th>
              <th>DATE/TIME</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><img src="outgoing.png"></img><div><span class="name">Karl Anderson</span><br/><span class="number">+ 1 415-287-2930</span></div></td>
              <td>+1 415-886-7913</td>
              <td><span class="date">11/14/2018</span><br/><span class="time">10:50:25</span></td>
            </tr>
            <tr>
              <td><img src="outgoing.png"></img><div><span class="name">Karl Anderson</span><br/><span class="number">+ 1 415-287-2930</span></div></td>
              <td>+1 415-886-7913</td>
              <td><span class="date">11/14/2018</span><br/><span class="time">10:50:25</span></td>
            </tr>
            <tr>
              <td><img src="outgoing.png"></img><div><span class="name">Karl Anderson</span><br/><span class="number">+ 1 415-287-2930</span></div></td>
              <td>+1 415-886-7913</td>
              <td><span class="date">11/14/2018</span><br/><span class="time">10:50:25</span></td>
            </tr>
          </tbody>
        </table>
        <a class="view-all">View All</a>
      </div>
    );
  }
}