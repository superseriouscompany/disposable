'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux';
import {
  PanResponder,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native'

class Winder extends Component {
  constructor(props) {
    super(props)
    this.state = {
      wind: 0,
    }

    this.wind = this.wind.bind(this)
  }

  wind(amount) {
    const wind = this.state.wind + amount

    if( this.state.wind < 10000 ) {
      this.setState({
        wind: this.state.wind + amount,
      })
    } else {
      this.props.wind()
    }
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
      },

      onPanResponderMove: (evt, gestureState) => {
        // only count left movement
        if( gestureState.vx > 0 ) { return }

        this.wind(gestureState.x0 - gestureState.moveX)
      },

      onPanResponderTerminationRequest: (evt, gestureState) => true,

      onPanResponderRelease: (evt, gestureState) => {
        console.warn('released')
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
      },
      onPanResponderTerminate: (evt, gestureState) => {
        console.warn('terminated')
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        return true;
      },
    })
  }

  render() { return (
    <View style={style.container}>
      <View style={style.wheel} {...this._panResponder.panHandlers}>
        <Text style={[style.gear, {
          transform: [
            { rotate: `${(this.state.wind / 10) % 360}deg` }
          ]
        }]}>⚙</Text>
      </View>

      <Text style={style.count}>{this.props.photosRemaining}</Text>
      <Text style={style.count}>{this.state.wind}</Text>
    </View>
  )}
}

function mapStateToProps(state) {
  return {
    photosRemaining: state.camera.remaining,
    wound:           state.camera.wound,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    wind:() => {
      dispatch({type: 'camera:wind'})
    }
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  wheel: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },

  gear: {
    fontSize: 90,
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Winder);
