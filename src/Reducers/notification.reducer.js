import * as CONSTS from '../Constants'

export default (state = {loading: false}, action) => {
  switch (action.type) {
    case CONSTS.SENDING_API_REQUEST:
      return {...state, loading: true}
    case CONSTS.GET_ALL_NOTIFICATION:
      return {...state, allnotifications: action.payload, loading:false}
    default:
      return state
  }
}