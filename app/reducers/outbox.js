const initialState = {
  queue: []
}
export default function(state=initialState, action) {
  switch(action.type) {
    case 'outbox:add':
      return {
        ...state,
        queue: [{
          ...action.photo,
          id: +new Date,
          taken_at: +new Date,
        }].concat(state.queue)
      }
    case 'outbox:remove':
      return {
        ...state,
        queue: state.queue.filter((i) => {
          return i.id !== action.id
        })
      }
    case 'outbox:markFailure':
      return {
        ...state,
        queue: state.queue.map((i) => {
          if( i.id !== action.id ) { return i; }
          i.failureCount = (i.failureCount || 0) + 1
          i.lastFailure  = new Date
          return i
        })
      }

    case 'outbox:clear':
      return initialState
    default:
      return state
  }
}
