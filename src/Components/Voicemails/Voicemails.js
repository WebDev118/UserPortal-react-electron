import React from 'react';
import { connect } from 'react-redux';
import { Topbar } from '../Common/Topbar';
import VoicemailsTable from './VoicemailsTable';
import './Voicemails.css';
import { getallvmboxes } from '../../Actions/voicemails.action';
import VoicemailBox from './VoicemailBox';
class Voicemails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allmessages: [],
      vmboxes: null,
      new : 0,
      total: 0,
      view: 0,
      perPage: 10,
      currentPage: 0,
      perPage: 10,
      searchKey:""
    }
    this.selectPerPage = this.selectPerPage.bind(this);
    this.setCountLabel = this.setCountLabel.bind(this);
    this.prev = this.prev.bind(this);
    this.next = this.next.bind(this);
    this.onhandleChange = this.onhandleChange.bind(this);
  }


  componentWillMount () {
   this.props.getallvmboxes();
 }
  componentDidMount () {
    !this.props.loading ? this.props.getallvmboxes() : null;
  }

  componentDidUpdate(preProps) {
    const {allmessages, vmboxes} = this.props;
    if(allmessages != preProps.allmessages && allmessages.length == 1) {
      let newmsg = allmessages[0].vmbox.newcount

      this.setState({new: allmessages[0].vmbox.newcount, total: allmessages[0].vmbox.messages})
    }
    if(vmboxes !== preProps.vmboxes) {
      this.setState({vmboxes})
    }
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

  render () {
    let totalcount = 0;
    let {allmessages} = this.props;
    if(!allmessages) {
      return (
        <div className='main'>
          <Topbar title='Voicemails' />
        </div>
      )
    }
    if(allmessages && allmessages.length > 1) {
      return (
        <div className='main'>
          <Topbar title='Voicemails' />
          <VoicemailBox allmessages = {allmessages} history={this.props.history}/>
        </div>
      )
    } else {
      return (
        <div className='main'>
          <Topbar title='Voicemails'/>
          <div>
            <div style={{textAlign:"left"}}><h4>{allmessages[0].vmbox.name}</h4></div>
            <div className='voicemail-top-wrap'>
              <div className='voicemails-top'>
                <h1>{allmessages[0].vmbox.newcount}</h1>
                    New
              </div>
              <div className='voicemails-top'>
                <h1>{allmessages[0].vmbox.messages}</h1>
                    Total
              </div>
            </div>
            <div className='checkbox-wrap'>
              <input type='checkbox' />  &#9660;
            </div>
            <div id='voicemail-search'>
              <input className='fax-search-text form-control' type='text' placeholder='Search' onChange={this.onhandleChange}/>
            </div>
            <VoicemailsTable allmessages = {allmessages[0].messages}
                             perPage={this.state.perPage}
                             currentPage={this.state.currentPage}
                             searchKey={this.state.searchKey}
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
}

const mapStateToProps = state => state.vmreducer
const mapDispatchToProps = (dispatch) => ({
  getallvmboxes: () => dispatch(getallvmboxes())
})

export default connect(mapStateToProps, mapDispatchToProps)(Voicemails)
