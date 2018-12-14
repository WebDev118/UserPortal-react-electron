import React from 'react'

export class Widget extends React.Component {
  render () {
    return (
      <div className='Widget'>
        <span className='name'>{this.props.name}</span>
        <span>{this.props.status === 'off' ? <img src='off.png' /> : <img src='on.png' />}</span>
      </div>
    )
  }
}
