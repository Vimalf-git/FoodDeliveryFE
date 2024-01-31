import React, { useEffect, useState } from "react";
import dish from '../../src/Image/dish.jpg'
import { jwtDecode } from "jwt-decode";

export const cardConData = React.createContext();

const CardContext = ({ children }) => {
  const [countCart, setCountCart] = useState(0);
  const [searchText, setSearchText] = useState("");
  const sample = [{ img: dish, productName: 'mutton', name: 'bsn msnjkhs' },
  { img: dish, productName: 'chicken', name: 'kjsbdjs jksk' },
  { img: dish, productName: 'prawn', name: ',msjks uihui' },
  { img: dish, productName: 'fish', name: 'm,snjks jkhs' },
  { img: dish, productName: 'chicken', name: 'kjsbdjs jksk' },
  { img: dish, productName: 'prawn', name: ',msjks uihui' },
  { img: dish, productName: 'fish', name: 'm,snjks jkhs' },
  ]
  const [data, setData] = useState(sample);
  const[userName,setUserName]=useState("")
  const filterData = (value) => {
    // console.log('enter');
    // console.log(value);
    const filterd =
     sample.filter((e) =>e.productName.includes(value));
    console.log(filterd);
    // console.log(data);
    setData(filterd);
  }
  useEffect(()=>{
    let token=sessionStorage.getItem('token');
    setUserName(jwtDecode(token).username)
  },[])
  return (
    <cardConData.Provider value={{
      userName,
      countCart, setCountCart,
      searchText, setSearchText, data, setData, filterData
    }}>
      {children}
    </cardConData.Provider >
  )
}

export default CardContext