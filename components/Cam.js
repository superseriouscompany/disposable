'use strict'

import React, {Component} from 'react'
import Camera             from 'react-native-camera'
import {connect}          from 'react-redux'
import {add}              from '../actions/outbox'
import DeviceInfo         from 'react-native-device-info'
import {
  Dimensions,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
} from 'react-native'

const baseUrl = 'https://disposable.superserious.co'

class Cam extends Component {
  constructor(props) {
    super(props)
    this.takePicture = this.takePicture.bind(this)
    this.flip        = this.flip.bind(this)
    this.toggleFlash = this.toggleFlash.bind(this)
    this.wind        = this.wind.bind(this)

    this.state = {
      cameraType: Camera.constants.Type.back,
      flashMode:  Camera.constants.FlashMode.off,
    }
  }

  wind() {
    this.setState({
      winding: true,
    })

    setTimeout(() => {
      this.setState({
        winding: false
      })
      this.props.wind()
    }, 1000)
  }

  flip() {
    this.setState({
      cameraType: this.state.cameraType === Camera.constants.Type.back ?
        Camera.constants.Type.front :
        Camera.constants.Type.back
    })
  }

  toggleFlash() {
    this.setState({
      flashMode: this.state.flashMode === Camera.constants.FlashMode.off ?
        Camera.constants.FlashMode.on :
        Camera.constants.FlashMode.off
    })
  }

  takePicture() {
    console.warn('Taking picture...')
    this.camera.capture({metadata: {}}).then((data) => {
      return this.props.addPhoto(data.path)
    }).catch((err) => {
      console.error(err)
      alert(err.message)
    })
  }

  render() {
    return (
      <View style={style.container}>
        <Camera style={style.photoWindow}
          flashMode={this.state.flashMode}
          type={this.state.cameraType}
          ref={(cam) => { this.camera = cam }}
          aspect={Camera.constants.Aspect.fill}
          orientation={Camera.constants.Orientation.landscapeLeft}
          captureTarget={Camera.constants.CaptureTarget.temp} />

        <View style={style.buttonCnr}>
          { this.props.wound ?
            <TouchableOpacity style={style.button} onPress={this.takePicture}>
              <Text>🛑</Text>
            </TouchableOpacity>
          :
            <TouchableOpacity style={style.wind} onPress={this.wind}>
              <Text>
                { this.state.winding ?
                  'Winding...'
                :
                  `Wind (${this.props.photosRemaining})`
                }
              </Text>
            </TouchableOpacity>
          }
        </View>

        <TouchableOpacity style={style.flip} onPress={this.flip}>
          <Text>🔄</Text>
        </TouchableOpacity>

        <TouchableOpacity style={style.flash} onPress={this.toggleFlash}>
          <Text>
            { this.state.flashMode === Camera.constants.FlashMode.off ? '📷' : '📸'}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    photosRemaining: state.camera.remaining,
    wound:           state.camera.wound,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addPhoto:(photoUri) => {
      dispatch(add(photoUri))
      dispatch({type: 'camera:snap'})
    },

    wind:() => {
      dispatch({type: 'camera:wind'})
    }
  }
}

const {width, height} = Dimensions.get('window')

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
  },
  buttonCnr: {
    position: 'absolute',
    right: 20,
    top: 20,
    alignItems: 'center',
  },
  photoWindow: {
    marginTop: 20,
    height: height / 10,
    aspectRatio: width/height,
  },
  flip: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Cam)
