'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import {loadAlbum}        from '../actions/album'
import {
  ActivityIndicator,
  Text,
  View,
} from 'react-native'

class Album extends Component {
  componentDidMount() {
    this.props.loadAlbum()
  }

  render() {
    const {props} = this

    return (
      <View style={{flex: 1}}>
        { props.loading ?
          <ActivityIndicator />
        : props.err ?
          <Text>{props.err}</Text>
        : props.photos && props.photos.length ?
          <View style={{flex: 1}}>
            { props.photos.map((p, key) => (
              <View key={key}>
                <Text>{p.id}</Text>
              </View>
            ))}
          </View>
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
    loading: state.album.loading,
    photos:  state.album.photos,
    err:     state.album.err,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadAlbum: () => {
      dispatch(loadAlbum())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Album)
