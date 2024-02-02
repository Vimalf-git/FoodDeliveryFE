import React, { useEffect, useState } from "react";
import dish from '../../src/Image/dish.jpg'
import { jwtDecode } from "jwt-decode";
import ApiService from "../Common/ApiService";
import { toast } from "react-toastify";

export const cardConData = React.createContext();

const CardContext = ({ children }) => {
  const [countCart, setCountCart] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [email, setEmail] = useState('');
  const [data, setData] = useState([]);
  const [filsample, setFillsample] = useState([]);
  const [addToCartData, setAddToCartData] = useState([]);
  const[orders,setorders]=useState([]);

  const getData = async () => {
    try {
      const res = await ApiService.get('/getfooddata');
      console.log(res.data);
      if (res.status == 200) {
        setData(res.data.fooddetail)
        setFillsample(res.data.fooddetail)
      }
    } catch (error) {
      toast.error(error.data.message)
    }
  }
  // const sample = [{ img: dish, productName: 'mutton', name: 'bsn msnjkhs' },
  // { img: dish, productName: 'chicken', name: 'kjsbdjs jksk' },
  // { img: dish, productName: 'prawn', name: ',msjks uihui' },
  // { img: dish, productName: 'fish', name: 'm,snjks jkhs' },
  // { img: dish, productName: 'chicken', name: 'kjsbdjs jksk' },
  // { img: dish, productName: 'prawn', name: ',msjks uihui' },
  // { img: dish, productName: 'fish', name: 'm,snjks jkhs' },
  // ]
  const [userName, setUserName] = useState("");
  const [adminOrNot, setAdminOrNot] = useState();

  const filterData = (value) => {
    const filterd =

      filsample.filter((e) => e.foodName.toLowerCase().includes(value));
    // console.log(filterd);
    setData(filterd);
  }

  const getCartData=async()=>{
    try {
      let token = sessionStorage.getItem('token');
      setEmail(jwtDecode(token).email)
      let cart = await ApiService.get(`/getcartdata/${email}`);
      setAddToCartData(cart.data.cartRes)
      setCountCart(cart.data.cartRes.length)
    } catch (error) {
      
    }
  }


  const AddTOCart = async (data) => {
    console.log(data);
    let updatedata = [...addToCartData];
      updatedata.push(data)
      setCountCart(updatedata.length)
      setAddToCartData(updatedata);
    try {
      data.OrderBy = email;
      await ApiService.post('/savcart', data)
      getCartData()
    } catch (error) {

    }
  }

  const deleteAddCart = async (value, index) => {
    console.log('delte');
    let deleteData = [...addToCartData];
    deleteData.splice(index, 1);
    setAddToCartData(deleteData);
    setCountCart(pre => pre - 1)

try {
  let res= await ApiService.delete(`/deletecart/${value._id}`)
if(res.status==200){
  toast.success('cart removed')
}
} catch (error) {
  
}
  }

  

const deleteFood=async(id,i)=>{
  console.log('enter' + id, i);
  const deleteVal=[...data];
  deleteVal.splice(i,1);
  setData(deleteVal);
  try {
    let res=ApiService.delete(`/deletefood/${id}`)
    if(res.status==200){
      toast.success('removed successfully')
    }
  } catch (error) {
    
  }
}

const getOrderData=async()=>{
try {
  // let token = sessionStorage.getItem('token');
  // setEmail(jwtDecode(token).email)
  let res= await ApiService.get(`/getallorder/${email}`)
  if(res.status==200){
    setorders(res.data.orders)
  }
} catch (error) {
  
}
}

  useEffect(() => {
    let token = sessionStorage.getItem('token');
    setUserName(jwtDecode(token).username)
    setAdminOrNot(jwtDecode(token).admin)
    setEmail(jwtDecode(token).email)
    getData();
    getCartData();
    getOrderData();
  }, [])

  return (
    <cardConData.Provider value={{
      email, AddTOCart, addToCartData, deleteAddCart,getCartData,
      userName, setAdminOrNot, adminOrNot,orders,setorders,getOrderData,
      countCart, setCountCart,getData,
      searchText, setSearchText, data, setData, filterData,deleteFood
    }}>
      {children}
    </cardConData.Provider >
  )
}
export default CardContext