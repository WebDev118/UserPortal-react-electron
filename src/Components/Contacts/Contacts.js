import React from 'react'
import { Topbar } from '../Common/Topbar'
import { Contact } from './Contact'
import './Contacts.css'

export class Contacts extends React.Component {
  render () {
    return (
      <div className='main'>
        <Topbar title='Contacts' />
        <div className='contacts'>
          <div>
            <img src='list.png' />
            <img src='grid.png' />
            <input id='contacts-search' type='text' placeholder='Search' />
          </div>
          <div className='contacts-grid'>
            <Contact /><Contact />
            <Contact /><Contact />
            <Contact /><Contact />
            <Contact /><Contact />
          </div>
        </div>
      </div>
    )
  }
}
