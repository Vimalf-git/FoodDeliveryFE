import React, { useContext } from 'react'
import './Card.css'
import { Button } from '@mui/material'
import { cardConData } from '../Context/CardContext'
const Card = ({data}) => {
    const {countCart,setCountCart}=useContext(cardConData)
  return (
    <div className='cardBox'>
        <div className='imgcon'><img className='cardimg' src={data.img}/></div>
        <h3>{data.name}</h3>
        <div><p>{data.productName}</p></div>
        <div className='addtocartCon'><Button className='addtocartbtn'
        onClick={()=>setCountCart(pre=>pre+1)}
        >Add to cart</Button></div>
    </div>
  )
}

export default Card