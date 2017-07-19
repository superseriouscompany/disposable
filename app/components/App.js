'use strict'

import React, {Component} from 'react'
import {Provider}         from 'react-redux'
import store              from '../reducers'
import OfflineProvider    from '../providers/OfflineProvider'
import DeeplinkProvider   from '../providers/DeeplinkProvider'
import Stage              from './Stage'
import {
  View,
} from 'react-native'

export default class App extends Component {
  render() { return (
    <Provider store={store}>
      <View style={{flex: 1}}>
        <Stage />
        <OfflineProvider />
        <DeeplinkProvider />
      </View>
    </Provider>
  )}
}
