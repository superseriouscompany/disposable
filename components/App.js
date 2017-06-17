'use strict'

import React, {Component} from 'react'
import {Provider}         from 'react-redux'
import store              from '../reducers'
import Cam                from './Cam'
import {
  View,
} from 'react-native'

const baseUrl = 'https://disposable.superserious.co'

export default class App extends Component {
  render() { return (
    <Provider store={store}>
      <Cam />
    </Provider>
  )}
}
