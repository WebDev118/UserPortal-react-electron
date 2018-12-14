import React from 'react'
import { SidebarLink } from './SidebarLink'
import './Sidebar.css'

export class Sidebar extends React.Component {
  render () {
    return (
      <div className='Sidebar'>
        <div className='kazoo-logo'><img src='Logo.png' /></div>
        <nav className='sidebar-nav'>
          <SidebarLink route='/' img='home.png' title='Home'/>
          <SidebarLink route='/voicemails' img='tape.png' title='Voicemails' />
          <SidebarLink route='/history' img='list.png' title='Call History' />
          <SidebarLink route='/devices' img='landline.png' title='Devices & Numbers' />
          <SidebarLink route='/faxes' img='fax-sidebar.png' title='Faxes' />
          <SidebarLink route='/conferences' img='chat-sidebar.png' title='Conferences' />
          <SidebarLink route='/contacts' img='contacts.png' title='Contacts' />
          <SidebarLink route='/widgets' img='widgets.png' title='Widgets' />
        </nav>
      </div>
    )
  }
}
