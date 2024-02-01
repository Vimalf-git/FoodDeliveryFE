import React, { createContext, useState } from 'react'
export const LoginDataCon=React.createContext();
function LoginContext({children}){
    const[loginTog,setLoginTog]=useState(false);
    const[signUp,setSignUp]=useState(false);
    const[forgot,setForgot]=useState(false)
  return (
    <LoginDataCon.Provider value={{loginTog,setLoginTog,signUp,setSignUp,
      forgot,setForgot
    }}>
        {children}
    </LoginDataCon.Provider >
  )
}

export default LoginContext