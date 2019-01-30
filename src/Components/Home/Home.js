import React from 'react'
import { connect } from 'react-redux'
import authenticate from '../Common/Authenticate'
import Topbar from '../Common/Topbar'
import { MissedCalls } from '../CallHistory/MissedCalls'
import { NewVoicemails } from '../Voicemails/NewVoicemails'
import { getallnotification } from '../../Actions/notification.action'
import { NewFaxes } from '../Faxes/NewFaxes'
import  CallHistory from '../CallHistory/CallHistory'
import { TimeWeather } from '../Common/TimeWeather'
import  Devices  from '../Devices/Devices'
import { Numbers } from '../Devices/Numbers'
import { Faxes } from '../Faxes/Faxes'
import i18n from '../Common/i18n'
import '../Home/Home.css'
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newmailscount: 0,
      missedcount: 0,
      user_name: "",
      allfaxescount: 0,
      calldata: '',
      userdata:'',
      alldevices: '',
      phone_num: '',
      today_data: '',
      faxesdata:'',
      faxbox:'',
      history: '',
      lng:'en'
    }
  }
  componentWillMount () {
    this.props.getallnotification();
  }
  componentDidMount () {
    !this.props.notification.loading ? this.props.getallnotification() : null;
  }
  componentDidUpdate(preProps) {
    let allnotifications  = this.props.notification.allnotifications;
    if(allnotifications !== preProps.notification.allnotifications) {
      this.setState({
        newmailscount: allnotifications.newmailscount,
        missedcount: allnotifications.missedcount,
        user_name: allnotifications.full_name,
        allfaxescount: allnotifications.allfaxescount,
        calldata: allnotifications.calldata,
        userdata: allnotifications.userdata,
        alldevices: allnotifications.alldevices,
        phone_num: allnotifications.phone_num,
        today_data: allnotifications.today_data,
        faxesdata: allnotifications.faxesdata,
        faxbox: allnotifications.faxbox,
        loading_state: allnotifications.faxbox,
      })
    }
  }
  render () {
    let {lng} = this.props.language;
    let {systemmessage} = this.props.systemmessage;
    if(systemmessage === 'Authentication failed.'){
      window.location.reload();
    }
    return (
      <div className="home">
        { this.props.notification.loading &&
          <div className="loader_container">
            <div className="loader"></div>
          </div>
        }
        <Topbar title={i18n.t('home.label', { lng })} user_name={this.state.user_name} lng={lng}/>
        <div className="ml-3 mr-3">
          <div className="row  mt-5">
            <div className="col-md-4 ">
              <MissedCalls missedcount={this.state.missedcount} lng={lng}/>
            </div>
            <div className="col-md-4">
              <NewVoicemails newmailscount={this.state.newmailscount} lng={lng}/>
            </div>
            <div className="col-md-4">
              <NewFaxes allfaxescount={this.state.allfaxescount} lng={lng}/>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-9">
              <CallHistory calldata = {this.state.calldata} history={this.props.history} lng={lng}/>
            </div>
            <div className="col-md-3">
              <TimeWeather userdata = {this.state.userdata} lng={lng}/>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-6">
              <Devices alldevices  = {this.state.alldevices} calldata={this.state.today_data} history={this.props.history} lng={lng}/>
            </div>
            <div className="col-md-6" >
              <Numbers phone_num = {this.state.phone_num}
                       history={this.props.history}
                       today_data={this.state.today_data}
                       lng={lng}/>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-9">
              <Faxes faxbox={this.state.faxbox}
                     faxesdata  = {this.state.faxesdata}
                     history={this.props.history}
                     auth_token = {this.props.auth_token}
                     lng={lng}/>
            </div>
            <div className="col-md-3" >
            </div>
          </div>
        </div>
      </div>
    )
  }
}
  const mapStateToProps =  state => ({notification: state.notification, language:state.language, systemmessage: state.systemmessage})
  const mapDispatchToProps = (dispatch) => ({
    getallnotification: () => dispatch(getallnotification())
  })
  export default connect(mapStateToProps,mapDispatchToProps)(authenticate(Home))