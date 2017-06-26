import {persistStore, autoRehydrate} from 'redux-persist'
import logger                        from 'redux-logger'
import thunk                         from 'redux-thunk'
import { AsyncStorage }              from 'react-native'
import {
  applyMiddleware,
  createStore,
  compose,
  combineReducers,
} from 'redux'

import outbox from './outbox'
import camera from './camera'
import scene  from './scene'

const middleware = [thunk]
if( __DEV__ ) {
  middleware.push(logger)
}

const reducers = combineReducers({
  outbox,
  camera,
  scene,
})

const store = createStore(
  reducers,
  undefined,
  compose(
    applyMiddleware(...middleware),
    autoRehydrate()
  )
)

const persistence = persistStore(store, {storage: AsyncStorage, whitelist: [
  'outbox',
  'camera',
]})

export default store

export function clear() {
  persistence.purge()
}
