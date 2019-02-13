import React from 'react';
import { connect } from 'react-redux';
import  Topbar  from '../Common/Topbar';
import { getallfaxes } from '../../Actions/faxes.action';
import DatePicker from "react-datepicker";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { parsePhoneNumber } from 'libphonenumber-js';
import "react-datepicker/dist/react-datepicker.css";
import CONFIG from '../../Config.json';
import i18n from '../Common/i18n';
import moment from 'moment';
import './Faxes.css';
import _ from 'lodash';
import axios from 'axios';

class FaxesPage extends React.Component {
  constructor(props) {
    super(props);
    const day = new Date();
    this.state = {
      startDate: new Date(day.setDate(day.getDate()-7)),
      endDate: new Date(),
      faxbox_name: "",
      total: 0,
      newcount: 0,
      faxbox_id: "",
      caller_name: "",
      faxes: "",
      searchKey:"",
      view: 0,
      perPage: 10,
      currentPage: 0,
      user_name: '',
      dropdownOpen1: false,
      allItem: false,
			noneItem: false,
      checkKey: '',
      itemView: false,
      checkState: false,
      faxesState: null,
      makeCheckedFax: null
    }
    this.apply = this.apply.bind(this);
    this.startDateChange = this.startDateChange.bind(this);
    this.endDateChange = this.endDateChange.bind(this);
    this.onhandleChange = this.onhandleChange.bind(this);
    this.selectPerPage = this.selectPerPage.bind(this);
    this.setCountLabel = this.setCountLabel.bind(this);
    this.filtermailList = this.filtermailList.bind(this);
    this.prev = this.prev.bind(this);
    this.next = this.next.bind(this);
    this.toggle1 = this.toggle1.bind(this);
    this.allItem = this.allItem.bind(this);
    this.noneItem = this.noneItem.bind(this);
    this.checkFaxes = this.checkFaxes.bind(this);
    this.checkboxChange = this.checkboxChange.bind(this);
    this.deleteFax = this.deleteFax.bind(this);
  }


  componentWillMount () {
    this.props.getallfaxes(this.state.startDate, this.state.endDate);
  }

  componentDidUpdate(preProps) {
    const {allfaxes} = this.props.faxreducer;
    if(allfaxes !== preProps.faxreducer.allfaxes) {
      let faxbox_name = allfaxes.faxbox.faxbox_name;
      let faxbox_id = allfaxes.faxbox.faxbox_id;
      let caller_name = allfaxes.faxbox.caller_name;
      let faxesArray =  _.orderBy([...allfaxes.faxes_inbox_data, ...allfaxes.faxes_outbox_data],'created', 'desc');
      let faxes = [];
      if(faxesArray && faxesArray.length>0){
        faxesArray.map(fax => {
          if(fax.folder === "inbox"){
            faxes.push(fax);
          }
          if(fax.folder === "outbox" && fax.from_name === this.state.caller_name){
            faxes.push(fax);
          }
        })
      }
      let fax_count = faxes.length;
      let user_name = allfaxes.full_name;
      this.setState({faxbox_name: faxbox_name,
                     total: fax_count,
                     faxbox_id: faxbox_id,
                     faxes: faxes,
                     caller_name:caller_name,
                     user_name: user_name
        }, ()=> {
          this.checkFaxes(this.state.faxes);
        });
    }
  }
  toggle1() {
    this.setState({
      dropdownOpen1: !this.state.dropdownOpen1
    });
	}
  startDateChange = (date) => {
    this.setState({
      startDate: date,
    }, ()=>{
      var dateDiff = parseInt((this.state.endDate.getTime()-this.state.startDate.getTime())/(24*3600*1000));
      if(dateDiff>30){
        this.setState({
          endDate: new Date(this.state.startDate.getTime()+30*24*3600*1000)
        });
      }
    });
  }
  endDateChange = (date) => {
    this.setState({
      endDate: date,
    }, ()=>{
      var dateDiff = parseInt((this.state.endDate.getTime()-this.state.startDate.getTime())/(24*3600*1000));
      if(dateDiff>30){
        this.setState({
          startDate: new Date(this.state.endDate.getTime()-30*24*3600*1000)
        });
      }
    });
  }
  apply = () => {
    this.props.getallfaxes(this.state.startDate, this.state.endDate);
  }
  getPhoneNumber = (number) => {
    let phone_number = "";
    var phoneNumber;
    if(!number.includes( "+" )) {
      if (number.length === 11) {
        phone_number = parsePhoneNumber("+" + number)
        let phone_num = phone_number.formatInternational();
        let number_arr = phone_num.split(" ");
        phoneNumber = number_arr[0] + " " + number_arr[1] + "-" + number_arr[2] + "-" + number_arr[3];
        return phoneNumber;
      } else if (number.length === 10) {
        phone_number = parsePhoneNumber("+1" + number);
        let phone_num = phone_number.formatInternational();
        let number_arr = phone_num.split(" ");
        phoneNumber = number_arr[0] + " " + number_arr[1] + "-" + number_arr[2] + "-" + number_arr[3];
        return phoneNumber;
      } else {
        return number;
      }
    }
    else{
      phone_number = parsePhoneNumber(number)
      let phone_num = phone_number.formatInternational();
      let number_arr = phone_num.split(" ");
      phoneNumber = number_arr[0] + " " + number_arr[1] + "-" + number_arr[2] + "-" + number_arr[3];
      return phoneNumber;
    }
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
  allItem(){
		this.setState({
			allItem: true,
			noneItem: false,
			checkKey: '',
			checkState: false
		}, () => {this.checkFaxes(this.state.faxes);
		});
  }
  noneItem(){
		this.setState({
			allItem: false,
			noneItem: true,
			itemView: false,
			checkKey: '',
			checkState: false
		}, () => {this.checkFaxes();
		});
  }
  checkFaxes = () => {
		let faxesState = [];
		if(this.state.faxes){
			this.state.faxes.map(fax => {
        if(this.state.allItem){
          faxesState.push({"id":fax.id, "state": true, "folder": fax.folder})
        }
        else{
          faxesState.push({"id":fax.id, "state": false, "folder": fax.folder})
        }
			})
		}
		this.setState({faxesState: faxesState }, ()=>{
			this.setCheckedFax();
		});
  }
  faxStateChange = () =>{
		let checkedFaxes = [];
		if(this.state.faxesState){
			this.state.faxesState.map(fax => {
				if(fax.id === this.state.checkKey){
					checkedFaxes.push({"id":fax.id, "state": !fax.state,  "folder": fax.folder})
				}else{
					checkedFaxes.push({"id":fax.id, "state": fax.state,  "folder": fax.folder})
				}
			})
		}
		return checkedFaxes;
	}
	checkboxChange = (key) => {
    this.setState({
      checkKey: key
		}, () => {
			this.setState({faxesState: this.faxStateChange()},() => {
				this.setCheckedFax();
			});
		});
  }
	setCheckedFax = () => {
		let makeCheckedFax=[];
		this.state.faxesState && this.state.faxesState.map(checkedFax => {
			if(checkedFax.state){
				makeCheckedFax.push(checkedFax);
			}
    })
		this.setState({makeCheckedFax: makeCheckedFax, itemView:(makeCheckedFax.length>0? true :false)});
  }
  deleteFax = () => {
    if(this.state.makeCheckedFax && this.state.makeCheckedFax.length > 0){
			this.state.makeCheckedFax.map(deleteFax => {
			let URL = `${CONFIG.API_URL}${CONFIG.API_VERSION}/accounts/${CONFIG.ACCOUNT_ID}/faxes/${deleteFax.folder}/${deleteFax.id}`
			axios.delete(URL)
			.then((res) => {
				this.props.history.push('/faxes');
			})
			.catch((error) => {
				console.log(error)
			})
			});
		}
  }
  render () {
    let {systemmessage} = this.props.systemmessage;
    if(systemmessage === 'Authentication failed.'){
      window.location.reload();
    }
    let faxes = this.state.faxes;
    let auth_token = this.props.auth_token;
    let {lng} = this.props.language;
    let faxesRecords = this.filtermailList(faxes, this.state.perPage, this.state.currentPage, this.state.searchKey);
    return (
      <div className='faxes'>
        { this.props.faxreducer.loading &&
          <div className="loader_container">
            <div className="loader"></div>
          </div>
        }
        <Topbar title='Faxes' user_name={this.state.user_name}/>
        <div className="fax-container">
          <div className="row">
            <div className="voicemail-top-wrap col-md-12">
              <div className="voicemails-top">
                <h1 className="totalcount">0</h1>
                <span className="num-title">{i18n.t('new.label', { lng })}</span>
              </div>
              <div className='voicemails-top'>
                <h1 className="totalcount" >{this.state.total}</h1>
                <span className="num-title">{i18n.t('total.label', { lng })}</span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <div className='fax-checkbox-wrap' onClick={this.toggle1}>
                <div className="float-left"> <input type='checkbox' checked={this.state.itemView} readOnly/></div>
                <div className="direction-down">
                  <Dropdown direction="down" isOpen={this.state.dropdownOpen1} toggle={this.toggle1}>
                    <DropdownToggle tag="div">&#9660;
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem onClick={this.allItem}>{i18n.t('all_on_page.label', { lng })}</DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem onClick={this.noneItem}>{i18n.t('none.label', { lng })}</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </div>
              { this.state.makeCheckedFax && this.state.makeCheckedFax.length > 0 &&
                <div className='fax-checkbox-trash' onClick={this.deleteFax}>
                  <svg className="fax-icon">
                    <use href="telicon-2.1.0.svg#trash-x"/>
                  </svg>
                </div>
              }
            </div>

            <div className="col-md-9 text-right">
              <div className="fax-search">
                <div className="state-date">
                  <label>{i18n.t('state_date.label', { lng })}</label>
                    <DatePicker className="calendar1 form-control"
                      onChange={this.startDateChange}
                      maxDate={this.state.endDate}
                      selected={this.state.startDate}
                      placeholderText="mm/dd/yyyy"
                    />
                </div>
                <div className="end-date">
                  <label>{i18n.t('end_date.label', { lng })}</label>
                  <div className="endtime-align">
                    <DatePicker className="calendar1 form-control"
                      onChange={this.endDateChange}
                      selected={this.state.endDate}
                      minDate={this.state.startDate}
                      maxDate={new Date()}
                      placeholderText="mm/dd/yyyy"
                    />
                  </div>
                </div>
                <div className="mr-3">
                  <button className="fax-search-button" onClick={this.apply}>{i18n.t('apply.label', { lng })}</button>
                </div>
                <div className="mr-2">
                  <input className='fax-search-text form-control' type='text' placeholder={i18n.t('search.label', { lng })} onChange={this.onhandleChange}/>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className='col-md-12 faxtable'>
              <div className="table-th">
                <div className="col-md-2 pl-5">
                  {i18n.t('status.label', { lng })}
                </div>
                <div className="col-md-2">{i18n.t('from.label', { lng })}</div>
                <div className="col-md-2">{i18n.t('to.label', { lng })}</div>
                <div className="col-md-3">{i18n.t('date_time.label', { lng })}</div>
                <div className="col-md-2">{i18n.t('pages.label', { lng })}</div>
                <div className="col-md-1"></div>
              </div>
              { faxesRecords && faxesRecords.length>0 ? faxesRecords.map((fax, index) => {
                let URL = `${CONFIG.API_URL}${CONFIG.API_VERSION}/accounts/${CONFIG.ACCOUNT_ID}/faxes/inbox/${fax.id}/attachment?auth_token=${auth_token}`;
                if(fax.folder === "inbox"){
                  return(
                    <div className = "fax-row" key={index}>
                      <div className="col-md-2 table-td">
                        <div className="mr-4">
                          { this.state.faxesState && this.state.faxesState.map((faxState, index) => {
                            if(fax.id === faxState.id){
                              return(
                                <input key={index} type='checkbox' className="checkbox" checked={faxState.state} onChange={() => this.checkboxChange(fax.id)}/>
                              )
                            }
                            else{
                              <input key={index} type='checkbox' className="checkbox" checked={false} onChange={() => this.checkboxChange(fax.id)}/>
                            }
                          })}
                        </div>
                        <div><span className="viewedstatus">{i18n.t('viewed.label', { lng })}</span></div>
                      </div>
                      <div className="col-md-2 table-td">
                        <div className="mr-4">
                          <svg className="fax-icon">
                            <use href="telicon-2.1.0.svg#download"/>
                          </svg>
                        </div>
                        <div>
                          <div className='name'>{fax.from}</div>
                          <div className='number'>
                            {this.getPhoneNumber(fax.from_number)}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-2">
                        <div className='name'>{ this.state.caller_name}</div>
                        <div className='number'>
                          {this.state.faxbox_name}
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className='name text-left'>{this.getDateTime(fax.created).date}</div>
                        <div className='number text-left'>
                          {this.getDateTime(fax.created).time}
                        </div>
                      </div>
                      <div className="col-md-2">
                        <div className='name'>{fax.rx_result.total_pages?fax.rx_result.total_pages:"0"}</div>
                      </div>
                      <div className="col-md-1">
                        <a href={URL} target="_blank">
                          <svg className="fax-icon">
                            <use href="telicon-2.1.0.svg#download-cloud"/>
                          </svg>
                        </a>
                      </div>
                    </div>
                  )
                }
                if(fax.folder === "outbox"){
                  return(
                    <div className = "fax-row" key={index}>
                      <div className="col-md-2 table-td">
                        <div className="mr-4">
                          { this.state.faxesState && this.state.faxesState.map((faxState, index) => {
                            if(fax.id === faxState.id){
                              return(
                                <input key={index} type='checkbox' className="checkbox" checked={faxState.state} onChange={() => this.checkboxChange(fax.id)}/>
                              )
                            }
                            else{
                              <input key={index} type='checkbox' className="checkbox" checked={false} onChange={() => this.checkboxChange(fax.id)}/>
                            }
                          })}
                        </div>
                        <div>
                          {fax.status === "completed" ? <span className="completedstatus">{i18n.t('success.label', { lng })}</span>
                          : (fax.status === "failed"? <span className="failedstatus">{i18n.t('failed.label', { lng })}</span>:"")
                          }
                        </div>
                      </div>
                      <div className="col-md-2 table-td">
                        <div className="mr-4">
                          <svg className="fax-icon">
                            <use href="telicon-2.1.0.svg#upload"/>
                          </svg>
                        </div>
                        <div>
                          <div className='name text-left'>{ this.state.caller_name}</div>
                          <div className='number text-left'>
                            {this.state.faxbox_name}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-2">
                        <div className='name text-left'>{fax.to_name}</div>
                        <div className='number text-left'>
                          {this.getPhoneNumber(fax.to_number)}
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className='name text-left'>{this.getDateTime(fax.created).date}</div>
                        <div className='number text-left'>
                          {this.getDateTime(fax.created).time}
                        </div>
                      </div>
                      <div className="col-md-2">
                        <div className='name'>{fax.tx_result.total_pages?fax.tx_result.total_pages:"0"}</div>
                      </div>
                      <div className="col-md-1">
                        <a href={URL} target="_blank">
                          <svg className="fax-icon">
                            <use href="telicon-2.1.0.svg#download-cloud"/>
                          </svg>
                        </a>
                      </div>
                    </div>
                  )}
                }
              ):
              <div className = "fax-row">
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
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({faxreducer: state.faxreducer, language: state.language, systemmessage: state.systemmessage})
const mapDispatchToProps = (dispatch) => ({
  getallfaxes: (from, to) => dispatch(getallfaxes(from, to))
})
export default connect(mapStateToProps, mapDispatchToProps)(FaxesPage)
