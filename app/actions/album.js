'use strict'

import request from './api'

export function loadAlbum() {
  return function(dispatch) {
    return request('/photos').then((json) => {
      dispatch({type: 'album:load:yes', photos: json.photos})
    }).catch((err) => {
      dispatch({type: 'album:load:no', err: err})
    })
  }
}
