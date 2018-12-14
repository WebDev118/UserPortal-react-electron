import React from 'react'

export class CallHistory extends React.Component {
  render () {
    return (
      <div id='call-history'><h4>Call History</h4>
        <table className='table-striped'>
          <thead>
            <tr>
              <th>FROM</th>
              <th>TO</th>
              <th>DATE/TIME</th>
              <th>DURATION</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><img src='incoming.png' /><div><span className='name'>Karl Anderson</span></div><br /><div><span className='number'>+ 1 415-287-2930</span></div></td>
              <td>+1 415-886-7913</td>
              <td><span className='date'>11/14/2018</span><br /><span className='time'>10:50:25</span></td>
              <td className='duration'>4:39</td>
            </tr>
            <tr>
              <td><img src='outgoing.png' /><div><span className='name'>Karl Anderson</span></div><br /><div><span className='number'>+ 1 415-287-2930</span></div></td>
              <td>+1 415-886-7913</td>
              <td><span className='date'>11/14/2018</span><br /><span className='time'>10:50:25</span></td>
              <td className='duration'>4:39</td>
            </tr>
            <tr>
              <td><img src='missed.png' /><div><span className='name'>Karl Anderson</span></div><br /><div><span className='number'>+ 1 415-287-2930</span></div></td>
              <td>+1 415-886-7913</td>
              <td><span className='date'>11/14/2018</span><br /><span className='time'>10:50:25</span></td>
              <td className='duration'>4:39</td>
            </tr>
            <tr>
              <td><img src='incoming.png' /><div><span className='name'>Karl Anderson</span></div><br /><div><span className='number'>+ 1 415-287-2930</span></div></td>
              <td>+1 415-886-7913</td>
              <td><span className='date'>11/14/2018</span><br /><span className='time'>10:50:25</span></td>
              <td className='duration'>4:39</td>
            </tr>
          </tbody>
        </table>
        <a className='view-all'>View All</a>
      </div>
    )
  }
}
