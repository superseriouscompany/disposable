'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import {
  TouchableOpacity,
  Text,
  View,
} from 'react-native'

class Albums extends Component {
  render() {
    const {props} = this

    return (
      <View>
        <TouchableOpacity onPress={props.newAlbum}>
          <Text>+ New Album</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => props.viewAlbum('everyone')}>
          <Text>Everyone</Text>
        </TouchableOpacity>
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Albums)
