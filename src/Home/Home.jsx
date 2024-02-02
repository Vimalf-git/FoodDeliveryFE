import React, { useContext, useEffect, useState } from 'react'
import './Home.css'
import Card from '../Card/Card'
import { cardConData } from '../Context/CardContext'
import { MenuList } from '@mui/material'
import { useNavigate } from 'react-router-dom'
const Home = () => {

  const { data, adminOrNot } = useContext(cardConData);
  const navigate = useNavigate();
  return (
    <div className='homepage'>
      {adminOrNot}
      {adminOrNot == true ? navigate('/mymenulist')
        :
        <div className='cardPlace'>
          {data && data.map((e, i) => {
            return <Card data={e} key={i} />
          })}
        </div>
      }
    </div>
  )
}

export default Home