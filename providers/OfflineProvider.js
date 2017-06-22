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
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener('change', this.handleConnectionChange);
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('change', this.handleConnectionChange);
  }

  componentWillReceiveProps(props) {
    if( props.queue.length > this.props.queue.length ) {
      this.props.dispatch({type: 'outbox:clear'})

      return
      props.queue.forEach((photo) => {
        this.props.upload().then((ok) => {
          console.warn('photo uploaded. removing.')
          this.props.remove(photo.id)
        }).catch((err) => {
          console.warn('photo failed to upload', err)
          this.props.markFailure(photo.id)
        })
      })
    }
  }

  handleConnectionChange(connected) {
    if( !connected ) { return console.warn('disconnected from the internet') }
    if( connected ) { return console.warn('connected to the internet') }
  }

  render() { return null }
}

function mapDispatchToProps(dispatch) {
  return {
    upload: (uri) => {
      return dispatch(uploadPhoto({uri}))
    },

    markFailure: (id) => {
      return dispatch(markFailure(id))
    },

    remove: (id) => {
      return dispatch(remove(id))
    },
  }
}

function mapStateToProps(state) {
  return {
    queue: state.outbox.queue,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OfflineProvider)
