'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native'

class BackButton extends Component {

  render() {
    const {props} = this
    return (
      <TouchableOpacity onPress={props.back} style={style.back}>
        <Text style={style.backText}>
          &larr;
        </Text>
      </TouchableOpacity>
    )
  }
}

function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {
    back: () => {
      dispatch({type: 'scene:change', scene: 'Albums'})
    }
  }
}

const style = StyleSheet.create({
  back: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 5,
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
  backText: {
    color: 'white',
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(BackButton)
