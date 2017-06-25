const initialState = {
  wound: false,
  remaining: 27,
  total: 27,
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
