'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import NewAlbumView       from '../views/NewAlbumView'

class NewAlbum extends Component {
  constructor(props) {
    super(props)
    this.changeText = this.changeText.bind(this)
    this.submit     = this.submit.bind(this)
  }

  changeText(text) {
    this.setState({text})
  }

  submit() {
    this.state.text && this.props.submit(this.state.text)
  }

  render() {
    return (
      <NewAlbumView {...this.props} {...this.state} onChangeText={this.changeText} onEndEditing={this.submit}/>
    )
  }
}

function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {
    submit: (albumName) => {
      dispatch({type: 'album:load', name: albumName})
      dispatch({type: 'scene:change', scene: 'Cam'})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewAlbum)
