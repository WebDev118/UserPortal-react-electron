import React from 'react'
import { connect } from 'react-redux';
import Topbar from '../Common/Topbar';
import { getCallFlow } from '../../Actions/callhistory.action';
import { HistorySearch } from './HistorySearch';
import { HistoryTable } from './HistoryTable';
import i18n from '../Common/i18n';

import './History.css'
class History extends React.Component {
  constructor(props) {
    super(props);

    this.startDateChange = this.startDateChange.bind(this);
    this.endDateChange = this.endDateChange.bind(this);
    this.changeFilter = this.changeFilter.bind(this);
    this.apply = this.apply.bind(this);
    this.selectPerPage = this.selectPerPage.bind(this);
    this.setCountLabel = this.setCountLabel.bind(this);

    this.prev = this.prev.bind(this);
    this.next = this.next.bind(this);

    var tmp = new Date();
    tmp.setDate(tmp.getDate() - 6);

    this.state = {
      startDate: tmp,
      endDate: new Date(),
      filter: '',
      call_list: [],
      perPage: 10,
      currentPage: 0,
      call_flow:'',
      total: 0,
      user_name: ''
    };
  }

  componentDidMount () {
    !this.props.loading ? this.props.getCallFlow(this.state.startDate, this.state.endDate) : null;
  }

  componentWillMount() {
    this.props.getCallFlow(this.state.startDate, this.state.endDate);
  }
  componentDidUpdate(preProps) {
    let {call_flow}  = this.props.callreducer;
    if(call_flow !== preProps.callreducer.call_flow) {

      let call_data = call_flow.call_data;
      if (call_data.length > 0) {
        let total = call_data.length;
        this.setState({call_flow: call_data, total: total})
      }
      this.setState({user_name: call_flow.full_name})
    }
  }
  startDateChange = (date) => {
    this.setState({
      startDate: date,
    });
  }

  endDateChange = (date) => {
    this.setState({
      endDate: date,
    });
  }

  changeFilter = (data) => {
    this.setState({
      filter: data,
    });
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

  apply = () => {
    this.props.getCallFlow(this.state.startDate, this.state.endDate);
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


  render () {
    let {lng} = this.props.language
    return (
      <div className='main'>
       { this.props.callreducer.loading &&
          <div className="loader_container">
            <div className="loader"></div>
          </div>
        }
        <Topbar title={i18n.t('callhistory.label', { lng })} user_name={this.state.user_name}/>
        <div className='history'>
          <HistorySearch
            startDateChange={this.startDateChange}
            endDateChange={this.endDateChange}
            changeFilter={this.changeFilter}
            apply={this.apply}
            state={this.state}
            lng={lng}
          />
          <HistoryTable
            list={this.state.call_flow}
            perPage={this.state.perPage}
            currentPage={this.state.currentPage}
            filter={this.state.filter}
            lng={lng}
          />
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
              <button onClick={this.prev} className="button-enable" >&#60;</button>
            )}
            { ((this.state.currentPage + 1)* this.state.perPage >= this.state.total) ? (
              <button onClick={this.next} className="button-disable" disabled>&#62;</button>
            ) : (
              <button onClick={this.next} className="button-enable">&#62;</button>
            )}
          </nav>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({callreducer:state.callreducer, language: state.language});
const mapDispatchToProps = (dispatch) => ({
  getCallFlow: (startDate, endDate) => dispatch(getCallFlow(startDate, endDate))
})
export default connect(mapStateToProps, mapDispatchToProps)(History)
