import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Home } from './Home';
import { Voicemails } from './Voicemails';
import { History } from './History';
import { DevicesNumbers } from './DevicesNumbers';
import { FaxesPage } from './FaxesPage';
import { ConferencesPage } from './ConferencesPage';
import { Contacts } from './Contacts';
import { Widgets } from './Widgets';
import { Sidebar } from './Sidebar';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
  }

  
  render() {
    return (
      <div className="App">
        <Sidebar />
        <Route exact path="/" component={Home}/>
        <Route path="/voicemails" component={Voicemails} />
        <Route path="/history" component={History} />
        <Route path="/devices" component={DevicesNumbers} />
        <Route path="/faxes" component={FaxesPage} />
        <Route path="/conferences" component={ConferencesPage} />
        <Route path="/contacts" component={Contacts} />
        <Route path="/widgets" component={Widgets} />
      </div>
    );
  }

  // handleHomeClick = () => {
  //   this.setState({homeClicked: true, voicemailClicked: false, historyClicked: false, devicesClicked: false,
  //                  faxesClicked: false, conferencesClicked: false, contactsClicked: false, widgetsClicked: false 
  //   });
  // }

  // handleVoicemailClick = () => {
  //   this.setState({homeClicked: false, voicemailClicked: true, historyClicked: false, devicesClicked: false,
  //                  faxesClicked: false, conferencesClicked: false, contactsClicked: false, widgetsClicked: false 
  //   });
  // }

  // handleHistoryClick = () => {
  //   this.setState({homeClicked: false, voicemailClicked: false, historyClicked: true, devicesClicked: false,
  //                  faxesClicked: false, conferencesClicked: false, contactsClicked: false, widgetsClicked: false 
  //   });
  // }

  // handleDevicesClick = () => {
  //   this.setState({homeClicked: false, voicemailClicked: false, historyClicked: false, devicesClicked: true,
  //                  faxesClicked: false, conferencesClicked: false, contactsClicked: false, widgetsClicked: false 
  //   });
  // }

  // handleFaxesClick = () => {
  //   this.setState({homeClicked: false, voicemailClicked: false, historyClicked: false, devicesClicked: false,
  //                  faxesClicked: true, conferencesClicked: false, contactsClicked: false, widgetsClicked: false 
  //   });
  // }

  // handleConferencesClick = () => {
  //   this.setState({homeClicked: false, voicemailClicked: false, historyClicked: false, devicesClicked: false,
  //                  faxesClicked: false, conferencesClicked: true, contactsClicked: false, widgetsClicked: false 
  //   });
  // }

  // handleContactsClick = () => {
  //   this.setState({homeClicked: false, voicemailClicked: false, historyClicked: false, devicesClicked: false,
  //                  faxesClicked: false, conferencesClicked: false, contactsClicked: true, widgetsClicked: false 
  //   });
  // }

  // handleWidgetsClick = () => {
  //   this.setState({homeClicked: false, voicemailClicked: false, historyClicked: false, devicesClicked: false,
  //                  faxesClicked: false, conferencesClicked: false, contactsClicked: false, widgetsClicked: true 
  //   });
  // }

}

export default App;
