import React from 'react';
import i18n from '../Common/i18n';
export class NewVoicemails extends React.Component {
  render () {
    let lng = this.props.lng;
    return (
      <div id='new-voicemails' className="common-box">
        <img src='voicemail.png' alt="voicemail"/>
        <span className='text text-right'>
          <h1>{this.props.newmailscount}</h1>
          <p>{i18n.t('new.label', { lng })+" "+i18n.t('voicemails.label', { lng })}</p>
        </span>
      </div>
    )
  }
}
