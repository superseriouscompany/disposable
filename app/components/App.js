'use strict'

import React, {Component} from 'react'
import {Provider}         from 'react-redux'
import store              from '../reducers'
import OfflineProvider    from '../providers/OfflineProvider'
import Stage              from './Stage'
import {
  View,
} from 'react-native'

const baseUrl = 'https://disposable.superserious.co'

export default class App extends Component {
  render() { return (
    <Provider store={store}>
      <View style={{flex: 1}}>
        <Stage />
        <OfflineProvider />
      </View>
    </Provider>
  )}
}
