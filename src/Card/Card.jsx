import React, { useContext, useEffect } from 'react'
import './Card.css'
import { Button } from '@mui/material'
import { cardConData } from '../Context/CardContext'
import { Link, useNavigate } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete';
import ModeIcon from '@mui/icons-material/Mode';
const Card = ({data,key}) => {
    const {AddTOCart,getCartData,adminOrNot,deleteFood
      , seteditAdminData}=useContext(cardConData)
   useEffect(()=>{getCartData()},[])
  return (
    <div className='cardBox'>
        <div className='imgcon'><img className='cardimg' src={data.imageUrl}/></div>
        <h3>{data.foodName.toUpperCase()}</h3>
        <div className='cardDesc'><p>{data.foodDesc}</p></div>
       {adminOrNot?<div className='admineditdeletebtn'>
        <Button   className='admindeletebtn' onClick={()=>{deleteFood(data._id,key)}}><DeleteIcon/>delete</Button >
        <Link to={`/editfood/${data._id}`} className='admineditbtn'><ModeIcon/>edit</Link>
       </div>:
        <div className='addtocartCon'><Button className='addtocartbtn'
        onClick={()=>{AddTOCart(data)}}
        >Add to cart RS {data.price}</Button></div>
  }
    </div>
  )
}

export default Card