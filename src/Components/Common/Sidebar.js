import React from 'react'
import { connect } from 'react-redux'
import i18n from './i18n';
import { getallnotification } from '../../Actions/notification.action'
import { SidebarLink } from './SidebarLink'
import { withRouter } from 'react-router-dom'
import './Sidebar.css'
import authenticate from './Authenticate'
import CONFIG from '../../Config.json'
class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newmailscount: 0,
      missedcount: 0,
      lng: 'en'
    }
  }
  componentWillMount () {
    this.props.getallnotification();
  }
  componentDidMount () {
    !this.props.notification.loading ? this.props.getallnotification() : null;
  }
  render () {
    let {allnotifications}  = this.props.notification;
    let newmailscount,missedcount
    if(allnotifications) {
      newmailscount = allnotifications.newmailscount;
      missedcount = allnotifications.missedcount;
    }
    let {lng} = this.props.language;
    return (
      <div className='Sidebar'>
        <div className='kazoo-logo'>{CONFIG.BUSINESS_NAME}</div>
        <nav className='sidebar-nav'>
          <SidebarLink route='/' img='home.png' title={i18n.t('home.label', { lng })} history={this.props.history} lng={lng}/>
          <SidebarLink route='/voicemails' img='tape.png' title={i18n.t('voicemails.label', { lng })} newmails={newmailscount} history={this.props.history} lng={lng}/>
          <SidebarLink route='/history' img='list.png' title={i18n.t('callhistory.label', { lng })} missedcalls={missedcount} history={this.props.history} lng={lng}/>
          <SidebarLink route='/devices' img='landline.png' title={i18n.t('devices.label', { lng })+" & "+i18n.t('numbers.label', { lng })} history={this.props.history} lng={lng}/>
          <SidebarLink route='/faxes' img='fax-sidebar.png' title={i18n.t('faxes.label', { lng })} history={this.props.history} lng={lng}/>
        </nav>
      </div>
    )
  }
}
const mapStateToProps =  state => ({notification:state.notification, language: state.language})
const mapDispatchToProps = (dispatch) => ({
  getallnotification: () => dispatch(getallnotification())
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(authenticate(Sidebar)))
