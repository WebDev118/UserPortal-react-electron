import React from 'react';
import { connect } from 'react-redux';
import Topbar from '../Common/Topbar';
import VoicemailsTable from './VoicemailsTable';
import './Voicemails.css';
import { getallvmboxes } from '../../Actions/voicemails.action';
import VoicemailBox from './VoicemailBox';
import i18n from '../Common/i18n';
class Voicemails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allmessages: '',
      new : 0,
      total: 0,
      view: 0,
      perPage: 10,
      currentPage: 0,
      searchKey:"",
      user_name: ""
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
    !this.props.vmreducer.loading ? this.props.getallvmboxes() : null;
  }

  componentDidUpdate(preProps) {
    const {allmessages} = this.props.vmreducer;
    if(allmessages !== preProps.vmreducer.allmessages) {
      let voicemails = allmessages.allmessages;
      this.setState({user_name: allmessages.full_name, allmessages: voicemails});
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
    let {lng} = this.props.language;
    let {systemmessage} = this.props.systemmessage;
    if(systemmessage === 'Authentication failed.'){
      window.location.reload();
    }
    if(!this.state.allmessages) {
      return (
        <div className='main'>
          { this.props.vmreducer.loading &&
            <div className="loader_container">
              <div className="loader"></div>
            </div>
          }
          <Topbar title={i18n.t('voicemails.label', { lng })} user_name={this.state.user_name} />
        </div>
      )
    }
    if(this.state.allmessages && this.state.allmessages.length > 1) {
      return (
        <div className='main'>
          { this.props.vmreducer.loading &&
            <div className="loader_container">
              <div className="loader"></div>
            </div>
          }
          <Topbar title={i18n.t('voicemails.label', { lng })}  user_name={this.state.user_name}/>
          <VoicemailBox allmessages = {this.state.allmessages} history={this.props.history} lng={this.props.language.lng}/>
        </div>
      )
    } else {
      return (
        <div className='main'>
          { this.props.vmreducer.loading &&
            <div className="loader_container">
              <div className="loader"></div>
            </div>
          }
          <Topbar title={i18n.t('voicemails.label', { lng })}  user_name={this.state.user_name}/>
          <div>
            <div style={{textAlign:"left"}}><h4>{this.state.allmessages[0].vmbox.name}</h4></div>
            <div className='voicemail-top-wrap'>
              <div className='voicemails-top'>
                <h1>{this.state.allmessages[0].vmbox.newcount}</h1>
                {i18n.t('news.label', { lng })}
              </div>
              <div className='voicemails-top'>
                <h1>{this.state.allmessages[0].vmbox.messages}</h1>
                {i18n.t('total.label', { lng })}
              </div>
            </div>
            <div className='checkbox-wrap'>
              <input type='checkbox' />  &#9660;
            </div>
            <div id='voicemail-search'>
              <input className='fax-search-text form-control' type='text' placeholder='Search' onChange={this.onhandleChange}/>
            </div>
            <VoicemailsTable
              allmessages = {this.state.allmessages[0].messages}
              perPage={this.state.perPage}
              currentPage={this.state.currentPage}
              searchKey={this.state.searchKey}
            />
            { this.state.view === 0 ? (
            <nav className='bottom-nav'>
              <label>view</label>
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

const mapStateToProps = state => ({vmreducer:state.vmreducer, language: state.language, systemmessage: state.systemmessage})
const mapDispatchToProps = (dispatch) => ({
  getallvmboxes: () => dispatch(getallvmboxes())
})

export default connect(mapStateToProps, mapDispatchToProps)(Voicemails)
