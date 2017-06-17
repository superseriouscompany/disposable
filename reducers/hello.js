const initialState = {
  requests: [],
  responses: [],
  errors: [],
}
export default function(state=initialState, action) {
  switch(action.type) {
    case 'hello:loading':
      return {
        ...state,
        loading: true,
        requests: state.requests.concat(+new Date),
      }
    case 'hello:load:yes':
      return {
        ...state,
        loading: false,
        responses: state.responses.concat(new Date - state.requests[state.responses.length]),
      }
    case 'hello:load:no':
      return {
        ...state,
        loading: false,
        errors: state.errors.concat(`${action.err.message}`),
      }
    default:
      return state
  }
}
