import React, { useContext, useState } from 'react'
import './LandingPage.css'
import { Button } from '@mui/material'
import Login from '../Login/Login';
import {LoginDataCon} from '../Context/LoginContext'
import Signup from '../SignUp/SignUp';
import ForgotPass from '../ForgotPassword/ForgotPass';
const LandingPage = () => {
    // const[loginTog,setLoginTog]=useState(false);
    const {loginTog,setLoginTog,
        signUp,setSignUp
    }=useContext(LoginDataCon)
    // const LoginToggle=()=>{

    // }
    // const SignUpToggle=()=>{

    // }
    return (
        <div className='landPage'>
            <nav className='navBar'>
                <Button disabled={signUp?true:false} onClick={()=>setLoginTog(pre=>!pre)}>Log in</Button>
                <Button disabled={loginTog?true:false} onClick={()=>setSignUp(pre=>!pre)}>sign up</Button>
            </nav>
            <div className='brandName'>
                <h3>ORDER-APP</h3>
                <p>
                Find the best restaurants, cafés and bars in India
                </p>
            </div>
            <div className={loginTog||signUp?'loginSection':''}>
                {loginTog ?<Login/>:<></>}
                {signUp?<Signup/>:<></>}
                {/* {forgot?<ForgotPass/>:<></>} */}

            </div>
        </div>
    )
}

export default LandingPage