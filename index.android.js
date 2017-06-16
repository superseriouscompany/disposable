import React, { Component } from 'react';
import App from './components/App'
import {
  AppRegistry,
} from 'react-native';

export default class disposable extends Component {
  render() {
    return (
      <App />
    );
  }
}

AppRegistry.registerComponent('disposable', () => disposable);
