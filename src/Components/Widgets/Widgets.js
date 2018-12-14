import React from 'react'
import { Topbar } from '../Common/Topbar'
import { Widget } from '../Widgets/Widget'
import './Widgets.css'

export class Widgets extends React.Component {
  render () {
    return (
      <div className='main'>
        <Topbar title='Widgets' />
        <div className='Widgets'>
          <div>
            <div className='title'>Notifications Bar</div>
            <Widget name='Missed Calls' />
            <Widget name='New Voicemails' />
            <Widget name='New Faxes' />
            <div className='map'>
              <img src='widget-map-1.png' />
            </div>
          </div>
          <div>
            <div className='title'>Home Widgets</div>
            <Widget name='Call History' />
            <Widget name='Devices' />
            <Widget name='Numbers' />
            <Widget name='Conferences' status='off' />
            <Widget name='Faxes' status='off' />
            <Widget name='Day/Time' status='off' />
            <div className='map'>
              <img src='widget-map-2.png' />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
