import React from 'react'
import { Topbar } from '../Common/Topbar'
import './Faxes.css'

export class FaxesPage extends React.Component {
  render () {
    return (
      <div className='main'>
        <Topbar title='Faxes' />
        <div>
          <div className='voicemail-top-wrap'>
            <div className='voicemails-top'>
              <h1>0</h1>
              New
            </div>
            <div className='voicemails-top'>
              <h1>3</h1>
              Total
            </div>
          </div>
          <div className='fax-search'>
            <div className='checkbox-wrap'>
              <input type='checkbox' />&#9660;
            </div>
            <div>
              <div>
                <label htmlFor='start-date'>Start Date</label>
                <input id='start-date' className='calendar' type='text' />
              </div>
              <div>
                <label htmlFor='end-date'>End Date</label>
                <input id='end-date' className='calendar' type='text' />
              </div>
              <button>Filter</button>
              <input id='fax-search' type='text' placeholder='Search' />
            </div>
          </div>
          <table className='voicemails table-striped'>
            <thead>
              <tr>
                <th />
                <th>STATUS</th>
                <th>FROM</th>
                <th>TO</th>
                <th>DATE/TIME</th>
                <th>PAGES</th>
                <th />
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><input type='checkbox' /></td>
                <td><img src='viewed.png' /></td>
                <td>11/14/2018<br /><span className='grey'>10:40:24</span></td>
                <td>Stella Cummings<br /><span className='grey'>+1 415-287-3493</span></td>
                <td>+1 495-393-1933</td>
                <td>2</td>
                <td>
                  <img src='download.png' />
                </td>
              </tr>
              <tr>
                <td><input type='checkbox' /></td>
                <td><img src='viewed.png' /></td>
                <td>11/14/2018<br /><span className='grey'>10:40:24</span></td>
                <td>Stella Cummings<br /><span className='grey'>+1 415-287-3493</span></td>
                <td>+1 495-393-1933</td>
                <td>2</td>
                <td>
                  <img src='download.png' />
                </td>
              </tr>
              <tr>
                <td><input type='checkbox' /></td>
                <td><img src='viewed.png' /></td>
                <td>11/14/2018<br /><span className='grey'>10:40:24</span></td>
                <td>Stella Cummings<br /><span className='grey'>+1 415-287-3493</span></td>
                <td>+1 495-393-1933</td>
                <td>2</td>
                <td>
                  <img src='download.png' />
                </td>
              </tr>
              <tr>
                <td><input type='checkbox' /></td>
                <td><img src='viewed.png' /></td>
                <td>11/14/2018<br /><span className='grey'>10:40:24</span></td>
                <td>Stella Cummings<br /><span className='grey'>+1 415-287-3493</span></td>
                <td>+1 495-393-1933</td>
                <td>2</td>
                <td>
                  <img src='download.png' />
                </td>
              </tr>
              <tr>
                <td><input type='checkbox' /></td>
                <td><img src='viewed.png' /></td>
                <td>11/14/2018<br /><span className='grey'>10:40:24</span></td>
                <td>Stella Cummings<br /><span className='grey'>+1 415-287-3493</span></td>
                <td>+1 495-393-1933</td>
                <td>2</td>
                <td>
                  <img src='download.png' />
                </td>
              </tr>
            </tbody>
          </table>
          <nav className='bottom-nav'>
            <select id='view-per-page'>
              <option>View 10 per page</option>
            </select>
            <span id='page-num'>1-10 of 18</span>
            <button>First</button>
            <button>&#60;</button>
            <button>1</button>
            <button>2</button>
            <button>&#62;</button>
            <button>Last</button>
          </nav>
        </div>
      </div>
    )
  }
}
