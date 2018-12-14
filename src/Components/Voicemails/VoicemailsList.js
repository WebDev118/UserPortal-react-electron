import React from 'react'
import { connect } from 'react-redux'
import { Topbar } from '../Common/Topbar'
import VoicemailsTable from './VoicemailsTable'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import _ from 'lodash'

class VoicemailsList extends React.Component {
	constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
			messages: null,
			new: 0,
			total:0,
			pagecount : 10,
			pagenum: 1,
			dropdownOpen: false,
			vmbox_id: ""
		}
  }

	toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

	componentDidMount() {
		// console.log("voicemailslist-----",this.props)
		const vmbox_id = this.props.match.params.vmbox_id;
		const vmbox =  _.find(this.props.allmessages, message => message.vmbox.id === vmbox_id)
		const messages = vmbox.messages

		this.setState({messages, new:vmbox.vmbox.newcount, total:vmbox.vmbox.messages, title: vmbox.vmbox.name, vmbox_id:vmbox_id})
	}

	render() {
		const {pagecount, pagenum, total } = this.state
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
							<div className='checkbox-wrap'>
								<div className="float-left"><input type='checkbox'/></div>
								<div className="direction-down">
									<Dropdown direction="down" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
										<DropdownToggle tag="div">&#9660;
										</DropdownToggle>
										<DropdownMenu>
											<DropdownItem>All on Page</DropdownItem>
											<DropdownItem divider />
											<DropdownItem>New</DropdownItem>
											<DropdownItem divider />
											<DropdownItem>Listened</DropdownItem>
											<DropdownItem divider />
											<DropdownItem>None</DropdownItem>
										</DropdownMenu>
									</Dropdown>
								</div>
							</div>
						</div>
						<div className="col-md-6">
							<div id='voicemail-search' className="text-right">
								<input type="text" className="form-control" placeholder="Search"/>
							</div>
						</div>
					</div>
					<VoicemailsTable allmessages = {this.state.messages} auth_token={this.props.auth_token} vmbox_id={this.state.vmbox_id}/>
					<nav className='bottom-nav'>
						<select id='view-per-page'>
							<option>View 10 per page</option>
						</select>
						<span id='page-num'>{(pagenum - 1 ) * pagecount + 1} - {pagecount < total ? pagecount : total} of {total}</span>
						<button>First</button>
						<button>&#60;</button>
						<button>&#62;</button>
						<button>Last</button>
					</nav>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => state.vmreducer

export default connect(mapStateToProps)(VoicemailsList)

