'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import DevPanel           from './DevPanel'
import {
  TouchableOpacity,
  Text,
  View,
} from 'react-native'

class Albums extends Component {
  render() {
    const {props} = this

    return (
      <View style={{flex: 1}}>
        <TouchableOpacity onPress={props.newAlbum}>
          <Text>+ New Album</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => props.viewAlbum('yep')}>
          <Text>Yep</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => props.viewAlbum('everyone')}>
          <Text>Everyone</Text>
        </TouchableOpacity>

        <DevPanel />
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {
    viewAlbum: (albumName) => {
      dispatch({type: 'album:load', name: albumName})
      dispatch({type: 'scene:change', scene: 'Album'})
    },

    newAlbum: () => {
      dispatch({type: 'scene:change', scene: 'NewAlbum'})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Albums)
