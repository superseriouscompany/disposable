'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import {
  Text
} from 'react-native'

class Albums extends Component {
  render() { return (
    <Text>nope</Text>
  )}
}

function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Albums)
