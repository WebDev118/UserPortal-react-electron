import React from 'react';
import i18n from '../Common/i18n';
import './Voicemails.css';

class VoicemailBox extends React.Component {

	render() {
		return (
			<div className="voicemailbox-container">
				<div className="voicemailbox-title">
					<p>You have multiple voicemail boxes - select one to view the voicemails it contains.</p>
				</div>
				{this.props.allmessages && this.props.allmessages.map((box,index) => <MailboxContainer key={index} {...box.vmbox} history={this.props.history} lng={this.props.lng}/> )}
			</div>
		)
	}
}

export default VoicemailBox

const MailboxContainer = (props) => {
	let lng= props.lng;
	return (
		<div className="voicemailbox">
			<div>
				<div className={`voicemailbox-wrapper ${props.newcount > 0 ? 'voicemails-top-1' : 'voicemails-top-2'}`}
					 onClick={() => props.history.push('/voicemails/list/' + props.id)}>
					<div className="pb-4"><h2>{props.name}</h2></div>
					<div className="voicemail-mailbox">
						<div><h1 className={props.newcount > 0 ? "newcount" : ""}>{props.newcount}</h1>{i18n.t('voicemails.label', { lng })}</div>
						<div><h1 className="totalcount">{props.messages}</h1>{i18n.t('voicemails.label', { lng })}</div>
					</div>
				</div>
			</div>
		</div>
	)
}
