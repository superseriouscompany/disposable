const initialState = null
export default function(state=initialState, action) {
  switch(action.type) {
    case 'login:yes':
      return action.user
    case 'logout':
      return initialState
    default:
      return state
  }
}
