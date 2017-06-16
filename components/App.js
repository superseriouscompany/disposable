'use strict'

import React, {Component} from 'react'
import Camera from 'react-native-camera'
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
} from 'react-native'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.takePicture = this.takePicture.bind(this)
  }

  takePicture() {
    console.warn('Taking picture...')
    this.camera.capture({metadata: {}}).then((data) => {
      console.warn(data)
    }).catch((err) => {
      console.error(err)
    })
  }

  render() { return (
    <View style={style.container}>
      <Camera style={style.photoWindow}
        ref={(cam) => { this.camera = cam }}
        aspect={Camera.constants.Aspect.fill}
        captureTarget={Camera.constants.CaptureTarget.temp}
         />
      <TouchableOpacity style={style.hello} onPress={this.takePicture}>
        <Text>take photo</Text>
      </TouchableOpacity>
    </View>
  )}
}

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  hello: {
    padding: 20,
  },
  photoWindow: {
    width: 60,
    height: 60,
  }
})
