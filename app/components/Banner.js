'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

const HEIGHT = 40

class Banner extends Component {
  constructor(props) {
    super(props)
    this.state = {
      anim: new Animated.Value(0)
    }
    this.dismiss = this.dismiss.bind(this)
  }

  dismiss() {
    Animated.timing(this.state.anim, {
      toValue: 0, duration: 250,
    }).start()
  }

  componentDidMount() {
    Animated.timing(this.state.anim, {
      toValue: 1, duration: 250,
    }).start()

    setTimeout(this.dismiss, 3000)
  }

  render() {
    const {props} = this
    return this.state.hidden || !props.text ? null : (
      <TouchableOpacity style={[style.banner, {
        transform: [{
          translateY: this.state.anim.interpolate({
            inputRange:  [0, 1],
            outputRange: [-HEIGHT, 0],
          })
        }]
      }]} onPress={this.dismiss}>
        <Text style={style.text}>{props.text}</Text>
      </TouchableOpacity>
    )
  }
}

function mapStateToProps(state) {
  var failedPhotos = state.outbox.queue.filter((i) => {
    return !!i.failureCount
  }).length

  failedPhotos = 5

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
    height: HEIGHT,
    backgroundColor: '#999',
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    color: 'white',
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Banner);
