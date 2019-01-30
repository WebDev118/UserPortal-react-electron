import React from 'react'
import DatePicker from "react-datepicker";
import i18n from '../Common/i18n';
export class HistorySearch extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }
  onChange = (e) => {
    this.props.changeFilter((e.target.value).trim());
  }
  render () {
    let lng = this.props.lng
    return (
      <div className='history-search'>
        <div className='history-search mt-5'>
          <div className="row text-left">
            <div className="col-sm-3 col-md-1 date-margin">
              <label htmlFor='start-date'>{i18n.t('state_date.label', { lng })}</label>
              <DatePicker className="calendar1 form-control"
                onChange={this.props.startDateChange}
                maxDate={this.props.state.endDate}
                selected={this.props.state.startDate}
                placeholderText="mm/dd/yyyy"
              />
            </div>
            <div className="col-sm-3 col-md-1 date-margin">
              <label htmlFor='end-date' className="mb-2">{i18n.t('end_date.label', { lng })}</label>
              <div className="endtime-align">
                <DatePicker className="calendar1 form-control"
                  onChange={this.props.endDateChange}
                  selected={this.props.state.endDate}
                  minDate={this.props.state.startDate}
                  maxDate={new Date()}
                  placeholderText="mm/dd/yyyy"
                />
              </div>

            </div>
            <div className="col-sm-2 col-md-1 date-margin">
              <button className="btn btn-outline-secondary" onClick={this.props.apply}>{i18n.t('apply.label', { lng })}</button>
            </div>
            <div className="text-right">
              <input className='call-search-text form-control' type='text' placeholder={i18n.t('search.label', { lng })} onChange={this.onChange}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
