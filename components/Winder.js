'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux';
import {
  TouchableOpacity,
  Text,
  View,
} from 'react-native'

class Winder extends Component {
  constructor(props) {
    super(props)
    this.state = {
      winding: false,
    }

    this.wind = this.wind.bind(this)
  }

  wind() {
    this.setState({
      winding: true,
    })

    setTimeout(() => {
      this.setState({
        winding: false
      })
      this.props.wind()
    }, 1000)
  }

  render() { return (
    <TouchableOpacity onPress={this.wind}>
      <Text>
        { this.state.winding ?
          'Winding...'
        :
          `Wind (${this.props.photosRemaining})`
        }
      </Text>
    </TouchableOpacity>

  )}
}

function mapStateToProps(state) {
  return {
    photosRemaining: state.camera.remaining,
    wound:           state.camera.wound,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    wind:() => {
      dispatch({type: 'camera:wind'})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Winder);
