import React from 'react';

export class HistorySearch extends React.Component {
	render() {
		return(
			<div class="history-search">
        <div>
          <label for="start-date">Start Date</label>
          <input id="start-date" class="calendar" type="text"></input>
        </div>
        <div>
          <label for="end-date">End Date</label>
          <input id="end-date" class="calendar" type="text"></input>
        </div>
        <div>
        	<button>Filter</button>
        </div>
        <div>
	        <input id="history-search" type="text" placeholder="Search"></input>
	      </div>
      </div>
		);
	}
}

