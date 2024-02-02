import React, { useContext, useState } from 'react'
import './LandNav.css'
import { Button } from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Link, useNavigate } from 'react-router-dom';
import { cardConData } from '../Context/CardContext';
import useLogout from '../Common/useLogout';
import { FaHamburger } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";

const LandNavBar = () => {
    const { userName, countCart, filterData, adminOrNot } = useContext(cardConData);
    const [hamBurger, setHamBurger] = useState(false);
    const navigate = useNavigate()
    const logout = useLogout()
    return (<>
        <nav className='landNav'>
            <div className='landnav-l-con'>
                <div className='navbrandname'>
                    <h3>ORDER-APP</h3>
                </div>
                <div className='menubar'>
                    <Link to={'/home'} className={adminOrNot ? 'adminLink' : 'userLink'}>Home</Link>
                    <Link to={'/orders'} className={!adminOrNot ? 'adminLink' : 'userLink'} >Orders</Link>
                    <Link to={'/mymenulist'} className={!adminOrNot ? 'adminLink' : 'userLink'}>MenuList</Link>
                    <Link to={'/addfood'} className={!adminOrNot ? 'adminLink' : 'userLink'}>AddFood</Link>
                </div>
            </div>
            <div className='searchCon'>
                <input type='text' className='searchBar' placeholder="Search..."
                    onChange={(e) => { filterData(e.target.value) }} />

            </div>
            <div className='landnav-r-con'>
                <h4>{userName}</h4>
                <Button variant='contained' onClick={() => { logout() }} className='logoutbtn' sx={{ backgroundColor: '#F4424E' }}>Logout</Button>
                {adminOrNot ? <></> :
                    <div className='cartCon' onClick={() => navigate('/addtocart')}
                    >
                        <AddShoppingCartIcon className='carticon' />
                        {countCart ? <p className='countCart'>{countCart}</p> : <></>}
                    </div>}
            </div>
        </nav>

        <nav className='landNavmob'>
            <div className='landnav-l-con'>
                <div className='navbrandname'>
                    <h3>ORDER-APP</h3>
                </div>
                {/* <div className='menubar'>
        <Link to={'/home'} className={adminOrNot ? 'adminLink' : 'userLink'}>Home</Link>
        <Link to={'/orders'}className={!adminOrNot?'adminLink':'userLink'} >Orders</Link>
        <Link to={'/mymenulist'} className={!adminOrNot ? 'adminLink' : 'userLink'}>MenuList</Link>
        <Link to={'/addfood'} className={!adminOrNot ? 'adminLink' : 'userLink'}>AddFood</Link>
    </div> */}
            </div>
            <div className='searchCon'>
                <input type='text' className='searchBar' placeholder="Search..."
                    onChange={(e) => { filterData(e.target.value) }} />

            </div>
            <div>
                {hamBurger ? <IoMdCloseCircle className='burgerIcon' onClick={() => setHamBurger(pre => !pre)} /> :
                    <FaHamburger className='burgerIcon' onClick={() => setHamBurger(pre => !pre)} />
                }
                {hamBurger ? <>
                    <div className='landnav-r-conMob'>
                    <h4>{userName}</h4>
                        <div className={adminOrNot?'menuMob':'adminmobmenu'}>
                        <Link to={'/home'} className={adminOrNot ? 'adminLink' : 'userLink'}>Home</Link>
                        <Link to={'/orders'} className={!adminOrNot ? 'adminLink' : 'userLink'} >Orders</Link>
                        <Link to={'/mymenulist'} className={!adminOrNot ? 'adminLink' : 'userLink'}>MenuList</Link>
                        <Link to={'/addfood'} className={!adminOrNot ? 'adminLink' : 'userLink'}>AddFood</Link>
                        
                        </div>
                        {adminOrNot ? <></> :
                            <div className='cartCon' onClick={() => navigate('/addtocart')}
                            >
                                <AddShoppingCartIcon className='carticon' />
                                {countCart ? <p className='countCart'>{countCart}</p> : <></>}
                            </div>}
                        <Button variant='contained' onClick={() => { logout() }} className='logoutbtn' sx={{ backgroundColor: '#F4424E' }}>Logout</Button>
                        
                    </div>
                </> : <></>}
            </div>


            {/* <div className='landnav-r-con'>
    <h4>{userName}</h4>
    <Button variant='contained' onClick={() => { logout() }} className='logoutbtn' sx={{ backgroundColor: '#F4424E' }}>Logout</Button>
    {adminOrNot ? <></> :
        <div className='cartCon' onClick={() => navigate('/addtocart')}
        >
            <AddShoppingCartIcon className='carticon' />
            {countCart ? <p className='countCart'>{countCart}</p> : <></>}
        </div>}
</div> */}
        </nav>
    </>
    )
}

export default LandNavBar