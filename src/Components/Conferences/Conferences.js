import React from 'react'
import './Conferences.css'

export class Conferences extends React.Component {
  render () {
    return (
      <div id='conferences'>
        <h4>Conferences</h4>
        <table className='table-striped'>
          <thead>
            <tr>
              <th><span id='num'>3</span>Total</th>
              <th />
              <th />
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <img id='lightning' src='lightning.png' />
                <div>
                  <span className='blue'>Josh's SPBX Conference</span>
                </div>
                <br />
                <div>
                  mod: <span className='blue'>2600</span> | participant: <span className='blue'>2601</span>
                </div>
              </td>
              <td>
                +1 415-374-3871 <img src='usa.png' />
              </td>
              <td>
                <img src='eye.png' />
              </td>
            </tr>
            <tr>
              <td>
                Design Hangout
              </td>
              <td>
                +1 415-374-3871 <img src='usa.png' />
              </td>
              <td />
            </tr>
            <tr>
              <td>
                TEST-conference_01
              </td>
              <td>
                +1 415-374-3871 <img src='usa.png' />
              </td>
              <td />
            </tr>
          </tbody>
        </table>
        <a className='view-all'>View All</a>
      </div>
    )
  }
}
