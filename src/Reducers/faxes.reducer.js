import * as CONSTS from '../Constants'

export default (state = {loading: false}, action) => {
  switch (action.type) {
    case CONSTS.SENDING_API_REQUEST:
      return {...state, loading: true}
    case CONSTS.GET_ALL_FAXES_ON_AN_ACCOUNT_SUCCESS:
      return {...state, allfaxes: action.payload, loading:false}
    default:
      return state
  }
}