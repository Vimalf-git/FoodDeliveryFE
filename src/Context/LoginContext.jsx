import React, { createContext, useState } from 'react'
export const LoginDataCon=React.createContext();
function LoginContext({children}){
    const[loginTog,setLoginTog]=useState(false);
    const[signUp,setSignUp]=useState(false);

  return (
    <LoginDataCon.Provider value={{loginTog,setLoginTog,signUp,setSignUp}}>
        {children}
    </LoginDataCon.Provider >
  )
}

export default LoginContext