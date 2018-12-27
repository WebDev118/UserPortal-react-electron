import React from 'react'
import axios from 'axios'
import './TimeWeather.css'

export class TimeWeather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: "",
      temperature: undefined,
      pressure: undefined,
      humidity: undefined,
      description: undefined,
      rain:undefined,
      icon:undefined,
    };
    this.getCurrentTime();
    this.getWeather();
  }
  getWeather = () => {
    let API_KEY = "4c071ffecc48accd95567e6d8c2d20a3";
    const city = "Los Angeles,US";
    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
    .then((res) => {
      console.log(res.data);
      let data = res.data;
      this.setState({
        temperature: data.main.temp,
        icon: data.weather[0].icon,
        rain: data.rain,
        pressure: data.main.pressure,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ""
      });
    });
  }

  getCurrentTime = () => {
    var myDate = new Date();
    let daysList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let monthsList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let date = myDate.getDate();
    let month = monthsList[myDate.getMonth()];
    let day = daysList[myDate.getDay()];
    let hours = myDate.getHours();
    let minutes = myDate.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    let strTime = hours + ':' + minutes;
    let currentTime = {month:month, day:day,date:date, time:strTime,ampm:ampm}
    this.setState({currentTime:currentTime});
    setTimeout(this.getCurrentTime, 1000);
  }
  render (){
    return (
      <div id='time-weather' className="common-box">
        <div>
          <div id='long-date'>
            <h2>{this.state.currentTime.day}</h2><br/>
            <h6>{this.state.currentTime.month +" " + this.state.currentTime.date}</h6>
          </div>
          <div className='center'>
          <img src ={`http://openweathermap.org/img/w/${this.state.icon}.png`} alt="wthr img" />
            <br />
            <div>
              <h2>{this.state.currentTime.time}<span id='am-pm'>{this.state.currentTime.ampm}</span></h2>
            </div>
          </div>
          <div className='city'><h6>{this.props.userdata.timezone}</h6></div>
          <div className='temperature'>{this.state.temperature}&deg;</div>
        </div>
      </div>
    )
  }
}
