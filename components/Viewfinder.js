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

class Viewfinder extends Component {
  constructor(props) {
    super(props)
    this.takePicture = this.takePicture.bind(this)
    this.flip        = this.flip.bind(this)
    this.toggleFlash = this.toggleFlash.bind(this)

    this.state = {
      cameraType: Camera.constants.Type.back,
      flashMode:  Camera.constants.FlashMode.off,
    }
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
      <View style={{flex: 1}}>
        <Camera style={style.photoWindow}
          flashMode={this.state.flashMode}
          type={this.state.cameraType}
          ref={(cam) => { this.camera = cam }}
          aspect={Camera.constants.Aspect.fill}
          orientation={Camera.constants.Orientation.landscapeLeft}
          captureTarget={Camera.constants.CaptureTarget.disk} />

        <View style={style.hintCnr}>
          <Text style={style.hint}>
            Tap anywhere to take the picture
          </Text>
        </View>

        <TouchableOpacity style={style.overlay} onPress={this.takePicture} />

        <TouchableOpacity style={[style.buttonCnr, style.flip]} onPress={this.flip}>
          <Text style={style.button}>🔄</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[style.buttonCnr, style.flash]} onPress={this.toggleFlash}>
          <Text style={style.button}>
            { this.state.flashMode === Camera.constants.FlashMode.off ? '📷' : '📸'}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    addPhoto:(photoUri) => {
      dispatch(add(photoUri))
      dispatch({type: 'camera:snap'})
    },
  }
}

const {width, height} = Dimensions.get('window')

const style = StyleSheet.create({
  photoWindow: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: 'transparent',
    width: '100%',
    height: '100%',
  },
  buttonCnr: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 10,
    justifyContent:  'center',
    alignItems:      'center',
    position: 'absolute',
    bottom: 30,
    borderRadius: 10,
  },
  button: {
    fontSize: 30,
  },
  flip: {
    left: 30,
  },
  flash: {
    right: 30,
  },
  hintCnr: {
    position: 'absolute',
    top: 30,
    width: '100%',
    alignItems: 'center',
  },
  hint: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: 'white',
    textAlign: 'center',
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Viewfinder)
