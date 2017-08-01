'use strict'

import api from './api'

export function add(photoUri, groupId) {
  return function(dispatch) {
    dispatch({type: 'outbox:add', photo: { uri: photoUri, groupId: groupId }})
  }
}

export function remove(id) {
  return function(dispatch) {
    dispatch({type: 'outbox:remove', id: id})
  }
}

export function markFailure(id) {
  return function(dispatch) {
    dispatch({type: 'outbox:markFailure', id: id})
  }
}
