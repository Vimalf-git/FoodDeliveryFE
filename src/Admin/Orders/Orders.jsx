import React, { useContext, useEffect } from 'react'
import { cardConData } from '../../Context/CardContext'
import './Orders.css'
import { Button } from '@mui/material'
const Orders = () => {
   const{orders,getOrderData}=useContext(cardConData)
    useEffect(()=>{
getOrderData()
    },[orders])
  return (
    <div className='orderscom'>
        <div className='orderCardCom'>

{orders&&orders.map((e)=>{
return <div className='orderCard'>
            <div className='imgcon'><img className='cardimg' src={e.imageUrl}/></div>
    <h3>{e.foodName}</h3>
    <p>{e.foodDesc}</p>
    <p> RS:-{e.price}</p>
    <div>    <Button disabled className='paidbtn'>Paid</Button>
</div>
</div>
    
})}
        </div>

    </div>
  )
}

export default Orders