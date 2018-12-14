import React from 'react'
import { NavLink } from 'react-router-dom'
import './Sidebar.css'

export class SidebarLink extends React.Component {
  constructor () {
    super()
    this.state = { clicked: false, hover: false }
  }

  handleHover (e) {
    // this.setState({clicked: !this.state.hover});
  }

  handleClick (e) {
    console.log(e)
    if (this.state.clicked === true) {
      this.setState({ clicked: false })
    } else {
      this.setState({ clicked: true })
      this.props.handleClick();
    }
    this.setState({ clicked: !this.state.clicked })
  }

  render () {
    return (
      <div className='Sidebar-active'>
        <NavLink exact to={this.props.route} activeClassName='Sidebar-active'>
          <div className='Sidebar-Link'>
            <img src={this.props.img} />
            {this.props.title}
          </div>
        </NavLink>
      </div>
    )
  }

  // if (this.state.clicked === true) {
  // 	() => this.props.handleClick();
  // 		return(
  // 			<div className="Sidebar-Link Sidebar-clicked" onClick={() => this.handleClick()} onMouseOver={this.handleHover.bind(this)} onMouseOut={this.handleHover.bind(this)}>
  // 	      <img src={this.props.image} />
  // 	      {this.props.title}
  // 	    </div>
  //   	);
  //   } else {
  // 		return(
  // 			<div className="Sidebar-Link" onClick={() => this.handleClick()} onMouseOver={this.handleHover.bind(this)} onMouseOut={this.handleHover.bind(this)}>
  // 	      <img src={this.props.image} />
  // 	      {this.props.title}
  // 	    </div>
  //   	);
  // 	}
}
