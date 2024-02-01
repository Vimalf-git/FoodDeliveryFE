import React, { useContext } from 'react'
import { cardConData } from '../../Context/CardContext'
import Card from '../../Card/Card';
// import '../../Home/Home.css'
import './MymenuList.css'
const MymenuList = () => {
    const {data,email}=useContext(cardConData);
    // const adminfoodMenu=
  return (
    <div className='menulist'>
        {data.filter((e)=>e.mail==email).map((e,i)=>{
            return <Card data={e} key={i}/>
        })}
    </div>
  )
}

export default MymenuList