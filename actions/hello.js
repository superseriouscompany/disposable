'use strict'

import api from './api'

export function hello() {
  return function(dispatch) {
    console.log('hit it')
    dispatch({type: 'hello:loading'})
    return api.request('/hello').then((ok) => {
      dispatch({type: 'hello:load:yes', response: ok})
    }).catch((err) => {
      dispatch({type: 'hello:load:no', err: err.message})
      throw err
    })
  }
}
