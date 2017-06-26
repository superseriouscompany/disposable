'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux';
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native'


class Login extends Component {
  constructor(props) {
    super(props)
    this.login = this.login.bind(this)
  }

  login() {
    this.props.login()
  }

  render() { return (
    <TouchableOpacity onPress={this.login}>
      <Text>Hello</Text>
    </TouchableOpacity>
  )}
}

function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {
    login: () => {
      return dispatch({type: 'scene:change', scene: 'Cam'})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
