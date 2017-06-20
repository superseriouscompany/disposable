'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import {NetInfo}          from 'react-native'
import {
  Text,
  View,
} from 'react-native'

class OfflineProvider extends Component {
  constructor(props) {
    super(props)
    this.handleConnectionChange = this.handleConnectionChange.bind(this)
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener('change', this.handleConnectionChange);
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('change', this.handleConnectionChange);
  }

  componentWillReceiveProps(props) {
    if( props.queue.length > this.props.queue.length ) {
      console.warn('outbox grew')
    }
  }

  handleConnectionChange(connected) {
    if( !connected ) { return console.warn('disconnected from the internet') }
    if( connected ) { return console.warn('connected to the internet') }
  }

  render() { return null }
}

function mapStateToProps(state) {
  return {
    queue: state.outbox.queue,
  }
}

export default connect(mapStateToProps)(OfflineProvider)
