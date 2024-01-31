import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import LandingPage from './LandingPage/LandingPage'
import LoginContext from './Context/LoginContext'
import Home from './Home/Home'
import LandNavBar from './LandingNavBar/LandNavBar'
import CardContext from './Context/CardContext'

function App() {

  return (<>
    <BrowserRouter>
      <Routes>
        <Route index  element={
          <LoginContext>
            <LandingPage />
          </LoginContext>
        } />
        <Route path='/loginlanding'element={
          <LoginContext>
            <LandingPage />
          </LoginContext>
        } />
        <Route path='/home' element={<CardContext><LandNavBar/><Home/></CardContext>}/>
      </Routes>
    </BrowserRouter>
  </>)
}

export default App
