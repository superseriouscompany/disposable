const initialState = {
  photos:  [],
  loading: false,
}
export default function(state=initialState, action) {
  switch(action.type) {
    case 'album:load':
      return {
        ...initialState,
        name:    action.name,
        loading: true,
      }
    case 'album:load:yes':
      return {
        ...state,
        photos:  action.photos,
        loading: false,
        err:     null,
      }
    case 'album:load:no':
      return {
        ...state,
        loading: false,
        err:     action.err,
      }
    default:
      return state
  }
}
