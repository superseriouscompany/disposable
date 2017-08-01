'use strict'

import React, {Component} from 'react'
import {connect}          from 'react-redux'
import NewAlbumView       from '../views/NewAlbumView'

class NewAlbum extends Component {
  render() {
    return (
      <NewAlbumView {...this.props} />
    )
  }
}

function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewAlbum)
