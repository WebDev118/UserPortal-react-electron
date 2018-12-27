import React from 'react';
import i18n from '../Common/i18n';
export class MissedCalls extends React.Component {
  render () {
    let lng = this.props.lng;
    return (
      <div id='missed-calls' className="common-box">
        <img src='phone.png' alt="phone"/>
        <span className='text text-right'>
          <h1>{this.props.missedcount}</h1>
          <p>{i18n.t('missed.label', { lng })+" "+i18n.t('calls.label', { lng })}</p>
        </span>
      </div>
    )
  }
}
