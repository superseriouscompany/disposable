import { offline }      from 'redux-offline'
import offlineConfig    from 'redux-offline/lib/defaults'
import logger           from 'redux-logger'
import thunk            from 'redux-thunk'
import { AsyncStorage } from 'react-native'
import {
  applyMiddleware,
  createStore,
  compose,
  combineReducers,
} from 'redux'

import hello from './hello'

const middleware = [thunk]
if( __DEV__ ) {
  middleware.push(logger)
}

const reducers = combineReducers({
  hello
})

const store = createStore(
  reducers,
  undefined,
  compose(
    applyMiddleware(...middleware),
    offline({
      ...offlineConfig,
      persistOptions: {
        storage: AsyncStorage,
        whitelist: ['offline'],
      },
    }),
  )
)

module.exports = store
