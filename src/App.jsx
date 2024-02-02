import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import LandingPage from './LandingPage/LandingPage'
import LoginContext from './Context/LoginContext'
import Home from './Home/Home'
import LandNavBar from './LandingNavBar/LandNavBar'
import CardContext from './Context/CardContext'
import AddFood from './Admin/AddFood/AddFood'
import AddToCart from './AddToCart/AddToCart'
import MymenuList from './Admin/MyMenuList/MymenuList'
import EditMenu from './Admin/EditMenu/EditMenu'
import ForgotPass from './ForgotPassword/ForgotPass'
import ResetPassword from './ResetPassword/ResetPassword'
import Orders from './Admin/Orders/Orders'

function App() {

  return (<>
    <BrowserRouter>
      <Routes>
        <Route index element={
          <LoginContext>
            <LandingPage />
          </LoginContext>
        } />
        <Route path='/loginlanding' element={
          <LoginContext>
            <LandingPage />
          </LoginContext>
        } />
        <Route path='/home' element={<CardContext><LandNavBar /><Home /></CardContext>} />
        <Route path='/addfood' element={<CardContext><LandNavBar/><AddFood/></CardContext>}/>
        <Route path='/addtocart' element={<CardContext><LandNavBar/><AddToCart/></CardContext>}/>
        <Route path='/mymenulist' element={<CardContext><LandNavBar/><MymenuList/></CardContext>}/>
        <Route path='/editfood/:id' element={<CardContext><LandNavBar/><EditMenu/></CardContext>}/>
        <Route path='/forgotPass' element={<><ForgotPass/></>}/>
        <Route path='/resetpassword/*' element={<><ResetPassword/></>} />
        <Route path='/orders' element={<CardContext><LandNavBar/><Orders/></CardContext>}/>
      </Routes>
    </BrowserRouter>
  </>)
}

export default App
