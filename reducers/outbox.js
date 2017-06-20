const initialState = {
  queue: []
}
export default function(state=initialState, action) {
  switch(action.type) {
    case 'outbox:add':
      return {
        ...state,
        queue: state.queue.concat(Math.random())
      }
    default:
      return state
  }
}
