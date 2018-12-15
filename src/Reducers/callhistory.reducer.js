import * as CONSTS from '../Constants'

export default (state = {
  loading: false
}, action) => {
  switch (action.type) {
    case CONSTS.SENDING_API_REQUEST:
      return { ...state, loading: true }
    case CONSTS.GET_ALL_CALL_FLOW_ON_AN_ACCOUNT_SUCCESS:
      return { ...state, call_flow: action.payload, loading: false }
    default:
      return state
  }
}
