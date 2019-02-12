import React from 'react';
import { connect } from 'react-redux';
import Topbar from '../Common/Topbar';
import './Voicemails.css';
import { getallvmboxes } from '../../Actions/voicemails.action';
import VoicemailBox from './VoicemailBox';
import i18n from '../Common/i18n';
import VoicemailList from './VoicemailsList';
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
        <div className='voicemails'>
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
        <div className='voicemails'>
          { this.props.vmreducer.loading &&
            <div className="loader_container">
              <div className="loader"></div>
            </div>
          }
          <Topbar title={i18n.t('voicemails.label', { lng })}  user_name={this.state.user_name}/>
          <div className="main-container">
            <VoicemailBox allmessages = {this.state.allmessages} history={this.props.history} lng={this.props.language.lng}/>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          { this.props.vmreducer.loading &&
            <div className="loader_container">
              <div className="loader"></div>
            </div>
          }
          <VoicemailList vmboxID={this.state.allmessages[0].vmbox.id}/>
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
