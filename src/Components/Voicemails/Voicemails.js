import React from 'react';
import { connect } from 'react-redux';
import { Topbar } from '../Common/Topbar';
import VoicemailsTable from './VoicemailsTable';
import './Voicemails.css';
import { getallvmboxes } from '../../Actions/voicemails.action';
import VoicemailBox from './VoicemailBox';
class Voicemails extends React.Component {

  state = {
    allmessages: [],
    vmboxes: null,
    new : 0,
    total: 0,
    pagecount: 10,
    pagenum: 1
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

  render () {
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
              <input type='text' placeholder='Search' />
            </div>
            <VoicemailsTable allmessages = {allmessages[0].messages}/>
            <nav className='bottom-nav'>
              <select id='view-per-page'>
                <option>View 10 per page</option>
              </select>
              <span id='page-num'>1-10 of 18</span>
              <button>First</button>
              <button>&#60;</button>
              <button>1</button>
              <button>2</button>
              <button>&#62;</button>
              <button>Last</button>
            </nav>
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
