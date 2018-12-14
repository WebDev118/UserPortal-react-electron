import React from 'react'
import { Topbar } from '../Common/Topbar'
import './Conferences.css'

export class ConferencesPage extends React.Component {
  render () {
    return (
      <div className='main'>
        <Topbar title='Conferences' />
        <div className='Conferences'>
          <h2>Josh's SPBX Conference (08:45)</h2>
          <div id='conference-buttons'>
            <img src='lock.png' />
            <img src='mute.png' />
            <img src='mic.png' />
          </div>
          <h3>Moderators</h3>
          <div id='moderators'>
            <div>
              <span className='name-bubble'>JS</span>
              <div>
                <div>Josh Sanders(05:38)</div>
                <div>+1 415-2934-3439</div>
              </div>
              <div className='img-wrap'>
                <img src='mic.png' />
                <img src='headphones.png' />
                <img src='hang_up.png' />
              </div>
            </div>
            <div>
              <span className='name-bubble'>JS</span>
              <div>
                <div>Josh Sanders(05:38)</div>
                <div>+1 415-2934-3439</div>
              </div>
              <div className='img-wrap'>
                <img src='mic.png' />
                <img src='headphones.png' />
                <img src='hang_up.png' />
              </div>
            </div>
          </div>
          <h3>Participants</h3>
          <div id='participants'>
            <div>
              <span className='name-bubble'>JS</span>
              <div>
                <div>Josh Sanders(05:38)</div>
                <div>+1 415-2934-3439</div>
              </div>
              <div className='img-wrap'>
                <img src='mic.png' />
                <img src='headphones.png' />
                <img src='hang_up.png' />
              </div>
            </div>
            <div>
              <span className='name-bubble'>JS</span>
              <div>
                <div>Josh Sanders(05:38)</div>
                <div>+1 415-2934-3439</div>
              </div>
              <div className='img-wrap'>
                <img src='mic.png' />
                <img src='headphones.png' />
                <img src='hang_up.png' />
              </div>
            </div>
            <div>
              <span className='name-bubble'>JS</span>
              <div>
                <div>Josh Sanders(05:38)</div>
                <div>+1 415-2934-3439</div>
              </div>
              <div className='img-wrap'>
                <img src='mic.png' />
                <img src='headphones.png' />
                <img src='hang_up.png' />
              </div>
            </div>
            <div>
              <span className='name-bubble'>JS</span>
              <div>
                <div>Josh Sanders(05:38)</div>
                <div>+1 415-2934-3439</div>
              </div>
              <div className='img-wrap'>
                <img src='mic.png' />
                <img src='headphones.png' />
                <img src='hang_up.png' />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
