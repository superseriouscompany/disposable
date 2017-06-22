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

import hello  from './hello'
import outbox from './outbox'
import camera from './camera'

const middleware = [thunk]
if( __DEV__ ) {
  middleware.push(logger)
}

const reducers = combineReducers({
  hello,
  outbox,
  camera,
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
]})

export default store

export function clear() {
  persistence.purge()
}
