import React from 'react';
import { Topbar } from './Topbar';
import { VoicemailsTable } from './VoicemailsTable';
import './Voicemails.css';

export class Voicemails extends React.Component {
	render() {
		return(
      <div className="main">
          <Topbar title="Voicemails" />
          <div>
            <div class="voicemail-top-wrap">
                 <div class="voicemails-top">
                     <h1>3</h1>
                  New
                 </div>
                <div class="voicemails-top">
                  <h1>18</h1>
                  Total
                </div>
            </div> 
            <div class="checkbox-wrap">
                <input type="checkbox"></input>&#9660;
            </div>
            <div id="voicemail-search">
                <input type="text" placeholder="Search" />
            </div>
            <VoicemailsTable />
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
