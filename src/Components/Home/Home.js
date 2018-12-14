import React from 'react'

import { Topbar } from '../Common/Topbar'
import { MissedCalls } from '../CallHistory/MissedCalls'
import { NewVoicemails } from '../Voicemails/NewVoicemails'
import { NewFaxes } from '../Faxes/NewFaxes'
import { NewMessages } from '../Conferences/NewMessages'
import { CallHistory } from '../CallHistory/CallHistory'
import { TimeWeather } from '../Common/TimeWeather'
import { Devices } from '../Devices/Devices'
import { Numbers } from '../Devices/Numbers'
import { Faxes } from '../Faxes/Faxes'
import { Conferences } from '../Conferences/Conferences'
import '../Home/Home.css'

export class Home extends React.Component {
  render () {
    return (
      <div className='main'>
        <Topbar title='Home' />
        <div className='home-grid'>
          <MissedCalls /><NewVoicemails /><NewFaxes /><NewMessages />
          <MissedCalls />
          <CallHistory />
          <TimeWeather />
          <Devices />
          <Numbers />
          <Faxes />
          <Conferences />
        </div>
      </div>
    )
  }
}
