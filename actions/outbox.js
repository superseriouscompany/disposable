'use strict'

import api from './api'

export function add(photoUri) {
  return function(dispatch) {
    dispatch({type: 'outbox:add', photo: { uri: photoUri }})
  }
}
