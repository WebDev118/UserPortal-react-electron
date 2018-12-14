import React from 'react';
import { Topbar } from './Topbar';
import { HistorySearch } from './HistorySearch';
import { HistoryTable } from './HistoryTable';
import './History.css';
import './Voicemails.css';

export class History extends React.Component {
  render() {
    return(
      <div className="main">
        <Topbar title="Call History" />
        <div className="history">
          <HistorySearch />
          <HistoryTable />
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