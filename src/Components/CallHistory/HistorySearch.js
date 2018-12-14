import React from 'react'

export class HistorySearch extends React.Component {
  render () {
    return (
      <div className='history-search'>
        <div>
          <label htmlFor='start-date'>Start Date</label>
          <input id='start-date' className='calendar' type='text' />
        </div>
        <div>
          <label htmlFor='end-date'>End Date</label>
          <input id='end-date' className='calendar' type='text' />
        </div>
        <div>
          <button>Filter</button>
        </div>
        <div>
          <input id='history-search' type='text' placeholder='Search' />
        </div>
      </div>
    )
  }
}
