import React from 'react'
import DatePicker from "react-datepicker";
export class HistorySearch extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange = (e) => {
    this.props.changeFilter((e.target.value).trim());
  }

  render () {
    return (
      <div className='history-search'>
        <div >
          <label htmlFor='start-date'>START DATE</label>
          <DatePicker className="form-control calendar1"
            onChange={this.props.startDateChange}
            maxDate={this.props.state.endDate}
            selected={this.props.state.startDate}
          />
        </div>
        <div className="ml-3">
          <label htmlFor='end-date'>END DATE</label>
          <DatePicker className="form-control calendar1"
            onChange={this.props.endDateChange}
            selected={this.props.state.endDate}
            minDate={this.props.state.startDate}
            maxDate={new Date()}
          />
        </div>
        <div className="ml-3">
          <label />
          <button onClick={this.props.apply}>Apply</button>
        </div>
        <div>
          <div>
            <label />
            <button onClick={this.props.listView}><i className="fas fa-list fa-lg" /></button>
            <button><i className="far fa-chart-bar fa-lg"></i></button>
          </div>
          <div>
            <label />
            <input
              id="history-search"
              className="form-control"
              type="text"
              placeholder="Search"
              onChange={this.onChange}
            />
          </div>
        </div>
      </div>
    )
  }
}
