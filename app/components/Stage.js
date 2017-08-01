'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import Login              from './Login'
import Winder             from './Winder'
import Viewfinder         from './Viewfinder'
import Album              from './Album'
import Albums             from './Albums'
import NewAlbum           from './NewAlbum'
import {
  View
} from 'react-native'

class Stage extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        { !this.props.hydrated ?
          null
        : !this.props.session ?
          <Login />
        : this.props.scene === 'NewAlbum' ?
          <NewAlbum />
        : this.props.scene === 'Albums' || !this.props.albumName ?
          <Albums />
        : this.props.scene === 'Album' || !this.props.photosRemaining ?
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
    hydrated:        state.hydrated,
    scene:           state.scene.name,
    session:         state.session,
    wound:           state.camera.wound,
    photosRemaining: state.camera.remaining,
    albumName:       state.album.name,
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stage)
