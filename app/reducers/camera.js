const initialState = {
  wound: false,
  remaining: __DEV__ ? 1 : 27,
  total: __DEV__ ? 1 : 27,
}
export default function(state=initialState, action) {
  switch(action.type) {
    case 'camera:wind':
      return {
        ...state,
        wound: true,
      }
    case 'camera:snap':
      return {
        ...state,
        wound: false,
        remaining: state.remaining - 1,
      }
    default:
      return state
  }
}
