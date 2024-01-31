import React, { useContext } from 'react'
import './Home.css'
import Card from '../Card/Card'
import { cardConData } from '../Context/CardContext'
const Home = () => {

  const{data,setData}=useContext(cardConData);



  return (
  <div className='homepage'>

    <div className='cardPlace'>
      {data&&data.map((e,i) => {
        return <Card data={e} key={i} />
      })}

    </div>
  </div>
  )
}

export default Home