'use strict'

import api from './api'

export function createUser(user) {
  return function(dispatch) {
    dispatch({type: 'login:loading'})
    return api('/users', {
      method: 'POST',
      body: user
    }).then((body) => {
      dispatch({type: 'login:yes', user: body})
    }).catch((err) => {
      dispatch({type: 'login:no', err: err})
      throw err
    })
  }
}
