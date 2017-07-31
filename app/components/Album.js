'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import {loadAlbum}        from '../actions/album'
import BackButton         from './BackButton'
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native'

const {width, height} = Dimensions.get('window')

class Album extends Component {
  componentDidMount() {
    this.props.loadAlbum(this.props.albumName)
  }

  render() {
    const {props} = this

    return (
      <View style={{flex: 1}}>
        <BackButton />
        { props.loading ?
          <ActivityIndicator />
        : props.err ?
          <Text>{props.err}</Text>
        : props.photos && props.photos.length ?
          <ScrollView style={{flex: 1, backgroundColor: 'hotpink'}}>
            { props.photos.map((p, key) => (
              <Image key={key} source={{uri: p.url}} style={{height: height, width: width}}/>
            ))}
          </ScrollView>
        : props.photos ?
          <Text>No photos available.</Text>
        :
          null
        }
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    loading:   state.album.loading,
    photos:    state.album.photos,
    err:       state.album.err,
    albumName: state.album.name || 'everyone',
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadAlbum: (albumName) => {
      dispatch(loadAlbum(albumName))
    },

    back: () => {
      dispatch({type: 'scene:change', scene: 'Albums'})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Album)
