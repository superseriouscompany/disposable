'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import WinderView         from '../views/WinderView'
import {
  PanResponder,
} from 'react-native'

const THRESH = 1000

class Winder extends Component {
  constructor(props) {
    super(props)
    this.state = {
      wind: 0,
      activated: false,
    }

    this.wind  = this.wind.bind(this)
  }

  wind(amount) {
    const wind = this.state.wind + amount

    if( this.state.wind < THRESH ) {
      this.setState({
        wind: this.state.wind + amount,
        activated: true,
      })
    } else {
      this.props.wind()
    }
  }

  componentWillMount() {
    var lastX;

    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        lastX = null
      },

      onPanResponderMove: (evt, gestureState) => {
        // only wind on left movement
        if( gestureState.vx < 0 ) {
          this.wind((lastX || gestureState.x0) - gestureState.moveX)
        }
        lastX = gestureState.moveX
      },

      onPanResponderTerminationRequest: (evt, gestureState) => true,

      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
      },
      onPanResponderTerminate: (evt, gestureState) => {
        console.warn('gesture terminated')
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        return true;
      },
    })
  }

  render() {
    const {props} = this

    return (
      <WinderView {...this.props} {...this.state} thresh={THRESH} panResponder={this._panResponder}/>
    )
  }
}

function mapStateToProps(state) {
  return {
    photosRemaining: state.camera.remaining,
    totalPhotos:     state.camera.total,
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

export default connect(mapStateToProps, mapDispatchToProps)(Winder);
