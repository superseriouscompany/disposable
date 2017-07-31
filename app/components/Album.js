'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import {loadAlbum}        from '../actions/album'
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Text,
  ScrollView,
  View,
} from 'react-native'

const {width, height} = Dimensions.get('window')

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
