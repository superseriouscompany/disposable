const initialState = {}
export default function(state=initialState, action) {
  switch(action.type) {
    case 'hello:loading':
      return {
        loading: true,
      }
    case 'hello:load:yes':
      return {
        loading: false,
        great: action.response,
      }
    case 'hello:load:no':
      return {
        loading: false,
        err: action.err,
      }
    default:
      return state
  }
}
