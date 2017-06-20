'use strict'

import React, {Component} from 'react'
import Camera             from 'react-native-camera'
import {connect}          from 'react-redux'
import {add}              from '../actions/outbox'
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

  upload(imageUri) {
    return new Promise((resolve, reject) => {
      var body = new FormData();
      body.append('photo', {uri: imageUri, name: 'photo.jpg', type: 'image/jpeg'});

      var xhr = new XMLHttpRequest;
      xhr.onreadystatechange = (e) => {
        if( xhr.readyState !== 4 ) { return; }

        if( xhr.status < 299 ) {
          console.warn(xhr.responseText)
          const json = JSON.parse(xhr.responseText);
          return resolve(json)
        } else {
          reject(xhr.status + ': ' + xhr.responseText);
        }
      }
      xhr.open('POST', `${baseUrl}/photos`);
      xhr.send(body);
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
          captureTarget={Camera.constants.CaptureTarget.disk} />
        <TouchableOpacity style={style.hello} onPress={this.takePicture}>
          <Text>take photo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={style.flip} onPress={this.flip}>
          <Text>Flip Camera</Text>
        </TouchableOpacity>

        <TouchableOpacity style={style.flash} onPress={this.toggleFlash}>
          <Text>Toggle Flash</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return state.hello
}

function mapDispatchToProps(dispatch) {
  return {
    addPhoto:(photoUri) => {
      dispatch(add(photoUri))
    }
  }
}

const {width, height} = Dimensions.get('window')

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
    height: height / 10,
    aspectRatio: width/height,
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Cam)
