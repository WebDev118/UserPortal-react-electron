import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'

export default function authenticate(Component) {

  class AuthenticatedComponent extends React.Component {

    componentWillMount() {
      this.checkAuth();
    }

    checkAuth() {
      if ( ! this.props.auth_token) {
        const location = this.props.location;
        const redirect = location.pathname + location.search;
        this.props.history.push('/');
      }
    }

    render() {
      return this.props.auth_token
        ? <Component { ...this.props } />
        : null;
    }
  }

  const mapStateToProps = state => state.auth

  return withRouter(connect(mapStateToProps)(AuthenticatedComponent));
}