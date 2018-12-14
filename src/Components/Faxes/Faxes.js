import React from 'react'
import './Faxes.css'

export class Faxes extends React.Component {
  render () {
    return (
      <div id='faxes'>
        <h4>Faxes</h4>
        <table className='table-striped'>
          <thead>
            <tr>
              <th>FROM</th>
              <th>TO</th>
              <th>DATE/TIME</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><img src='outgoing.png' /><div><span className='name'>Karl Anderson</span><br /><span className='number'>+ 1 415-287-2930</span></div></td>
              <td>+1 415-886-7913</td>
              <td><span className='date'>11/14/2018</span><br /><span className='time'>10:50:25</span></td>
            </tr>
            <tr>
              <td><img src='outgoing.png' /><div><span className='name'>Karl Anderson</span><br /><span className='number'>+ 1 415-287-2930</span></div></td>
              <td>+1 415-886-7913</td>
              <td><span className='date'>11/14/2018</span><br /><span className='time'>10:50:25</span></td>
            </tr>
            <tr>
              <td><img src='outgoing.png' /><div><span className='name'>Karl Anderson</span><br /><span className='number'>+ 1 415-287-2930</span></div></td>
              <td>+1 415-886-7913</td>
              <td><span className='date'>11/14/2018</span><br /><span className='time'>10:50:25</span></td>
            </tr>
          </tbody>
        </table>
        <a className='view-all'>View All</a>
      </div>
    )
  }
}
