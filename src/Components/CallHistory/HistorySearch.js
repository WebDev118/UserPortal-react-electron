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
        <div className='history-search mt-5'>
          <div className="row text-left">
            <div className="col-2 startdate-col">
              <label htmlFor='start-date'>START DATE</label>
              <DatePicker className="calendar1 form-control"
                onChange={this.props.startDateChange}
                maxDate={this.props.state.endDate}
                selected={this.props.state.startDate}
              />
            </div>
            <div className="col-2 enddate-col">
              <label htmlFor='end-date'>END DATE</label>
              <DatePicker className="calendar1 form-control"
                onChange={this.props.endDateChange}
                selected={this.props.state.endDate}
                minDate={this.props.state.startDate}
                maxDate={new Date()}
              />
            </div>
            <div className="col-md-1">
              <button className="btn btn-outline-secondary" onClick={this.props.apply}>Apply</button>
            </div>
            <div className="text-right">
              <input className='call-search-text form-control' type='text' placeholder='Search' onChange={this.onChange}/>
            </div>
          </div>
        </div>
      </div>

      // <div>
      //   <div>
      //     <label htmlFor='start-date'>START DATE</label>
      //     <DatePicker className="form-control calendar1"
      //       onChange={this.props.startDateChange}
      //       maxDate={this.props.state.endDate}
      //       selected={this.props.state.startDate}
      //     />
      //   </div>
      //   <div className="ml-3">
      //     <label htmlFor='end-date'>END DATE</label>
      //     <DatePicker className="form-control calendar1"
      //       onChange={this.props.endDateChange}
      //       selected={this.props.state.endDate}
      //       minDate={this.props.state.startDate}
      //       maxDate={new Date()}
      //     />
      //   </div>
      //   <div className="ml-3">
      //     <label />
      //     <button onClick={this.props.apply}>Apply</button>
      //   </div>
      //   <div>
      //     <label />
      //     <input
      //       id="history-search"
      //       className="form-control"
      //       type="text"
      //       placeholder="Search"
      //       onChange={this.onChange}
      //     />
      //   </div>
      // </div>
      // </div>
    )
  }
}
