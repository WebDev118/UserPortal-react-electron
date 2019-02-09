import React from 'react';
import { connect } from 'react-redux';
import  Topbar  from '../Common/Topbar';
import { getallfaxes } from '../../Actions/faxes.action';
import DatePicker from "react-datepicker";
import { parsePhoneNumber } from 'libphonenumber-js';
import "react-datepicker/dist/react-datepicker.css";
import CONFIG from '../../Config.json';
import i18n from '../Common/i18n';
import moment from 'moment';
import './Faxes.css';

class FaxesPage extends React.Component {
  constructor(props) {
    super(props);
    const day = new Date();
    this.state = {
      title: "",
      total: 0,
      newcount: 0,
      faxbox_id: "",
      caller_name: "",
      startDate: new Date(day.setDate(day.getUTCDate()-7)),
      endDate: new Date(),
      faxes: "",
      searchKey:"",
      view: 0,
      perPage: 10,
      currentPage: 0,
      user_name: ''
    }
    this.handleStartChange = this.handleStartChange.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);
    this.onhandleChange = this.onhandleChange.bind(this);
    this.selectPerPage = this.selectPerPage.bind(this);
    this.setCountLabel = this.setCountLabel.bind(this);
    this.filtermailList = this.filtermailList.bind(this);
    this.prev = this.prev.bind(this);
		this.next = this.next.bind(this);
  }

  handleStartChange(date) {
    this.setState({
      startDate: date
    });
  }
  handleEndChange(date) {
    this.setState({
      endDate: date
    });
  }
  componentWillMount () {

    this.props.getallfaxes(this.state.startDate, this.state.endDate);
  }
  componentDidMount () {
    !this.props.loading ? this.props.getallfaxes(this.state.startDate, this.state.endDate) : null;
  }
  componentDidUpdate(preProps) {
    const {allfaxes} = this.props.faxreducer;
    if(allfaxes !== preProps.faxreducer.allfaxes) {
      let faxbox_title = allfaxes.faxbox.faxbox_name;
      let faxbox_id = allfaxes.faxbox.faxbox_id;
      let fax_count = allfaxes.faxes.length;
      let caller_name = allfaxes.faxbox.caller_name;
      let faxes = allfaxes.faxes;
      let user_name = allfaxes.full_name;
      this.setState({title: faxbox_title, total: fax_count, faxbox_id: faxbox_id, faxes: faxes, caller_name:caller_name, user_name: user_name })
    }
  }
  getPhoneNumber = (number) => {
    let phoneNumber = parsePhoneNumber("+"+number).formatInternational();
    let number_arr = phoneNumber.split(" ");
    var fianlnumber = number_arr[0]+" "+number_arr[1]+"-"+number_arr[2]+"-"+number_arr[3];
    return fianlnumber
  }
  getDateTime = (timestamp) => {
    let stamp = new Date(timestamp * 1000);
    let year = stamp.getFullYear()-1970;
    let month = stamp.getMonth()+1;
    let date = "0"+ stamp.getDate();
    let hours = "0" + stamp.getHours();
    let minutes = "0" + stamp.getMinutes();
    let seconds = "0" + stamp.getSeconds();
    let formattedDate =  year + "-"+ month + "-" + date.substr(-2) ;
    let formattedTime = hours.substr(-2) + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    let dateTime1 = formattedDate+" "+ formattedTime;
    let gmtDateTime = moment.utc(dateTime1, "YYYY-MM-DD HH:mm:ss");
    let local = gmtDateTime.local().format('MM/DD/YYYY HH:mm:ss');
    let dateTime = {"date": local.split(" ")[0], "time":local.split(" ")[1]};
    return dateTime;
  }
  onhandleChange(e){
    var value = e.target.value;
    this.setState({ searchKey: value });
  }
  selectPerPage = (e) => {
    this.setState({perPage: e.target.value})
  }
  setCountLabel = (total) => {
    if ((this.state.perPage * (this.state.currentPage + 1)) < total)
      return this.state.perPage * (this.state.currentPage + 1);
    else
      return total;
  }
  prev = () => {
    let tmp = this.state.currentPage;
    this.setState({
      currentPage: tmp - 1,
    });
  }

  next = () => {
    let tmp = this.state.currentPage;
    this.setState({
      currentPage: tmp + 1,
    });
  }
  filtermailList = (allfaxes, perPage, currentPage, search) => {
    let subfaxesRecords = [];
    if (allfaxes && allfaxes.length > 0) {
      for (var index = perPage * currentPage; index < perPage * (currentPage + 1); index++) {
        if (allfaxes[index]) {
          if (!search) {
            subfaxesRecords.push(allfaxes[index]);
          }else{
            let search_Key = search.toLowerCase().trim();
            var caller = this.state.caller_name.toLowerCase();
            var phoneNumber = this.getPhoneNumber(allfaxes[index].from_number).trim();
            if (allfaxes[index].from.includes(search_Key)||caller.includes(search_Key)||phoneNumber.includes(search_Key))
              subfaxesRecords.push(allfaxes[index]);
          }
        }
      }
    }
    return subfaxesRecords;
  }
  render () {
    let {systemmessage} = this.props.systemmessage;
    if(systemmessage === 'Authentication failed.'){
      window.location.reload();
    }
    let { allfaxes } = this.props.faxreducer;
    let faxes = this.state.faxes;
    let auth_token = this.props.auth_token;
    let {lng} = this.props.language;
    let faxesRecords = this.filtermailList(faxes, this.state.perPage, this.state.currentPage, this.state.searchKey);
    if(!allfaxes) {
      return (
        <div className='main'>
          { this.props.faxreducer.loading &&
            <div className="loader_container">
              <div className="loader"></div>
            </div>
          }
          <Topbar title={i18n.t('faxes.label', { lng })} user_name={this.state.user_name}/>
        </div>
      )
    }
    else{
      return (
        <div className='main'>
          { this.props.faxreducer.loading &&
            <div className="loader_container">
              <div className="loader"></div>
            </div>
          }
          <Topbar title='Faxes' user_name={this.state.user_name}/>
          <div className="fax-content">
          <div className="text-left"><h3>{this.state.title}</h3></div>
            <div className='voicemail-top-wrap'>
              <div className='voicemails-top'>
                <h1>0</h1>
                {i18n.t('new.label', { lng })}
              </div>
              <div className='voicemails-top'>
                <h1>{this.state.total}</h1>
                {i18n.t('total.label', { lng })}
              </div>
            </div>
            <div className='fax-search mt-5'>
              <div className="row text-left">
                <div className="col-sm-2 col-md-1 col-xl-1  date-margin">
                  <label htmlFor='start-date'>{i18n.t('state_date.label', { lng })}</label>
                  <DatePicker className="calendar1 form-control"
                    selected={this.state.startDate}
                    onChange={this.handleStartChange}
                    maxDate ={new Date()}
                    placeholderText="mm/dd/yyyy"
                  />
                </div>
                <div className="col-sm-2 col-md-1 col-xl-1 date-margin">
                  <label htmlFor='end-date'> {" "+i18n.t('end_date.label', { lng })+" "} </label>
                  <div className="endtime-align">
                    <DatePicker className="calendar1 form-control "
                      minDate ={this.state.startDate}
                      maxDate ={new Date()}
                      selected={this.state.endDate}
                      onChange={this.handleEndChange}
                      placeholderText="mm/dd/yyyy"
                    />
                  </div>
                </div>
                <div className="col-sm-2 col-md-1 col-xl-1 date-margin">
                  <button className="btn btn-outline-secondary" onClick={() => this.props.getallfaxes(this.state.startDate, this.state.endDate)}>
                    {i18n.t('apply.label', { lng })}
                  </button>
                </div>
                <div className="text-right">
                  <input className='fax-search-text form-control' type='text' placeholder={i18n.t('search.label', { lng })} onChange={this.onhandleChange}/>
                </div>
              </div>
            </div>

            <div className="row text-left mt-5 mb-2">
              <div className='faxtable'>
                <div className="faxesrow">
                  <div className="col-md-3 row">
                    <div className="col-md-3"> </div>
                    <div className="col-md-9">{i18n.t('from.label', { lng })}</div>
                  </div>
                  <div className="col-md-3">{i18n.t('to.label', { lng })}</div>
                  <div className="col-md-3">{i18n.t('date_time.label', { lng })}</div>
                  <div className="col-md-3"></div>
                </div>
              </div>
            </div>
            { faxesRecords && faxesRecords.length>0 ? faxesRecords.map((fax, index) => {
              let URL = `${CONFIG.API_URL}${CONFIG.API_VERSION}/accounts/${CONFIG.ACCOUNT_ID}/faxes/inbox/${fax.id}/attachment?auth_token=${auth_token}`;
              return(
                <div className = "tr-content row" key={index}>
                  <div className="row2 text-left">
                    <div className="col-md-3 row">
                      <div className="col-md-3 from-call-img">
                        <img src='fax-sidebar.png' alt="fax-sidebar"/>
                      </div>
                      <div className="col-md-9">
                        {fax.from}<br/>
                        <span className='grey'>
                        { this.getPhoneNumber(fax.from_number)}
                      </span>
                      </div>
                    </div>
                    <div className="col-md-3">
                      {this.state.caller_name}<br />
                      <span className='grey'>
                        { this.state.title}
                      </span>
                    </div>
                    <div className="col-md-3">
                      { this.getDateTime(fax.created).date}<br />
                      <span className='grey'>
                        { this.getDateTime(fax.created).time}
                      </span>
                    </div>
                    <div className="col-md-3 text-right">
                      <button className="faxdownload"><a href={URL} target="_blank"><img src='download.png' alt="download" width="120%" /></a></button>
                    </div>
                  </div>
                </div>
              )}
            ):
            <div className = "tr-content row">
              <h2>{i18n.t('no.label', { lng })+" "+i18n.t('results.label', { lng })}!</h2>
            </div>
            }
            { this.state.view === 0 ? (
            <nav className='bottom-nav'>
              <label>{i18n.t('view.label', { lng })}</label>
              <select onChange={this.selectPerPage}>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
              <label>{i18n.t('per_page.label', { lng })}</label>
              <span id='page-num'>{this.state.perPage * this.state.currentPage + 1}-{this.setCountLabel(this.state.total)} of {this.state.total}</span>
              { this.state.currentPage === 0 ? (
                <button onClick={this.prev} className="button-disable" disabled>&#60;</button>
                ) : (
                <button onClick={this.prev} className="button-enable">&#60;</button>
              )}
              { ((this.state.currentPage + 1)* this.state.perPage >= this.state.total) ? (
                <button onClick={this.next} className="button-disable" disabled>&#62;</button>
              ) : (
                <button onClick={this.next} className="button-enable">&#62;</button>
              )}
            </nav>
            ) : null }
          </div>
        </div>
      )
    }
  }
}
const mapStateToProps = state => ({faxreducer: state.faxreducer, language: state.language, systemmessage: state.systemmessage})
const mapDispatchToProps = (dispatch) => ({
  getallfaxes: (from, to) => dispatch(getallfaxes(from, to))
})
export default connect(mapStateToProps, mapDispatchToProps)(FaxesPage)
