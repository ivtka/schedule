import { createContext, useReducer } from "react";
import authReducer from "./AuthReducer";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const initialState = {
    loading: false,
    login: false
  }

  const [state, dispatch] = useReducer(authReducer, initialState);

  const signin = async (data) => {
    setLoading('Будь ласка, зачекайте...')
    const params = new URLSearchParams({
      action: 'LOGIN'
    })

    const response = await fetch(`${process.env.REACT_APP_AUTH}?${params}`,
      {
        method: 'POST',
        body: JSON.stringify(data)
      }
    )
    const result = await response.json()

    dispatch({
      type: 'LOGIN',
      payload: data
    })
  }

  const signup = async (data) => {
    setLoading('Будь ласка, зачекайте...')
    const params = new URLSearchParams({
      action: 'REGISTER'
    })

    const response = await fetch(`${process.env.REACT_APP_AUTH}?${params}`,
    {
      method: 'POST',
      body: JSON.stringify(data)
    })
    
    const result = await response.json()
    dispatch({
      type: 'REGISTER',
      payload: data
    })
  }

  const setLogin = () => dispatch({ type: 'SET_LOGIN' })
  const setLogout = () => dispatch({ type: 'SET_LOGOUT' })
  const setLoading = (msg) => dispatch({ type: 'SET_LOADING', payload: { msg } })

  return <AuthContext.Provider value={{
    login: state.login,
    setLogin,
    setLogout,
    signup,
    signin
  }}>
    {children}
  </AuthContext.Provider>
}

export default AuthProvider;