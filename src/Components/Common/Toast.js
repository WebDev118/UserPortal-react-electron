import React from 'react'
import { connect } from 'react-redux'
import * as CONSTS from '../../Constants'
import './Toast.css'

class Toast extends React.Component {
    
    state = {
        isShow: false
    }

    componentDidUpdate(preProps, preState) {
        const { systemmessage, msguuid} = this.props
        
        if(msguuid != preProps.msguuid) {
            systemmessage ? this.setState({isShow: true}) : ''
            setTimeout(() => {
                this.setState({isShow: false})
            }, 3000)
        }
    }

    render() {
        let { isShow } = this.state
        return (
            <div id="snackbar" className={isShow ? "show" : ""}>{this.props.systemmessage}</div>
        )
    }
}

const mapStateToProps = state => state.systemmessage

export default connect(mapStateToProps)(Toast)