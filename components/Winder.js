'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import Banner             from './Banner'
import {
  PanResponder,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native'

const THRESH = 1000

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

    if( this.state.wind < THRESH ) {
      this.setState({
        wind: this.state.wind + amount,
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
      <View style={{flex: 1}}>
        { !this.props.photosRemaining ?
          <View style={style.spentCnr}>
            <Text style={style.spent}>
              ⏳
            </Text>
            <Text style={{textAlign: 'center'}}>You've used up all your film!{"\n\n"}Check back in 3 days for your photos.</Text>
          </View>
        :
          <View style={style.container} {...this._panResponder.panHandlers}>
            <Banner />
            <Text style={style.hint}>&lt;&lt;&lt; slide wheel left</Text>

            <View style={style.wheel}>
              <Text style={[style.gear, {
                transform: [
                  { rotate: `${(this.state.wind / 10) % 360}deg` }
                ]
              }]}>⚙</Text>
            </View>

            <View style={style.progressCnr}>
              <View style={[style.progress, {
                width: `${Math.min(1, props.photosRemaining / props.totalPhotos) * 100}%`,
              }]}>
                <View style={[style.progress, style.complete, {
                  width: `${Math.min(1, this.state.wind / THRESH) * 100}%`,
                }]} />
              </View>
            </View>

            <Text style={style.count}>{this.props.photosRemaining} Photos Left</Text>

            { __DEV__ ?
              <Text style={style.count}>{this.state.wind}</Text>
            :
              null
            }

          </View>
        }

      </View>
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

  progressCnr: {
    width: '40%',
    height: '5%',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 20,
  },

  progress: {
    backgroundColor: 'black',
    height: '100%',
  },

  complete: {
    backgroundColor: '#ffc50c',
    position: 'absolute',
    left: 0,
    top: 0,
  },

  spent: {
    fontSize: 120,
    textAlign: 'center',
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Winder);
