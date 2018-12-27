import React, { Component } from 'react'
import { BrowserRouter as  Router, Route, Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import  Home  from './Home/Home'
import Voicemails from './Voicemails/Voicemails'
import  History  from './CallHistory/History'
import  DevicesNumbers  from './Devices/DevicesNumbers'
import  FaxesPage  from './Faxes/FaxesPage'
import  Sidebar  from './Common/Sidebar'
import VoicemailsList from './Voicemails/VoicemailsList'
import './App.css'
import axios from 'axios'
import CONFIG from '../Config.json'
import { getNewAuthToken } from '../Actions/auth.action'
import { setsystemmessage } from '../Actions/systemmessage.action'
import authenticate from './Common/Authenticate'

axios.defaults.baseURL = CONFIG.API_URL
axios.defaults.headers.get['Content-Type'] = 'application/json'

class App extends Component {
  componentDidUpdate (preProps, preState) {
    const { auth_token} = this.props.auth
    if(!auth_token) { // this is for auth-token fail when doing API request or auth token is expired while doing API request.

    } else {
      axios.defaults.headers.common['X-AUTH-TOKEN'] = auth_token
    }
  }

  componentDidMount() {
    const { auth_token} = this.props.auth

    if(!auth_token) {
      this.authTokenGeneration();
    }
  }

  authTokenGeneration() {
    this.props.setsystemmessage("Sending new token generation api request...");
    this.props.getNewAuthToken();
  }

  render () {
    return (
      <div className='App'>
        <Sidebar/>
        <Route exact path='/' component={Home} />
        <Route path='/voicemails' exact component={authenticate(Voicemails)}/>
        <Route path='/voicemails/list/:vmbox_id/' component={authenticate(VoicemailsList)}/>
        <Route path='/history' component={authenticate(History)} />
        <Route path='/devices' component={authenticate(DevicesNumbers)} />
        <Route path='/faxes' component={authenticate(FaxesPage)} />
      </div>
    )
  }
}

const mapStateToProps = state => ({auth: state.auth, language: state.language})
const mapDispatchToProps = dispatch => ({
  getNewAuthToken: () => dispatch(getNewAuthToken()),
  setsystemmessage: (msg) => dispatch(setsystemmessage(msg)),
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
