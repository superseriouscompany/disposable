'use strict'

import React, {Component} from 'react'
import {clear}            from '../reducers'
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

export default class DevPanel extends Component {
  constructor(props) {
    super(props)
    this.clearData = this.clearData.bind(this)
  }

  clearData() {
    clear()
  }

  render() { if( !__DEV__ ) return null; return (
    <View style={{position: 'absolute', backgroundColor: 'transparent', bottom: 20, left: 20,}}>
      <TouchableOpacity onPress={this.clearData}>
        <Text style={{color: '#ededed'}}>(clear data)</Text>
      </TouchableOpacity>
    </View>
  )}
}
