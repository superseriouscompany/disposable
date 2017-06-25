'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

class Banner extends Component {
  constructor(props) {
    super(props)
    this.state   = {}
    this.dismiss = this.dismiss.bind(this)
  }

  dismiss() {
    this.setState({
      hidden: true,
    })
  }

  componentDidMount() {
    setTimeout(this.dismiss, 3000)
  }

  render() {
    const {props} = this
    return this.state.hidden || !props.text ? null : (
      <TouchableOpacity style={style.banner} onPress={this.dismiss}>
        <Text style={style.text}>{props.text}</Text>
      </TouchableOpacity>
    )
  }
}

function mapStateToProps(state) {
  const failedPhotos = state.outbox.queue.filter((i) => {
    return !!i.failureCount
  }).length

  return {
    text: failedPhotos ? `Waiting for internet to upload ${failedPhotos} photos.` : null,
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

const style = StyleSheet.create({
  banner: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 40,
    backgroundColor: '#999',
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    color: 'white',
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Banner);
