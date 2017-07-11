'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux';
import Cam                from './Cam';
import Login              from './Login';
import {View}             from 'react-native'

class Stage extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        { !this.props.session ?
          <Login />
        :
          <Cam />
        }
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    scene:   state.scene.name,
    session: state.session,
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stage);
