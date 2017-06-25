'use strict'

import React, {Component} from 'react'
import {
  Animated,
  StyleSheet,
  Text,
} from 'react-native'

export default class SwipeHint extends Component {
  constructor(props) {
    super(props)
    this.state = {
      anim: new Animated.Value(0),
    }

    this.pulse = this.pulse.bind(this)
  }

  componentDidMount() {
    this.pulse()
  }

  pulse() {
    if( this.props.hidden ) { return }
    this.state.anim.setValue(0)
    Animated.timing(this.state.anim, {
      toValue:  1, duration: 2000,
    }).start(() => {
      setTimeout(this.pulse, 500)
    })
  }

  render() {
    const {props} = this

    return (
      <Animated.Text style={[props.style, {
        transform: [{
          translateX: this.state.anim.interpolate({
            inputRange:  [0, 1],
            outputRange: [30, -100],
          }),
        }],
        opacity: this.state.anim.interpolate({
          inputRange:  [0, 0.8, 1],
          outputRange: [1, 1, 0],
        }),
        color: '#ffc50c',
      }]}>
        { props.hidden ? null : 'swipe left to wind' }
      </Animated.Text>
    )
  }
}
