'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux';
import Cam                from './Cam';

class Stage extends Component {
  render() { return (
    <Cam />
  )}
}

function mapStateToProps(state) {
  return {
    scene: state.scene,
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stage);
