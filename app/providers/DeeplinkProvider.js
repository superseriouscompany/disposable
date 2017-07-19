'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import {Linking}          from 'react-native'

class DeeplinkProvider extends Component {
  componentDidMount() {
    Linking.addEventListener('url', this.handleOpenURL)
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL)
  }

  handleOpenURL(e) {
    alert(e.url)
  }

  render() { return null }
}

function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeeplinkProvider)
