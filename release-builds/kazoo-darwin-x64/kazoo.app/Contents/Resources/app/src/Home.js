import React from 'react';

import { Topbar } from './Topbar';
import { MissedCalls } from './MissedCalls';
import { NewVoicemails } from './NewVoicemails';
import { NewFaxes } from './NewFaxes';
import { NewMessages } from './NewMessages';
import { CallHistory } from './CallHistory';
import { TimeWeather } from './TimeWeather';
import { Devices } from './Devices';
import { Numbers } from './Numbers';
import { Faxes } from './Faxes';
import { Conferences } from './Conferences';
import './Home.css';

export class Home extends React.Component {
	render() {
		return(
            <div className="main">
                <Topbar title="Home" />
        		<div class="home-grid">
                    <MissedCalls /><NewVoicemails /><NewFaxes /><NewMessages />
                    <MissedCalls />
                    <CallHistory />
                    <TimeWeather />
                    <Devices />
                    <Numbers />
                    <Faxes />
                    <Conferences />
                </div>
            </div>
	  );
	}
}
