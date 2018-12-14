import React from 'react';
import './Audioplayer.css';
import CONFIG from '../../Config.json';
class Audioplayer extends React.Component {

  render () {
    let vmbox_id = this.props.props.vmbox_id;
    let media_id = this.props.props.media_id;
    let auth_token = this.props.props.auth_token;
    let URL = `${CONFIG.API_URL}${CONFIG.API_VERSION}/accounts/${CONFIG.ACCOUNT_ID}/vmboxes/${vmbox_id}/messages/${media_id}/raw?auth_token=${auth_token}`
    return (
      <div className="container-audio">
        <audio controls id = "player" controlsList="nodownload">
          <source src = {URL} />
          <p> Your browser doesn't support the audio tag </p>
        </audio>
      </div>
    )
  }
}

export default Audioplayer