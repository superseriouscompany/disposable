'use strict'

import request from './api'

export function loadAlbum(albumName) {
  return function(dispatch) {
    // TODO: restrict albumName to letters and underscores
    return request(`/albums/${albumName}/photos`).then((json) => {
      dispatch({type: 'album:load:yes', photos: json.photos})
    }).catch((err) => {
      dispatch({type: 'album:load:no', err: err})
    })
  }
}
