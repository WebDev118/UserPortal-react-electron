import React from 'react'
import { connect } from 'react-redux';
import { Topbar } from '../Common/Topbar';
import { getCallFlow } from '../../Actions/callhistory.action';
import { HistorySearch } from './HistorySearch';
import { HistoryTable } from './HistoryTable';

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
    };
  }

  componentDidMount () {
    !this.props.loading ? this.props.getCallFlow(this.state.startDate, this.state.endDate) : null;
  }

  componentWillMount() {
    this.props.getCallFlow(this.state.startDate, this.state.endDate);
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
    let { call_flow } = this.props;
    let totalPage = 0;
    let total = 0;
    if (call_flow && call_flow.length) {
      total = call_flow.length;
      totalPage = call_flow.length / this.state.perPage;
    }
    return (
      <div className='main'>
        <Topbar title='Call History' />
        <div className='history ml-3'>
          <HistorySearch
            startDateChange={this.startDateChange}
            endDateChange={this.endDateChange}
            changeFilter={this.changeFilter}
            apply={this.apply}
            state={this.state}
          />
          <HistoryTable
            list={call_flow}
            perPage={this.state.perPage}
            currentPage={this.state.currentPage}
            totalPage={totalPage}
            filter={this.state.filter}
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
            <span id='page-num'>{this.state.perPage * this.state.currentPage + 1}-{this.setCountLabel(total)} of {total}</span>
            { this.state.currentPage === 0 ? (
              <button onClick={this.prev} disabled>&#60;</button>
              ) : (
              <button onClick={this.prev} enable>&#60;</button>
            )}
            { ((this.state.currentPage + 1)* this.state.perPage >= total) ? (
              <button onClick={this.next} disabled>&#62;</button>
            ) : (
              <button onClick={this.next} enable="true">&#62;</button>
            )}
          </nav>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => state.callreducer
const mapDispatchToProps = (dispatch) => ({
  getCallFlow: (startDate, endDate) => dispatch(getCallFlow(startDate, endDate))
})

export default connect(mapStateToProps, mapDispatchToProps)(History)
