import React from 'react';

export class Contact extends React.Component {
	render() {
		return(
			<div className="Contact">
				<img class="contact-avatar" src="avatar.png" />
				<div>
					<span class="contact-name">Patrick Sullivan</span><br/>
					<span class="contact-extension">ex. 7915</span>
					<div class="contact-source">
						<span><img src="directory.png" /></span>
						<span>Internal Directory</span>
					</div>
				</div>
				<span class="contact-status">Available</span>
			</div>
		)
	}
}