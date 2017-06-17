const initialState = {}
export default function(state=initialState, action) {
  switch(action.type) {
    case 'hello:world':
      return {
        cool: 'nice'
      }
    default:
      return state
  }
}
