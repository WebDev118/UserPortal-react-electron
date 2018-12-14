import React from 'react'

export class Contact extends React.Component {
  render () {
    return (
      <div className='Contact'>
        <img className='contact-avatar' src='avatar.png' />
        <div>
          <span className='contact-name'>Patrick Sullivan</span><br />
          <span className='contact-extension'>ex. 7915</span>
          <div className='contact-source'>
            <span><img src='directory.png' /></span>
            <span>Internal Directory</span>
          </div>
        </div>
        <span className='contact-status'>Available</span>
      </div>
    )
  }
}
