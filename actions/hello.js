'use strict'

import api from './api'

export function hello() {
  return function(dispatch) {
    dispatch({type: 'outbox:add' })
  }
}
