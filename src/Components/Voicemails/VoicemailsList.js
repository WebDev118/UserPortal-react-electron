import React from 'react'
import { connect } from 'react-redux'
import { Topbar } from '../Common/Topbar'
import VoicemailsTable from './VoicemailsTable'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import _ from 'lodash'
import axios from 'axios';
import CONFIG from '../../Config.json';

class VoicemailsList extends React.Component {
	constructor(props) {
    super(props);

    this.state = {
			messages: null,
			checkVoiceMail: null,
			checkedMail: null,
			makeStateMail: null,
			searchKey:"",
			new: 0,
			total:0,
			dropdownOpen1: false,
			dropdownOpen2: false,
			itemView: false,
			vmbox_id: "",
			allItem: false,
			newItem: false,
			listenedItem: false,
			deletedItem: false,
			noneItem: false,
			checkKey: '',
			view: 0,
      perPage: 10,
      currentPage: 0,
		}
		this.toggle1 = this.toggle1.bind(this);
		this.toggle2 = this.toggle2.bind(this);
		this.allItem = this.allItem.bind(this);
		this.onhandleChange = this.onhandleChange.bind(this);
		this.newItem = this.newItem.bind(this);
		this.listenedItem = this.listenedItem.bind(this);
		this.noneItem = this.noneItem.bind(this);
		this.deletedItem = this.deletedItem.bind(this);
		this.checkboxChange = this.checkboxChange.bind(this);
		this.selectPerPage = this.selectPerPage.bind(this);
    this.setCountLabel = this.setCountLabel.bind(this);
    this.prev = this.prev.bind(this);
		this.next = this.next.bind(this);
		this.checkVoiceMail = this.checkVoiceMail.bind(this);
		this.mailStateChange = this.mailStateChange.bind(this);
	}
	componentDidMount() {
		const vmbox_id = this.props.match.params.vmbox_id;
		const vmbox =  _.find(this.props.allmessages, message => message.vmbox.id === vmbox_id)
		const messages = vmbox.messages;
		this.setState({messages,
									new:vmbox.vmbox.newcount,
									total:vmbox.vmbox.messages,
									title: vmbox.vmbox.name,
									vmbox_id:vmbox_id},() => {
										this.checkVoiceMail(this.state.messages)
									}
			)
	}
	toggle1() {
    this.setState({
      dropdownOpen1: !this.state.dropdownOpen1
    });
	}
	toggle2() {
    this.setState({
      dropdownOpen2: !this.state.dropdownOpen2
    });
	}
	onhandleChange(e){
    var value = e.target.value;
    this.setState({ searchKey: value });
  }
	allItem(){
		this.setState({
			allItem: true,
			newItem: false,
			listenedItem: false,
			deletedItem: false,
			noneItem: false,
			checkKey: '',
			checkState: false
		}, () => {this.checkVoiceMail(this.state.messages);
		});
	}
	newItem(){
		this.setState({
			allItem: false,
			newItem: true,
			listenedItem: false,
			deletedItem: false,
			noneItem: false,
			checkKey: '',
			checkState: false
		}, () => {this.checkVoiceMail(this.state.messages);
		});
	}
	listenedItem(){
		this.setState({
			allItem: false,
			newItem: false,
			listenedItem: true,
			deletedItem: false,
			checkKey: '',
			noneItem: false,
		}, () => {this.checkVoiceMail(this.state.messages);
		});
	}
	deletedItem(){
		this.setState({
			allItem: false,
			newItem: false,
			listenedItem: false,
			deletedItem: true,
			checkKey: '',
			noneItem: false,
		}, () => {this.checkVoiceMail(this.state.messages);
		});
	}
	noneItem(){
		this.setState({
			allItem: false,
			newItem: false,
			listenedItem: false,
			deletedItem: false,
			noneItem: true,
			itemView: false,
			checkKey: '',
			checkState: false
		}, () => {this.checkVoiceMail(this.state.messages);
		});
	}
	checkVoiceMail = (messages) => {
		let checkVoiceMails = [];
		if(messages){
			messages.map((message,index) => {
				if(!this.state.noneItem && !this.state.allItem && !this.state.newItem && !this.state.listenedItem && !this.state.deletedItem){
					checkVoiceMails.push({"media_id":message.media_id, "state": false})
				}else{
					if(this.state.noneItem){
						checkVoiceMails.push({"media_id":message.media_id, "state": false})
					}
					if(this.state.allItem){
						checkVoiceMails.push({"media_id":message.media_id, "state": true})
					}
					if(this.state.newItem){
						if(message.folder === "new"){
							checkVoiceMails.push({"media_id":message.media_id, "state": true})
						}else{
							checkVoiceMails.push({"media_id":message.media_id, "state": false})
						}
					}
					if(this.state.listenedItem){
						if(message.folder === "saved"){
							checkVoiceMails.push({"media_id":message.media_id, "state": true})
						}else{
							checkVoiceMails.push({"media_id":message.media_id, "state": false})
						}
					}
					if(this.state.deletedItem){
						if(message.folder === "deleted"){
							checkVoiceMails.push({"media_id":message.media_id, "state": true})
						}else{
							checkVoiceMails.push({"media_id":message.media_id, "state": false})
						}
					}
				}
			})
		}
		this.setState({checkVoiceMail: checkVoiceMails}, ()=>{
			this.makeStateMail();
		});
	}
	mailStateChange = (messages) =>{
		let checkVoiceMails = [];
		if(messages){
			messages.map((message,index) => {
				if(message.media_id === this.state.checkKey){
					checkVoiceMails.push({"media_id":message.media_id, "state": !message.state})
				}else{
					checkVoiceMails.push({"media_id":message.media_id, "state": message.state})
				}
			})
		}
		return checkVoiceMails;
	}
	checkboxChange = (key) => {

    this.setState({
      checkKey: key
		}, () => {
			this.setState({checkVoiceMail: this.mailStateChange(this.state.checkVoiceMail)},() => {
				this.makeStateMail();
			});
		});
  }
	makeStateMail = () => {
		let makeStateMail=[];
		this.state.checkVoiceMail && this.state.checkVoiceMail.map((checkedMail, index) => {
			if(checkedMail.state){
				makeStateMail.push(checkedMail);
			}
		})
		this.setState({makeStateMail: makeStateMail,itemView: (makeStateMail.length>0? true:false)})
	}
	makeNewItem = () => {
		if(this.state.makeStateMail){
			this.state.makeStateMail.map((makenew, index) => {
			let URL = `${CONFIG.API_URL}${CONFIG.API_VERSION}/accounts/${CONFIG.ACCOUNT_ID}/vmboxes/${this.state.vmbox_id}/messages/${makenew.media_id}`
			let data = {"data": {"folder": "new"}};
			axios.post(URL,data)
			.then((res) => {
				this.props.history.push("/voicemails/")
			})
			.catch((error) => {
				console.log(error)
			})
			});
		}
	}
	makelDeletedItem = () => {
		if(this.state.makeStateMail){
			this.state.makeStateMail.map((makenew, index) => {
			let URL = `${CONFIG.API_URL}${CONFIG.API_VERSION}/accounts/${CONFIG.ACCOUNT_ID}/vmboxes/${this.state.vmbox_id}/messages/${makenew.media_id}`
			let data = {"data": {"folder": "deleted"}};
			axios.post(URL,data)
			.then((res) => {
				this.props.history.push("/voicemails/")
			})
			.catch((error) => {
				console.log(error)
			})
			});
		}
	}
	makeListenedItem = () => {
		if(this.state.makeStateMail){
			this.state.makeStateMail.map((makenew, index) => {
			let URL = `${CONFIG.API_URL}${CONFIG.API_VERSION}/accounts/${CONFIG.ACCOUNT_ID}/vmboxes/${this.state.vmbox_id}/messages/${makenew.media_id}`
			let data = {"data": {"folder": "saved"}};
			axios.post(URL,data)
			.then((res) => {
				this.props.history.push("/voicemails/")
			})
			.catch((error) => {
				console.log(error)
			})
			});
		}
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
	render() {
		console.log(this.state.makeStateMail);
		return (
			<div className='main'>
				<Topbar title='Voicemails' />
				<div className="pl-3">
					<div className="text-left mt-4 mb-3 grey back-box" onClick={() => this.props.history.push('/voicemails/')}>
						<i className="fa fa-arrow-circle-left mr-1" aria-hidden="true"></i>
						Back to voicemail list
					</div>
					<div className="text-left"><h3>{this.state.title}</h3></div>
					<div className='voicemail-top-wrap'>
						<div className={`voicemails-top ${(this.state.new) > 0 ? 'voicemails-top-1' : 'voicemails-top-2'}`}>
							<h1 className={this.state.new > 0 ? "newcount" : ""}>{this.state.new}</h1>New
						</div>
						<div className='voicemails-top voicemails-top-2'>
							<h1 className="totalcount" >{this.state.total}</h1>	Total
						</div>
					</div>

					<div className="row">
						<div className="col-md-6">
							<div className='checkbox-wrap' onClick={this.toggle1}>
								<div className="float-left"><input type='checkbox' checked={this.state.itemView} readOnly/></div>
								<div className="direction-down">
									<Dropdown direction="down" isOpen={this.state.dropdownOpen1} toggle={this.toggle1}>
										<DropdownToggle tag="div">&#9660;
										</DropdownToggle>
										<DropdownMenu>
											<DropdownItem onClick={this.allItem}>All on Page</DropdownItem>
											<DropdownItem divider />
											<DropdownItem onClick={this.newItem}>New</DropdownItem>
											<DropdownItem divider />
											<DropdownItem onClick={this.listenedItem}>Listened</DropdownItem>
											<DropdownItem divider />
											<DropdownItem onClick={this.deletedItem}>Deleted</DropdownItem>
											<DropdownItem divider />
											<DropdownItem onClick={this.noneItem}>None</DropdownItem>
										</DropdownMenu>
									</Dropdown>
								</div>
							</div>
							{ this.state.itemView && this.state.makeStateMail &&
								<div className='checkbox-wrap ml-2' onClick={this.toggle2}>
									<div className="float-left"><i className="fa fa-list-ul"></i></div>
									<div className="direction-down">
										<Dropdown direction="down" isOpen={this.state.dropdownOpen2} toggle={this.toggle2}>
											<DropdownToggle tag="div">&#9660;
											</DropdownToggle>
											<DropdownMenu>
												<DropdownItem onClick={this.makeNewItem}>Make as New</DropdownItem>
												<DropdownItem divider />
												<DropdownItem onClick={this.makeListenedItem}>Make as Listened</DropdownItem>
												<DropdownItem divider />
												<DropdownItem onClick={this.makelDeletedItem}>Make as Deleted</DropdownItem>
											</DropdownMenu>
										</Dropdown>
									</div>
								</div>
							}

						</div>
						<div className="col-md-6">
							<div id='voicemail-search' className="text-right">
								<input className='fax-search-text form-control' type='text' placeholder='Search' onChange={this.onhandleChange}/>
							</div>
						</div>
					</div>
					<VoicemailsTable
						allmessages = {this.state.messages}
						history={this.props.history}
						auth_token={this.props.auth_token}
						checkboxChange={this.checkboxChange}
						itemState={this.state}
						vmbox_id={this.state.vmbox_id}
						perPage={this.state.perPage}
            currentPage={this.state.currentPage}
						searchKey={this.state.searchKey}
						checkVoiceMail = {this.state.checkVoiceMail}
					/>
					{ this.state.view === 0 ? (
            <nav className='bottom-nav'>
              <label>View</label>
              <select onChange={this.selectPerPage}>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
              <label>per page</label>
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

const mapStateToProps = state => state.vmreducer

export default connect(mapStateToProps)(VoicemailsList)

