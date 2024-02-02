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
        {data.length>0?data.filter((e)=>e.mail==email).map((e,i)=>{
            return <Card data={e} key={i}/>
        }):<div className='nofood'>No Food here..</div>}
    </div>
  )
}

export default MymenuList