'use strict'

import React, {Component}    from 'react'
import {connect}             from 'react-redux'
import {NetInfo}             from 'react-native'
import {uploadPhoto}         from '../actions/photo'
import {remove, markFailure} from '../actions/outbox'
import {
  Text,
  View,
} from 'react-native'

class OfflineProvider extends Component {
  constructor(props) {
    super(props)
    this.handleConnectionChange = this.handleConnectionChange.bind(this)
    this.processQueue = this.processQueue.bind(this)
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener('change', this.handleConnectionChange);
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('change', this.handleConnectionChange);
  }

  componentWillReceiveProps(props) {
    if( props.queue.length > this.props.queue.length ) {
      this.processQueue(props.queue)
    }
  }

  processQueue(queue) {
    queue.forEach((photo) => {
      this.props.upload(photo).then((ok) => {
        this.props.remove(photo.id)
      }).catch((err) => {
        console.warn('Photo failed to upload', err)
        this.props.markFailure(photo.id)
      })
    })
  }

  handleConnectionChange(connected) {
    if( !connected ) { return console.warn('disconnected from the internet') }

    if( !this.props.queue.length ) { return }

    console.warn('Connected to the internet, processing queue of', this.props.queue.length)
    return this.processQueue(this.props.queue)
  }

  render() { return null }
}

function mapDispatchToProps(dispatch) {
  return {
    upload: (photo) => {
      return dispatch(uploadPhoto('everyone', photo))
    },

    markFailure: (id) => {
      return dispatch(markFailure(id))
    },

    remove: (id) => {
      return dispatch(remove(id))
    },

    dispatch: dispatch,
  }
}

function mapStateToProps(state) {
  return {
    queue: state.outbox.queue,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OfflineProvider)
