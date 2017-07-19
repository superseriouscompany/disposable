'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import {Linking}          from 'react-native'

class DeeplinkProvider extends Component {
  constructor(props) {
    super(props)
    this.handleUrl = this.handleUrl.bind(this)
  }

  componentDidMount() {
    Linking.addEventListener('url', this.handleUrl)
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleUrl)
  }

  handleUrl(e) {
    var matches = e.url.match(/\/s\/(.*?)$/)
    if( !matches.length ) {
      return console.warn('Unknown url', e.url)
    }

    const accessToken = matches[1]
    this.props.login(accessToken)
  }

  render() { return null }
}

function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {
    login: (accessToken) => {
      dispatch({type: 'login:yes', user: {accessToken}})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeeplinkProvider)
