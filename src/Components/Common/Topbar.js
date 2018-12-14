import React from 'react'
import { SidebarLink } from './SidebarLink'
import './Topbar.css'

export class Topbar extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className='Topbar'>
        <div><span id='title'>{this.props.title}</span></div>
        <div>
          <img id='phone-book' src='../../phone-book.png' />
        </div>
        <div>
          <img id='avatar' src='../../avatar.png' /><span id='top-name'>Josh Sanders</span>
        </div>
      </div>
    )
  }
}
