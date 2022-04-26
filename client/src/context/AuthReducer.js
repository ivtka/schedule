export default function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        login: action.payload.login,
        loading: false,
      }
    case 'REGISTER':
      return {
        ...state,
        login: false,
        loading: false,
      }
    case 'SET_LOGOUT':
      return {
        ...state,
        login: false
      }
    case 'SET_LOGIN':
      return {
        ...state,
        login: true
      }
    default:
      return state
  }
}