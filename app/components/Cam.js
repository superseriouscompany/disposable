'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import Winder             from './Winder';
import Viewfinder         from './Viewfinder';
import Album              from './Album'
import {
  View,
} from 'react-native'

class Cam extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        { !this.props.photosRemaining || true ?
          <Album />
        : !this.props.wound ?
          <Winder />
        :
          <Viewfinder />
        }
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    wound:           state.camera.wound,
    photosRemaining: state.camera.remaining,
  }
}

export default connect(mapStateToProps)(Cam)
