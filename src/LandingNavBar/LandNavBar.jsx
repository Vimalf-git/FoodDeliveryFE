import React, { useContext, useRef } from 'react'
import './LandNav.css'
import { Button} from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Link } from 'react-router-dom';
import { cardConData } from '../Context/CardContext';
import useLogout from '../Common/useLogout';

const LandNavBar = () => {
    const {userName, countCart,filterData } = useContext(cardConData);
const logout=useLogout()
    return (
        <nav className='landNav'>
            <div className='landnav-l-con'>
                <div className='navbrandname'>
                    <h3>ORHOT-APP</h3>
                </div>
                <div className='menubar'>
                    <Link>Menu</Link>
                </div>
            </div>
            <div className='searchCon'>
                <input type='text' className='searchBar' placeholder="Search..."
                    onChange={(e)=>{filterData(e.target.value)}}/>

            </div>
            <div className='landnav-r-con'>
                <h4>{userName}</h4>
                <Button variant='contained' onClick={()=>{logout()}} className='logoutbtn' sx={{ backgroundColor: '#F4424E' }}>Logout</Button>
                <div className='cartCon'>
                    <AddShoppingCartIcon className='carticon' />
                    {countCart ? <p className='countCart'>{countCart}</p> : <></>}

                </div>
            </div>
        </nav>
    )
}

export default LandNavBar